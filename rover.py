from yolobit import *
import machine, neopixel
from machine import *
import time
from utility import *
import rover_pcf8574
import rover_motion
import rover_hcsr04
from rover_ir import *

# IR receiver
rover_ir_rx = IR_RX(Pin(pin4.pin, Pin.IN))

# MPU check connection
mpu_detected = True

class Rover():

    def __init__(self):
        global mpu_detected
        # motor pins
        self.ina1 = PWM(Pin(pin12.pin), freq=500, duty=0)
        self.ina2 = PWM(Pin(pin2.pin), freq=500, duty=0)

        self.inb1 = PWM(Pin(pin10.pin), freq=500, duty=0)
        self.inb2 = PWM(Pin(pin15.pin), freq=500, duty=0)

        self.servo1 = PWM(Pin(pin16.pin), freq=50, duty=0)
        self.servo2 = PWM(Pin(pin3.pin), freq=50, duty=0)

        self.m1_speed = 0
        self.m2_speed = 0
        
        # line IR sensors
        try:
            self.pcf = rover_pcf8574.PCF8574(
                machine.SoftI2C(
                    scl=machine.Pin(22), 
                    sda=machine.Pin(21)), 0x23)
        except:
            say('Line IR sensors not detected')
            self.pcf = None
        
        # MPU6050
        try:
            self.motion = rover_motion.Motion(
                machine.SoftI2C(
                    scl=machine.Pin(22), 
                    sda=machine.Pin(21)), 0x68)
        except:
            self.motion = None
            mpu_detected = False
        
        # ultrasonic
        self.ultrasonic = rover_hcsr04.HCSR04(pin13.pin, pin14.pin)

        # RGB leds
        self._num_leds = 6
        self._rgb_leds = neopixel.NeoPixel(machine.Pin(pin6.pin), self._num_leds)

        self.show_led(0, 0)

        self.stop()

        if mpu_detected == True:
            say('Rover setup done with MPU6050!')
        else:
            say('Rover setup done!')
   
    #------------------------------ROBOT PRIVATE MOVING METHODS--------------------------#

    def __go(self, forward=True, speed=None, t=None, straight=False):

        if speed < 0 or speed > 100 or (t != None and t < 0):
            return

        if straight == True :
            return self.__go_straight(speed, t, forward)
        else:
            if forward:
                #self.stop() stop() isn't work in rover. So we need to test it more...
                self.set_wheel_speed(speed, speed)
            else:
                #self.stop()
                self.set_wheel_speed(-speed, -speed)

            if t != None :
                time.sleep(t)
                self.stop()
    
    def __calibrate_speed(self, speed, error=0.2, error_rotate=10, speed_factor=3):
        self.motion.updateZ()
        z = self.motion.get_angleZ()
        if abs(z) >= 360:
            z = (abs(z) - 360) * z / abs(z)
        if abs(z) > 180:
            z = z - 360 * z / abs(z)
        if abs(z) > error:
            if abs(z) > error_rotate:
                self.set_wheel_speed(30 * z / abs(z), -30 * z / abs(z))
            self.set_wheel_speed(speed + z * speed_factor, speed - z * speed_factor)

    def __go_straight(self, speed=None, t=None, forward=True, sleep_t=10, need_calib=False):
        if speed == None:
            speed = self._speed
            
        if speed < 0 or speed > 100 or t == None or (t != None and t < 0):
            return
            

        try:
            self.stop()
            if need_calib:
                self.motion.calibrateZ()

            if forward == False:
                speed = -speed

            self.motion.begin()
            time.sleep(0.1) # sleep to calib right value
            self.set_wheel_speed(speed, speed)
            t0 = time.time_ns()
            while time.time_ns() - t0 < t*1e9:
                self.__calibrate_speed(speed)
                time.sleep_ms(sleep_t)

        finally:
            self.stop()
            gc.collect()
    
    def __turn(self, right=True, speed=15, t=None):
        if speed == None:
            speed = self._speed
            
        if speed < 0 or speed > 100 or (t != None and t < 0):
            return

        if right:
            self.set_wheel_speed(speed, -speed)
        else:
            self.set_wheel_speed(-speed, speed)

        if t != None :
            time.sleep(t)
            self.stop()

    def __turn_angle(self, angle, right=True, speed=15, error=2, need_calib=False):
        if speed > 15:
            speed = 15

        if angle < 30:
            speed = 10

        try:
            self.stop()
            if need_calib:
                self.motion.calibrateZ()

            z0 = 0.0
            t0 = time.time_ns()
            t_start = t0
            limit_time = int((angle + 359) / 360) * 3e9

            self.__turn(right, speed)
            t_speed_changed = t0
            z_speed_changed = z0

            self.motion.begin()
            while (time.time_ns() - t_start) < limit_time:
                self.motion.updateZ()
                z_now = self.motion.get_angleZ(True)
                if z_now + error >= angle:
                    break
                
                t_now = time.time_ns()
                angle_to_target = angle - z_now

                delta_S = z_now - z0
                delta_T = t_now - t0            
                delta_V = delta_S / delta_T

                delta_V_changed = (z_now - z_speed_changed)/(t_now - t_speed_changed)
                if delta_V > 15e-8: #Delta speed value by detla angle (distance) / delta time that robot can control the precise angle, 100ms for 15 degree
                    if angle_to_target < 15: #(15 * delta_V / 15e-8) : #15 is degree value that robot can control with speed: 15e-8
                        speed = 15
                        self.__turn(right, speed)
                        t_speed_changed = t_now
                        z_speed_changed = z_now
                    else:
                        if delta_V > 40e-8: #Delta speed value is too fast need to slow down, 100ms for 40 degree
                            speed -= (speed - 15) / (angle_to_target / delta_S)
                            if speed < 15:
                                speed = 15
                            self.__turn(right, speed)
                            t_speed_changed = t_now
                            z_speed_changed = z_now
                else:          
                    if delta_V_changed < 3e-8 and t_now - t_speed_changed > 1e8 and speed < 15 : #Robot is moving too slow, 100ms for 3 degree
                        speed += 5
                        self.__turn(right, speed)
                        t_speed_changed = t_now
                        z_speed_changed = z_now

                z0 = z_now
                t0 = t_now

        finally:
            self.stop()
            gc.collect()
    
    #------------------------------ROBOT PUBLIC DRIVING METHODS--------------------------#

    def forward(self, speed=None, t=None, straight=False):
        global mpu_detected
        if mpu_detected == True:
            self.__go(True, speed, t, straight)
        else:
            self.__go(True, speed, t, False)

    def backward(self, speed=None, t=None, straight=False):
        global mpu_detected
        if mpu_detected == True:
            self.__go(False, speed, t, straight)
        else:
            self.__go(False, speed, t, False)

    def turn_left(self, speed=None, t=None):
        self.__turn(False, speed, t)

    def turn_right(self, speed=None, t=None):
        self.__turn(True, speed, t)

    def turn_left_angle(self, angle, speed=15, need_calib=False):
        global mpu_detected
        print(mpu_detected)
        if mpu_detected == True:
            self.__turn_angle(angle, False, speed, need_calib)
        else:
            t = angle/90
            self.__turn(False, speed, t)

    def turn_right_angle(self, angle, speed=15, need_calib=False):
        global mpu_detected
        print(mpu_detected)
        if mpu_detected == True:
            self.__turn_angle(angle, True, speed, need_calib)
        else:
            t = angle/90
            self.__turn(True, speed, t)

    def stop(self):
        self.set_wheel_speed(0, 0)
        time.sleep_ms(20)

    def set_wheel_speed(self, m1_speed, m2_speed):
        # logic to smoothen motion, avoid voltage spike
        # if wheel speed change > 30, need to change to 30 first
        if (m1_speed != 0 and abs(m1_speed - self.m1_speed) > 30) and (m2_speed != 0 and abs(m2_speed - self.m2_speed) > 30):
            if m1_speed > 0:
                # Forward
                self.ina1.duty(int(translate(30, 0, 100, 0, 1023)))
                self.ina2.duty(0)
            elif m1_speed < 0:
                # Backward
                self.ina1.duty(0)
                self.ina2.duty(int(translate(30, 0, 100, 0, 1023)))
            
            if m2_speed > 0:
                # Forward
                self.inb1.duty(int(translate(30, 0, 100, 0, 1023)))
                self.inb2.duty(0)
            elif m2_speed < 0:
                # Backward
                self.inb1.duty(0)
                self.inb2.duty(int(translate(30, 0, 100, 0, 1023)))

            time.sleep_ms(200)

        if m1_speed > 0:
            # Forward
            self.ina1.duty(int(translate(abs(m1_speed), 0, 100, 0, 1023)))
            self.ina2.duty(0)
        elif m1_speed < 0:
            # Backward
            self.ina1.duty(0)
            self.ina2.duty(int(translate(abs(m1_speed), 0, 100, 0, 1023)))
        else:
            # Release
            self.ina1.duty(0)
            self.ina2.duty(0)

        if m2_speed > 0:
            # Forward
            self.inb1.duty(int(translate(abs(m2_speed), 0, 100, 0, 1023)))
            self.inb2.duty(0)
        elif m2_speed < 0:
            # Backward
            self.inb2.duty(int(translate(abs(m2_speed), 0, 100, 0, 1023)))
            self.inb1.duty(0)
        else:
            # Release
            self.inb1.duty(0)
            self.inb2.duty(0)
        
        self.m1_speed = m1_speed
        self.m2_speed = m2_speed
    
    def move(self, dir, speed=None):

        # calculate direction based on angle
        #         90(3)
        #   135(4) |  45(2)
        # 180(5)---+----Angle=0(dir=1)
        #   225(6) |  315(8)
        #         270(7)

        if speed == None:
            speed = self._speed

        if dir == 1:
            self.turn_right(speed/2)

        elif dir == 2:
            self.set_wheel_speed(speed, speed/2)

        elif dir == 3:
            self.forward(speed)

        elif dir == 4:
            self.set_wheel_speed(speed/2, speed)

        elif dir == 5:
            self.turn_left(speed/2)

        elif dir == 6:
            self.set_wheel_speed(-speed/2, -speed)
      
        elif dir == 7:
            self.backward(speed)

        elif dir == 8:
            self.set_wheel_speed(-speed, -speed/2)

        else:
            self.stop()
    def read_line_sensors(self, index=0):
        '''
        self.pcf.pin(0) = 0 white line
        self.pcf.pin(0) = 1 black line
        '''
        if index < 0 or index > 4:
            return 1
 
        if index == 0:
            if self.pcf:
                return (self.pcf.pin(0), self.pcf.pin(1), self.pcf.pin(2), self.pcf.pin(3))
            else:
                return (1, 1, 1, 1) # cannot detect black line
        else:
            if self.pcf:
                return self.pcf.pin(index-1)
            else:
                return 1

    def show_led(self, index, state):
        if self.pcf:
            if index == 0: # both led
                self.pcf.pin(4, state)
                self.pcf.pin(5, state)
            elif index == 1: # left led
                self.pcf.pin(4, state)
            elif index == 2: # right led
                self.pcf.pin(5, state)
        else:
            pass

    def show_rgb_led(self, index, color, delay=None):
        if index == 0:
            for i in range(self._num_leds):
                self._rgb_leds[i] = color

            self._rgb_leds.write()

        elif (index > 0) and (index <= self._num_leds) :
            self._rgb_leds[index - 1] = color
            self._rgb_leds.write()

        if delay != None:
            time.sleep(delay)
            if index == 0:
                for i in range(self._num_leds):
                    self._rgb_leds[i] = (0, 0, 0)

                self._rgb_leds.write()

            elif (index > 0) and (index <= self._num_leds) :
                self._rgb_leds[index - 1] = (0, 0, 0)
                self._rgb_leds.write()
    
    def servo_write(self, index, value, max=180):
        if index not in [1, 2]:
            print("Servo index out of range")
            return None
        if value < 0 or value > max:
            print("Servo position out of range. Must be from 0 to " + str(max) + " degree")
            return

        # duty for servo is between 25 - 115
        duty = 25 + int((value/max)*100)

        if index == 1:
          self.servo1.duty(duty)
        else:
          self.servo2.duty(duty)

    def servo360_write(self, index, value):
        if value < -100 or value > 100:
            print("Servo 360 speed out of range. Must be from -100 to 100")
            return

        if value == 0:
            self.servo_write(index, 0)
            return
        else:
            degree = 90 - (value/100)*90
            self.servo_write(index, degree)


rover = Rover()

def stop_all(): # override stop function called by app
  rover.stop()
# Mục mở rộng dành cho bộ kit xe điều khiển Rover - Advanced Level

```python
from rover import *
import time

if True:
  rover.show_rgb_led(0, hex_to_rgb("#33ccff"))
  rover.show_led(1, 1) # left led
  rover.show_led(2, 1) # right led

while True:
  print(rover.ultrasonic.distance_cm())
  time.sleep_ms(100)
```

```python
# Square drawing robot
from rover import *

if True:
  rover.show_rgb_led(0, hex_to_rgb("#33ccff"))
  rover.show_led(1, 1) # left led
  rover.show_led(2, 1) # right led

while True:
  for i in range 4:
    rover.forward(20,2,True)
    rover.turn_right_angle(90)
```

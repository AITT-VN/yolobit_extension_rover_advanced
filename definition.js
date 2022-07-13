const ColorBlock = '#cb2026';
const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_rover_advanced/images/';

// Robot Move

Blockly.Blocks['rover_move'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_move",
        "message0": "%1 di chuyển %2 với tốc độ %3 (0-100)",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'move.svg',
            "width": 20,
            "height": 20,
            "alt": "",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": ImgUrl + 'arrow-up.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "forward"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-down.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "backward"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-left.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_left"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-right.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_right"
              ]
            ]
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_move"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var dir = block.getFieldValue("direction");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "rover." + dir + "(" + speed + ")\n";
  return code;
};

Blockly.Blocks['rover_move_delay'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_move_delay",
        "message0": "%1 di chuyển %2 với tốc độ %3 (0-100) trong %4 giây",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'move.svg',
            "width": 20,
            "height": 20,
            "alt": "",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": ImgUrl + 'arrow-up.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "forward"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-down.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "backward"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-left.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_left"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-right.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_right"
              ]
            ]
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            name: "time",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_move_delay"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var dir = block.getFieldValue("direction");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "";
  if ((dir == 'forward') || (dir == 'backward')) {
    code = "rover." + dir + "(" + speed + ", " + time + ", True)\n";
  } else code = "rover." + dir + "(" + speed + ", " + time + ")\n";
  return code;
};

Blockly.Blocks['rover_move_turn_angle'] = {
  init: function() {
    this.jsonInit(
      {
        "type": "rover_move_turn_angle",
        "message0": "%1 quay %2 một góc %3 với tốc độ %4 (cần cảm biến góc xoay)",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'move.svg',
            "width": 20,
            "height": 20,
            "alt": "",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": ImgUrl + 'arrow-left.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_left"
              ],
              [
                {
                  "src": ImgUrl + 'arrow-right.svg',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_right"
              ]
            ]
          },
          {
            type: "input_value",
            check: "Number",
            name: "angle",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_move_turn_angle"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var dir = block.getFieldValue("direction");
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "rover." + dir + "_angle(" + angle + ", " + speed + ")\n";
  return code;
};

Blockly.Blocks['rover_move_motor'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_move_motor",
        "message0": "%3 quay động cơ trái tốc độ %1 động cơ phải %2 (-100 đến 100)",
        "args0": [
          {
            "type": "input_value",
            "name": "left_wheel_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "right_wheel_speed",
            "check": "Number",
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'motor.svg',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_move_motor"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var left_wheel_speed = Blockly.Python.valueToCode(block, 'left_wheel_speed', Blockly.Python.ORDER_ATOMIC);
  var right_wheel_speed = Blockly.Python.valueToCode(block, 'right_wheel_speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "rover.set_wheel_speed(" + left_wheel_speed + ", " + right_wheel_speed + ")\n";
  return code;
};

Blockly.Blocks['rover_stop'] = {
  init: function () {
    this.jsonInit({
      "type": "rover_stop",
      "message0": "%1 dừng di chuyển",
      "args0": [
        {
          "type": "field_image",
          "src":  ImgUrl + 'stop.svg',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        }],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": ColorBlock,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["rover_stop"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  // TODO: Assemble Python into code variable.
  var code = "rover.stop()\n";
  return code;
};

// Servo

Blockly.Blocks["rover_servo_write_angle"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      nextStatement: null,
      tooltip: '',
      message0: '%3 quay servo chân %2 đến góc (0-180 độ) %1',
      previousStatement: null,
      args0: [
        { type: "input_value", name: "angle", check: "Number" },
        {
          type: "field_dropdown",
          name: "pin",
          options: [
            ["S1", "1"],
            ["S2", "2"],
          ],
        },
        {
          "type": "field_image",
          "src": ImgUrl + 'servo.png',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        }
      ],
      helpUrl: '',
    });
  },
};

Blockly.Python['rover_servo_write_angle'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var value_output = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var code = 'rover.servo_write(' + dropdown_pin + ', ' + value_output + ')\n';
  return code;
};

Blockly.Blocks['rover_servo360_write'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_servo360_write",
        message0: '%3 quay servo 360 chân %1 với tốc độ %2 (-100 đến 100)',
        "args0": [
          {
            type: "field_dropdown",
            name: "pin",
            options: [
              ["S1", "1"],
              ["S2", "2"],
            ],
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number"
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'servo.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        colour: ColorBlock,
        "tooltip": '',
        "helpUrl": ''
      }
    );
  }
};

Blockly.Python['rover_servo360_write'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var value_output = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var code = 'rover.servo360_write(' + dropdown_pin + ', ' + value_output + ')\n';
  return code;
};

// 2 LED 

Blockly.Blocks['rover_show_led'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_show_led",
        "message0": "%2 đèn %1 ",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "led",
            "options": [
              [
                "cả hai bên",
                "0"
              ],
              [
                "trái",
                "1"
              ],
              [
                "phải",
                "2"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "state",
            "options": [
              [
                "bật",
                "1"
              ],
              [
                "tắt",
                "0"
              ]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['rover_show_led'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var dropdown_led = block.getFieldValue('led');
  var dropdown_state = block.getFieldValue('state');
  // TODO: Assemble Python into code variable.
  var code = 'rover.show_led(' + dropdown_led + ', ' + dropdown_state + ')\n';
  return code;
};

// RGB LED

Blockly.Blocks['rover_show_rgb_led_array'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_show_rgb_led",
        "message0": "%7 đổi led RGB 1 %1 2 %2 3 %3 4 %4 5 %5 6 %6",
        "args0": [
          {
            "type": "input_value",
            "name": "color1"
          },
          {
            "type": "input_value",
            "name": "color2"
          },
          {
            "type": "input_value",
            "name": "color3"
          },
          {
            "type": "input_value",
            "name": "color4"
          },
          {
            "type": "input_value",
            "name": "color5"
          },
          {
            "type": "input_value",
            "name": "color6"
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'tiny-rgb.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['rover_show_rgb_led_array'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var value_color_1 = Blockly.Python.valueToCode(block, 'color1', Blockly.Python.ORDER_ATOMIC);
  var value_color_2 = Blockly.Python.valueToCode(block, 'color2', Blockly.Python.ORDER_ATOMIC);
  var value_color_3 = Blockly.Python.valueToCode(block, 'color3', Blockly.Python.ORDER_ATOMIC);
  var value_color_4 = Blockly.Python.valueToCode(block, 'color4', Blockly.Python.ORDER_ATOMIC);
  var value_color_5 = Blockly.Python.valueToCode(block, 'color5', Blockly.Python.ORDER_ATOMIC);
  var value_color_6 = Blockly.Python.valueToCode(block, 'color6', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'rover.show_rgb_led(1, hex_to_rgb(' + value_color_1 + '))\n';
  code = code + 'rover.show_rgb_led(2, hex_to_rgb(' + value_color_2 + '))\n';
  code = code + 'rover.show_rgb_led(3, hex_to_rgb(' + value_color_3 + '))\n';
  code = code + 'rover.show_rgb_led(4, hex_to_rgb(' + value_color_4 + '))\n';
  code = code + 'rover.show_rgb_led(5, hex_to_rgb(' + value_color_5 + '))\n';
  code = code + 'rover.show_rgb_led(6, hex_to_rgb(' + value_color_6 + '))\n';
  return code;
};

Blockly.Blocks['rover_show_rgb_led'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_show_rgb_led",
        "message0": "%3 đổi led RGB số %1 thành màu %2",
        "args0": [
          {
            "type": "input_value",
            "name": "number_led"
          },
          {
            "type": "input_value",
            "name": "color"
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'tiny-rgb.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['rover_show_rgb_led'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var value_number_led = Blockly.Python.valueToCode(block, 'number_led', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'rover.show_rgb_led(' + value_number_led + ', hex_to_rgb(' + value_color + '))\n';
  return code;
};

Blockly.Blocks['rover_show_rgb_led_all'] = {
  init: function () {
    this.jsonInit({
      "type": "rover_show_rgb_led_all",
      "message0": "%2 đổi màu tất cả led RGB thành %1",
      "args0": [
        {
          "type": "input_value",
          "name": "color"
        },
        {
          "type": "field_image",
          "src": ImgUrl + 'tiny-rgb.png',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": ColorBlock,
      "tooltip": "",
      "helpUrl": ""
    }
    );
  }
};

Blockly.Python['rover_show_rgb_led_all'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'rover.show_rgb_led(0, hex_to_rgb(' + value_color + '))\n';
  return code;
};

// Ultrasonic

Blockly.Blocks['rover_ultrasonic_read'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_ultrasonic_read",
        "message0": "%1 đọc cảm biến khoảng cách (cm)",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'ultrasonic.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "colour": ColorBlock,
        "output": "Number",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_ultrasonic_read"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  // TODO: Assemble Python into code variable.
  var code = "rover.ultrasonic.distance_cm()";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['rover_ultrasonic_detect'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_ultrasonic_detect",
        "message0": "%1 đọc cảm biến khoảng cách %2 %3 cm %4",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'ultrasonic.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "compare",
            "options": [
              ["<", "<"],
              [">", ">"],
              ["=", "=="],
            ],
          },
          {
            "type": "input_value",
            "name": "distance"
          },
          {
            type: "input_dummy",
          }
        ],
        "colour": ColorBlock,
        "output": "Boolean",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_ultrasonic_detect"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var compare = block.getFieldValue("compare");
  var value_distance = Blockly.Python.valueToCode(block, 'distance', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "rover.ultrasonic.distance_cm() " + compare + " " + value_distance;
  return [code, Blockly.Python.ORDER_NONE];
};

// IR reciever

Blockly.Blocks["rover_ir_recv"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "%1 nút %2 trên remote được nhấn",
      args0: [
        {
          "type": "field_image",
          "src": ImgUrl + 'remote.png',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        },
        {
          type: "field_dropdown",
          name: "remote",
          options: [
            ["A", "A"],
            ["B", "B"],
            ["C", "C"],
            ["D", "D"],
            ["E", "E"],
            ["F", "F"],
            [
              {
                "src": ImgUrl + 'forward.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "UP"
            ],
            [
              {
                "src": ImgUrl + 'backward.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "DOWN"
            ],
            [
              {
                "src": ImgUrl + 'turn_left.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "LEFT"
            ],
            [
              {
                "src": ImgUrl + 'turn_right.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "RIGHT"
            ],
            ["Setup", "SETUP"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
          ],
        },
      ],
      output: "Boolean",
      helpUrl: "",
    });
  },
  getDeveloperVars: function () {
    return ['rover_ir_rx'];
  }
};

Blockly.Python["rover_ir_recv"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_rover_ir_receiver_init'] = 'rover_ir_rx.start()';
  var remote = block.getFieldValue("remote");
  // TODO: Assemble Python into code variable.
  var code = 'rover_ir_rx.get_code() == IR_REMOTE_' + remote;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["rover_ir_clear"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "%1 xóa tín hiệu đã thu được",
      args0: [
        {
          "type": "field_image",
          "src": ImgUrl + 'remote.png',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        }
      ],
      previousStatement: null,
      nextStatement: null,
      helpUrl: "",
    });
  },
  getDeveloperVars: function () {
    return ['rover_ir_rx'];
  }
};

Blockly.Python["rover_ir_clear"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  // TODO: Assemble Python into code variable.
  var code = 'rover_ir_rx.clear_code()\n';
  return code;
};

Blockly.Blocks["rover_ir_on_receive"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      message0: "nếu %1 nhận được %2 %3 %4 từ remote",
      args0: [
        {
          "type": "field_image",
          "src": ImgUrl + 'remote.png',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        },
        {
          variable: "tín hiệu",
          type: "field_variable",
          name: "message",
        },
        {
          type: "input_dummy",
        },
        {
          type: "input_statement",
          name: "ACTION",
        },
      ],
      helpUrl: "",
    });
  },
  getDeveloperVars: function () {
    return ['rover_ir_rx'];
  }
};

Blockly.Python['rover_ir_on_receive'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_rover_ir_receiver_init'] = 'rover_ir_rx.start()';
  var variable_message = Blockly.Python.variableDB_.getName(block.getFieldValue('message'), Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE);
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');

  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (Blockly.Python.variableDB_.getName(varName, Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE) != variable_message) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
        Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
    }
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_ir_receive_callback',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(' + variable_message + ', addr, ext):',
      globals,
    statements_action || Blockly.Python.PASS
    ]);

  var code = 'rover_ir_rx.on_received(' + cbFunctionName + ')\n';
  Blockly.Python.definitions_['on_ir_receive_callback' + '_statement'] = code;

  return '';
};

Blockly.Blocks["rover_ir_remote_btn"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "nút %1",
      args0: [
        {
          type: "field_dropdown",
          name: "remote",
          options: [
            ["A", "A"],
            ["B", "B"],
            ["C", "C"],
            ["D", "D"],
            ["E", "E"],
            ["F", "F"],
            [
              {
                "src": ImgUrl + 'forward.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "UP"
            ],
            [
              {
                "src": ImgUrl + 'backward.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "DOWN"
            ],
            [
              {
                "src": ImgUrl + 'turn_left.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "LEFT"
            ],
            [
              {
                "src": ImgUrl + 'turn_right.svg',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "RIGHT"
            ],
            ["Setup", "SETUP"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
          ],
        },
      ],
      output: "Boolean",
      helpUrl: "",
    });
  },
  getDeveloperVars: function () {
    return ['rover_ir_rx'];
  }
};

Blockly.Python["rover_ir_remote_btn"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var remote = block.getFieldValue("remote");
  // TODO: Assemble Python into code variable.
  var code = 'IR_REMOTE_' + remote;
  return [code, Blockly.Python.ORDER_NONE];
};


// Line Array

Blockly.Blocks['rover_line_sensor_read_all'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_line_sensor_read_all",
        "message0": "%1 cảm biến line phát hiện S1 %2 S2 %3 S3 %4 S4 %5",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'line.svg',
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "S1",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S2",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S3",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S4",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          }
        ],
        "colour": ColorBlock,
        "output": "Boolean",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_line_sensor_read_all"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  // TODO: Assemble Python into code variable.
  var code = "rover.read_line_sensors() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['rover_line_sensor_read_single'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "rover_line_sensor_read_single",
        "message0": "%1 cảm biến line đọc giá trị %2",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'line.svg',
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "pin",
            "options": [
              ["S1", "1"],
              ["S2", "2"],
              ["S3", "3"],
              ["S4", "4"],
            ],
          },
        ],
        "colour": ColorBlock,
        "output": "",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["rover_line_sensor_read_single"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  var pin = block.getFieldValue("pin");
  // TODO: Assemble Python into code variable.
  var code = "rover.read_line_sensors(" + pin + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

//==============MPU==============

// Blockly.Blocks["rover_mpu_get_accel"] = {
//   init: function () {
//     this.jsonInit({
//       colour: ColorBlock,
//       tooltip: "",
//       message0: "%2 đọc cảm biến gia tốc %1",
//       args0: [
//         {
//           type: "field_dropdown",
//           name: "accel",
//           options: [
//             ["x", "x"],
//             ["y", "y"],
//             ["z", "z"],
//           ],
//         },
//         {
//           "type": "field_image",
//           "src": ImgUrl + "xyz-axis.png",
//           "width": 20,
//           "height": 20,
//           "alt": "*",
//           "flipRtl": false
//         }
//       ],
//       output: "Number",
//       helpUrl: ""
//     });
//   },
// };

// Blockly.Blocks["rover_mpu_get_gyro"] = {
//   init: function () {
//     this.jsonInit({
//       colour: ColorBlock,
//       tooltip: "",
//       message0: "%2 đọc cảm biến gyroscope %1",
//       args0: [
//         {
//           type: "field_dropdown",
//           name: "gyro",
//           options: [
//             ["roll", "roll"],
//             ["pitch", "pitch"],
//             ["yaw", "yaw"],
//           ]
//         },
//         {
//           "type": "field_image",
//           "src": ImgUrl + "xyz-axis.png",
//           "width": 20,
//           "height": 20,
//           "alt": "*",
//           "flipRtl": false
//         }
//       ],
//       output: "Number",
//       helpUrl: ""
//     });
//   },
// };

// Blockly.Blocks["rover_mpu_is_shake"] = {
//   init: function () {
//     this.jsonInit({
//       colour: ColorBlock,
//       tooltip: "",
//       message0: "%1 cảm biến bị rung",
//       args0: [
//         {
//           "type": "field_image",
//           "src": ImgUrl + "xyz-axis.png",
//           "width": 20,
//           "height": 20,
//           "alt": "*",
//           "flipRtl": false
//         }
//       ],
//       output: "Boolean",
//       helpUrl: ""
//     });
//   },
// };

//==============MPU==============
// Blockly.Python["rover_mpu_get_accel"] = function (block) {
//   var accel = block.getFieldValue("accel");
//   Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
//   Blockly.Python.definitions_['import_rover'] = 'from rover import *';
//   // TODO: Assemble Python into code variable.
//   var code = "motion.get_accel('" + accel + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["rover_mpu_get_gyro"] = function (block) {
//   var gyro = block.getFieldValue("gyro");
//   Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
//   Blockly.Python.definitions_['import_rover'] = 'from rover import *';
//   // TODO: Assemble Python into code variable.
//   var code = "motion.get_gyro_"+ gyro +"()";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["rover_mpu_is_shake"] = function (block) {
//   var gyro = block.getFieldValue("gyro");
//   Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
//   Blockly.Python.definitions_['import_rover'] = 'from rover import *';
//   // TODO: Assemble Python into code variable.
//   var code = "motion.is_shaked()";
//   return [code, Blockly.Python.ORDER_NONE];
// };
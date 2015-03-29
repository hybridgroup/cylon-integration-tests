"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    beaglebone: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    led1: { driver: "led", pin: "P9_12" },
    led2: { driver: "led", pin: "P9_13" },
    button: { driver: "button", pin: "P9_14" },
    servo: {
      driver: "servo",
      pin: "P9_21",
      freq: 50,
      pulseWidth: { min: 500, max: 2400 },
      limits: { bottom: 20, top: 160 }
    },    
    dial: { driver: "analog-sensor", pin: "P9_33" },
    motor: { driver: 'motor', pin: 'P9_42' }
  },

  work: function(my) {
    var angle = 0,
        increment = 20,
        speed = 100;

    every((1).second(), my.led1.toggle);
    every((2).seconds(), my.led2.toggle);
    my.button.on("push", my.led2.toggle);

    every((1).seconds(), function() {
      if (angle >= 0 && angle <= 140) {
        angle += increment;
      } else {
      	angle = 0; // start over
      };
      my.servo.angle(angle);
      console.log("Current Angle: " + my.servo.currentAngle());
    });
    every((1).seconds(), function() {
      var reading = my.dial
        .analogRead()
        .fromScale(0, 1799)
        .toScale(0, 255) | 0;
      console.log("reading => ", reading);
    });
    every((2).seconds(), function() {
      if (speed == 0) {
        speed = 100;
      } else {
        speed = 0; // start over
      };
      my.motor.speed(speed);
      console.log("Current Speed: " + my.motor.currentSpeed());
    });
  }
}).start();

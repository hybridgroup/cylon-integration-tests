"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: "raspi" }
  },

  devices: {
    led1: { driver: "led", pin: 7 },
    led2: { driver: "led", pin: 11 },
    button: { driver: "button", pin: 12 },
    servo: {
      driver: "servo",
      pin: 13,
      freq: 50,
      pulseWidth: { min: 500, max: 2400 },
      limits: { bottom: 20, top: 160 }
    },    
    motor: { driver: 'motor', pin: 15 }
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

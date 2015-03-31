"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    spark: { adaptor: "spark",       
             accessToken: process.env.token,
             deviceId: process.env.device,
             readInterval: 1000
           }
  },

  devices: {
    led1: { driver: "led", pin: "D0" },
    led2: { driver: "led", pin: "D1" },
    button: { driver: "button", pin: "D2" },
    servo: {
      driver: "servo",
      pin: "A0",
      limits: { bottom: 20, top: 160 }
    },    
    dial: { driver: "analog-sensor", pin: "A1" },
    motor: { driver: "motor", pin: "A4" }
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
      var reading = my.dial.analogRead() | 0;
      reading = reading.fromScale(0, 1799).toScale(0, 255);
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

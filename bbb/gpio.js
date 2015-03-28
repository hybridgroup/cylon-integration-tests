"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    beaglebone: { adaptor: "beaglebone" }
  },

  devices: {
    led1: { driver: "led", pin: "P9_12" },
    led2: { driver: "led", pin: "P9_13" },
    servo: {
      driver: "servo",
      pin: "P9_14",
      freq: 50,
      // pulseWidth in MicroSeconds as per servo spec sheet
      // e.g. http://www.servodatabase.com/servo/towerpro/sg90
      pulseWidth: { min: 500, max: 2400 },
      limits: { bottom: 20, top: 160 }
    },    
    button: { driver: "button", pin: "P9_11" },
    dial: { driver: "analogSensor", pin: "P9_33" },
  },

  work: function(my) {
    var angle = 0,
        increment = 20;

    every((1).second(), my.led1.toggle);
    every((2).seconds(), my.led2.toggle);
    my.button.on("push", my.led2.toggle);
    every((1).seconds(), function() {
      var reading = my.dial
        .analogRead()
        .fromScale(0, 1799)
        .toScale(0, 255) | 0;
      console.log("reading => ", reading);
    });

    every((1).seconds(), function() {
      if (angle >= 0 && angle <= 140) {
				angle += increment;      	
      } else {
      	angle = 0; // start over
      };
      my.servo.angle(angle);
      console.log("Current Angle: " + my.servo.currentAngle());
    });    
  }
}).start();

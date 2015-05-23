"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    beaglebone: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    led1: { driver: "led", pin: "2" },
    led2: { driver: "led", pin: "3" },
    button: { driver: "button", pin: "4" },
    dial: { driver: "analog-sensor", pin: "5" },
  },

  work: function(my) {
    var angle = 0,
        increment = 20,
        speed = 100;

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
  }
}).start();

"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM1" }
  },

  devices: {
    mpu6050: { driver: "mpu6050" }
  },

  work: function(my) {
    every((1).seconds(), function() {
      my.mpu6050.getMotionAndTemp(function(err, data) {
        console.log(err, data);
      });
    });
  }
}).start();

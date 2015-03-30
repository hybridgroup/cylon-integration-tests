"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: "raspi" }
  },

  devices: {
    blinkm: { driver: "blinkm" },
    mpl115a2: { driver: "mpl115a2" },
    mpu6050: { driver: "mpu6050" }
  },

  work: function(my) {
    my.blinkm.stopScript();
    my.blinkm.goToRGB(0,0,0);

    every((2).seconds(), function() {
      my.blinkm.getRGBColor(function(err, data){
        console.log("Current Color: ", data);
      });
      my.blinkm.fadeToRandomRGB(128, 128, 128);
    });

    every((1).seconds(), function() {
      my.mpl115a2.getPressure(function(err, data) {
        console.log(err, data);
      });
    });

    every(500, function() {
      my.mpu6050.getMotionAndTemp(function(err, data) {
        console.log(err, data);
      });
    });
  }
}).start();

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
  },

  work: function(my) {
    every((1).second(), my.led1.toggle);
    every((2).seconds(), my.led2.toggle);
    my.button.on("push", my.led2.toggle);
  }
}).start();

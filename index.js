const Api = require("./api");

class Novastar {
  constructor(ip, options = {}) {
    this.ip = ip;
    this.port = options.port || 8001;
    this.debug = options.debug || false;
    this.baseurl = `http://${ip}:${this.port}/api/v1/`;
    this.cache = {};
    this.api = new Api(this.ip, this.port);
    this.initializeMethods();
  }

  initializeMethods() {
    const methods = [
      "apiversion",
      "blackout",
      "normal",
      "freeze",
      "brightness",
      "colortemperature",
      "gamma",
      "displaymode",
      "cabinet",
      "summary",
      "sources",
      "input",
      "presets",
      "preset",
      "hdr",
      "dynamicboost",
      "colorspace",
      "workingmode",
      "testpattern",
      // v1.4 methods
      "monitor",
      "screenbrightness",
      "cabinetbrightness",
      "screen",
      "set3DLUTEnable",
      "setFrameRemapingEnable",
      "setThermacalEnable",
      "setCorrectionEffect",
      "setCabinetXbitEnable",
      "getCabinetEffectMode",
      "setCabinetEffectMode"
    ];

    methods.forEach((method) => {
      this[method] = (...args) => {
        if (typeof this.api[method] === 'function') {
          return this.api[method](...args);
        } else {
          throw new Error(`Method '${method}' is not implemented`);
        }
      };
    });
  }
}

module.exports = Novastar;
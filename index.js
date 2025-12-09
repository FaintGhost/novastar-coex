const coexApi = require("./api");

class COEX {
  constructor(ip, port, options = {}) {
    this.ip = ip;
    this.port = port || 8001;
    this.debug = options.debug || false;
    this.baseurl = `http://${ip}:${this.port}`;
    this.cache = {};
    this.api = new coexApi(this.ip, this.port);
    this.initializeMethods();
  }

  initializeMethods() {
    const methods = [
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
      "getPreset",
      "applyPreset",
      "dynamicboost",
      "colorspace",
      "monitor",
      "screenbrightness",
      "screen",
      "enable3DLut",
      "getDisplayParams",
      "setHdrMode",
      "getDisplayState",
      "setMapping",
      "getScreenList",
    ];

    methods.forEach((method) => {
      this[method] = (...args) => {
        if (typeof this.api[method] === 'function') {
          return this.api[method](...args);
        } else {
          throw new Error(`Method '${method}' is not implemented in the API`);
        }
      };
    });
  }
}

module.exports = COEX;

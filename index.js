const ApiV1_0 = require("./api-v1.0");
const ApiV1_4 = require("./api-v1.4");

class Novastar {
  constructor(ip, options = {}) {
    this.ip = ip;
    this.port = options.port || 8001;
    this.debug = options.debug || false;
    this.baseurl = `http://${ip}:${this.port}/api/v1/`;
    this.cache = {};
    this.apiVersion = options.apiVersion || "1.4";
    this.api = this.apiVersion === "1.0" ? new ApiV1_0(this.ip, this.port) : new ApiV1_4(this.ip, this.port);
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
    ];

    const v1_4Methods = [
      "monitor",
      // Add more v1.4-specific methods here
    ];

    if (this.apiVersion === "1.4") {
      methods.push(...v1_4Methods);
    }

    methods.forEach((method) => {
      this[method] = (...args) => {
        if (typeof this.api[method] === 'function') {
          return this.api[method](...args);
        } else {
          throw new Error(`Method '${method}' is not implemented in API version ${this.apiVersion}`);
        }
      };
    });
  }
}

module.exports = Novastar;

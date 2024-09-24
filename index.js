const _ = require("lodash");
const axios = require("axios");
const ApiV1_0 = require("./api-v1.0");
const ApiV1_4 = require("./api-v1.4");

module.exports = class Novastar {
  constructor(ip) {
    this.ip = ip;
    this.port = 8001;
    this.debug = false;
    this.baseurl = `http://${this.ip}:${this.port}/api/v1/`;
    this.cache = {};
    this.apiVersion = null;
    this.api = null;
    this.ready = this.checkApiVersion();
    this.initializeMethods();
  }

  async checkApiVersion() {
    const url = this.baseurl + "screen";

    try {
      await axios.get(url);
      this.apiVersion = "1.4";
      console.log("Using API v1.4");
      this.api = new ApiV1_4(this.ip, this.port);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.apiVersion = "1.0";
        this.api = new ApiV1_0(this.ip, this.port);
        console.log("Using API v1.0");
      } else {
        console.error("Error checking API version:", error);
        throw error;
      }
    }
  }

  initializeMethods() {
    let methods = [
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
      methods = [...methods, ...v1_4Methods];
    }

    methods.forEach((method) => {
      this[method] = async function (...args) {
        await this.ready;
        return this.api[method](...args);
      };
    });
  }
};

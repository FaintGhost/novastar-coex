const _ = require("lodash");
const axios = require("axios");
const ApiV1_0 = require("./api-v1.0");
const ApiV1_4 = require("./api-v1.4");

module.exports = function (ip) {
  this.ip = ip;
  this.port = 8001;
  this.debug = false;
  this.baseurl = "http://" + this.ip + ":" + this.port + "/api/v1/";
  this.cache = {};
  this.apiVersion = null;
  this.api = null;

  this.checkApiVersion = function () {
    return new Promise((resolve, reject) => {
      const url = this.baseurl + "screen";

      axios
        .get(url)
        .then(() => {
          this.apiVersion = "1.4";
          this.api = new ApiV1_4(this.ip, this.port);
          resolve();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.apiVersion = "1.0";
            this.api = new ApiV1_0(this.ip, this.port);
            resolve();
          } else {
            console.error("Error checking API version:", error);
            reject(error);
          }
        });
    });
  };

  // Proxy methods to the appropriate API version
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
    "presets",
    "preset",
    "hdr",
    "dynamicboost",
    "colorspace",
    "workingmode",
    "testpattern",
  ];

  methods.forEach((method) => {
    this[method] = async function (...args) {
      if (!this.api) {
        try {
          await this.checkApiVersion();
        } catch (error) {
          console.error("Failed to determine API version:", error);
          throw error;
        }
      }
      return this.api[method](...args);
    };
  });
};

const _ = require("lodash");

// Require the new modules
const screenApi = require("./api/screen");
const deviceApi = require("./api/device");
const presetApi = require("./api/preset");

function coexApi(ip, port) {
  this.baseurl = `http://${ip}:${port}`;

  // Shared response parser - now returns a Promise
  const responseparser = (data, path) => {
    return new Promise((resolve, reject) => {
      if (data.code) {
        const error = { error: data.message };
        if (error.error === "device locked") {
          error.note = "VMP is likely on another device. Either close VMP or run Companion on the same machine & IP address.";
        }
        reject(error); // Reject the promise on API error
      } else {
        let result = data;
        if (path) {
          result = _.get(data, path);
        }
        resolve(result); // Resolve the promise with the data
      }
    });
  };

  // --- Initialize methods from modules ---
  const screenMethods = screenApi(this, responseparser);
  const deviceMethods = deviceApi(this, responseparser);
  const presetMethods = presetApi(this, responseparser); // Contains getPreset, applyPreset

  // --- Assign methods to the instance ---
  // Methods like getPreset and applyPreset will be assigned here
  Object.assign(this, screenMethods, deviceMethods, presetMethods);

  // --- Keep methods that orchestrate calls or provide aliases ---

  this.apiversion = function () {
    return "1.4";
  };

  // Syntax sugar for display modes (uses this.displaymode from screenApi)
  // Returns a Promise
  this.blackout = function () {
    console.log("blackout the screen");
    return this.displaymode(1); // displaymode now returns a Promise
  };

  // Returns a Promise
  this.normal = function () {
    console.log("normal the screen");
    return this.displaymode(0); // displaymode now returns a Promise
  };

  // Returns a Promise
  this.freeze = function () {
    console.log("freeze the screen");
    return this.displaymode(2); // displaymode now returns a Promise
  };

  // Brightness orchestration (uses this.screen and this.screenbrightness from screenApi)
  // Returns a Promise
  this.brightness = async function (brightness) {
    console.log("adjust brightness", brightness);
    try {
      const screenData = await this.screen(); // screen now returns a Promise
      console.log("screen response");
      console.log(screenData);
      if (screenData && screenData.screens) {
        const screenIds = screenData.screens.map(screen => screen.screenID);
        console.log(screenIds);
        if (screenIds.length > 0) {
          // screenbrightness now returns a Promise
          return await this.screenbrightness(brightness, screenIds);
        } else {
          throw { error: "No screens found to adjust brightness." };
        }
      } else {
        throw { error: "Failed to retrieve screen IDs or invalid response format" };
      }
    } catch (error) {
      console.error("Error setting brightness:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  // Input setting (uses this.sources from deviceApi)
  // Returns a Promise
  this.input = async function (input) {
    const baseurl = this.baseurl; // Keep reference for nested scope
    try {
      const sources = await this.sources(); // sources now returns a Promise
      const lookup = {};
      _.each(sources, (source) => {
        lookup[source.name] = source.groupId;
        lookup[source.groupId] = source.groupId;
      });

      let groupId = lookup[input];

      if (!groupId) {
        throw { error: "Unknown input: " + input };
      }

      const url = baseurl + "/api/v1/screen/layer/input";
      const payload = { groupId: groupId };

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
      }
      // Use the promise-based responseparser
      await responseparser(data); // Wait for parsing, handle potential errors
      return { input: input, groupId: groupId }; // Return success data

    } catch (error) {
      console.error("Error setting input:", error);
      throw error; // Re-throw the error
    }
  };

  // Summary (uses this.cabinet from deviceApi)
  // Returns a Promise containing the cabinet count or throws an error
  this.summary = async function () {
    try {
      const cabinets = await this.cabinet(); // cabinet now returns a Promise
      if (cabinets && cabinets.length !== undefined) {
        console.log("Cabinet count:", cabinets.length);
        return cabinets.length; // Return the count
      } else {
        console.log("Could not get cabinet count.");
        throw { error: "Could not get cabinet count." };
      }
    } catch (error) {
      console.error("Error in summary (getting cabinets):", error);
      throw error; // Re-throw the error
    }
  };

}

module.exports = coexApi;

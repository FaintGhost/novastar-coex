// api/preset.js
const _ = require("lodash");

module.exports = function (instance, responseparser) {
  const baseurl = instance.baseurl;

  // Renamed from presets
  const getPreset = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/preset";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Parse the response first
        const parsedData = await responseparser(data, "data");
        // Extract the actual presets list
        let presetList = [];
        if (parsedData && parsedData.screenPresets && parsedData.screenPresets.length > 0) {
          presetList = parsedData.screenPresets[0]?.presets || [];
        } else {
          console.warn("Presets data structure might be different than expected or empty:", parsedData);
        }
        resolve(presetList);
      } catch (error) {
        console.error("Error (presets):", error);
        reject({ error: error.message || 'Fetch/Parse failed' });
      }
    });
  };

  // Renamed from preset
  const applyPreset = function (preset, screenID) {
    return new Promise(async (resolve, reject) => {
      console.log("apply preset", preset, "for screen", screenID || "default/first"); // Log updated

      const performPresetUpdate = async (targetScreenID) => {
        try {
          // Fetch presets using the renamed method
          const presetsData = await instance.getPreset(); // Changed from instance.presets()

          const lookup = {};
          _.each(presetsData, (p) => {
            lookup[p.name] = p.sequenceNumber;
            lookup[p.sequenceNumber] = p.sequenceNumber;
          });

          let identifier = lookup[preset];

          if (identifier === undefined || identifier === null) {
            throw { error: "Unknown preset: " + preset };
          }

          const url = baseurl + "/api/v1/preset/current/update";
          const payload = { sequenceNumber: identifier, screenID: targetScreenID };

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
          }
          return responseparser(data);
        } catch (error) {
          console.error("Error during preset update:", error);
          throw { error: error.message || 'Preset update failed' }; // Re-throw for outer catch
        }
      };

      try {
        let targetScreenID = screenID;
        if (!targetScreenID) {
          // Fetch the first screen ID if not provided
          const screenData = await instance.screen(); // Assumes instance.screen is promise-based
          targetScreenID = screenData?.screens?.[0]?.screenID;
          if (!targetScreenID) {
            return reject({ error: "No screens found or failed to retrieve screen ID for preset." });
          }
        }
        resolve(await performPresetUpdate(targetScreenID));
      } catch (error) {
        // Catch errors from screen fetching or preset update
        console.error("Error in applyPreset function:", error); // Log updated
        reject(error);
      }
    });
  };

  return {
    getPreset,    // Changed from presets
    applyPreset   // Changed from preset
  };
};

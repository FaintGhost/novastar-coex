// api/screen.js
const _ = require("lodash");

// Helper function to resolve screen IDs - supports screenIndex, screenID string, array, or options object
const _resolveScreenIds = async (instance, screenParam) => {
  // Fetch screen data for index-based lookups
  const getScreenData = async () => {
    const screenData = await instance.screen();
    if (!screenData || !screenData.screens || screenData.screens.length === 0) {
      throw { error: "No screens found." };
    }
    return screenData;
  };

  // No parameter - return all screen IDs
  if (screenParam === undefined || screenParam === null) {
    const screenData = await getScreenData();
    return screenData.screens.map(s => s.screenID);
  }

  // String - single screenID
  if (typeof screenParam === "string") {
    return [screenParam];
  }

  // Array - array of screenIDs
  if (Array.isArray(screenParam)) {
    return screenParam;
  }

  // Object with options - supports { screenIndex: number } or { screenIds: [] }
  if (typeof screenParam === "object") {
    if (screenParam.screenIds && Array.isArray(screenParam.screenIds)) {
      return screenParam.screenIds;
    }
    if (typeof screenParam.screenIndex === "number") {
      const screenData = await getScreenData();
      const screen = screenData.screens[screenParam.screenIndex];
      if (!screen) {
        throw { error: `Screen index ${screenParam.screenIndex} not found. Available: 0-${screenData.screens.length - 1}` };
      }
      return [screen.screenID];
    }
  }

  console.error("Invalid screenParam format");
  throw { error: "Invalid screen parameter format" };
};

// Helper function to resolve canvas IDs from screen data
const _resolveCanvasIds = async (instance, screenParam) => {
  const screenData = await instance.screen();
  if (!screenData || !screenData.screens || screenData.screens.length === 0) {
    throw { error: "No screens found." };
  }

  let targetScreens = screenData.screens;

  // Filter by screenIndex if provided
  if (screenParam && typeof screenParam === "object" && typeof screenParam.screenIndex === "number") {
    const screen = screenData.screens[screenParam.screenIndex];
    if (!screen) {
      throw { error: `Screen index ${screenParam.screenIndex} not found. Available: 0-${screenData.screens.length - 1}` };
    }
    targetScreens = [screen];
  }

  // Extract all canvasIDs from target screens
  const canvasIds = [];
  targetScreens.forEach(screen => {
    if (screen.canvases && Array.isArray(screen.canvases)) {
      screen.canvases.forEach(canvas => {
        if (canvas.canvasID !== undefined) {
          canvasIds.push(canvas.canvasID);
        }
      });
    }
  });

  if (canvasIds.length === 0) {
    throw { error: "No canvas IDs found in screen data." };
  }

  return canvasIds;
};


module.exports = function (instance, responseparser) {
  const baseurl = instance.baseurl;
  // Returns a Promise
  const screen = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/screen";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Revert: Resolve with the 'data' property using responseparser path
        resolve(responseparser(data, "data"));
      } catch (error) {
        console.error("Fetch error (screen):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  // Returns a Promise - Modified to use _resolveScreenIds
  const screenbrightness = function (brightness, screenids) { // screenids is now optional here too
    return new Promise(async (resolve, reject) => {
      try {
        const finalIds = await _resolveScreenIds(instance, screenids); // Use helper

        if (brightness > 1) brightness = brightness / 100;
        console.log("adjust brightness ", brightness);

        const url = baseurl + "/api/v1/screen/brightness";
        const payload = {
          brightness: brightness,
          screenIdList: finalIds, // Use resolved IDs
        };

        console.log(url);
        console.log(payload);

        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        // Catch errors from _resolveScreenIds or fetch
        console.error("Error in screenbrightness:", error);
        reject(error.error ? error : { error: "Failed to set screen brightness" });
      }
    });
  };

  // Returns a Promise
  const displaymode = function (value) {
    return new Promise(async (resolve, reject) => {
      console.log("adjust display mode of the screen", value);
      const url = baseurl + "/api/v1/screen/output/displaymode";

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: value })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        console.error("Fetch error (displaymode):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  // Returns a Promise - Modified to use _resolveScreenIds
  const gamma = function (value, screenids) {
    return new Promise(async (resolve, reject) => {
      // Validate gamma value
      if (typeof value === "string") value = parseFloat(value.replace(/[^\d.-]/g, ""));
      if (value < 1) value = 1; else if (value > 4) value = 4;
      if (!value) {
        console.log("Gamma value is required (1-4)");
        return reject({ error: "Gamma value is required (1-4)" });
      }

      try {
        const finalIds = await _resolveScreenIds(instance, screenids); // Use helper

        const url = baseurl + "/api/v1/screen/gamma";
        const payload = {
          screenIdList: finalIds, // Use resolved IDs
          gamma: value,
        };
        console.log("Adjust screen gamma", value, "on screens:", finalIds);

        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        // Catch errors from _resolveScreenIds or fetch
        console.error("Error in gamma function:", error);
        reject(error.error ? error : { error: "Failed to set gamma" });
      }
    });
  };

  // Returns a Promise - Modified to use _resolveScreenIds
  const colortemperature = function (value, screenids) {
    return new Promise(async (resolve, reject) => {
      // Validate color temperature value
      if (typeof value === "string") value = parseInt(value.replace(/[^\d]/g, ""));
      if (value < 1700) value = 1700; else if (value > 15000) value = 15000;
      if (!value) {
        console.log("Color temperature value is required (1700-15000)");
        return reject({ error: "Color temperature value is required (1700-15000)" });
      }

      try {
        const finalIds = await _resolveScreenIds(instance, screenids); // Use helper

        const url = baseurl + "/api/v1/screen/colortemperature";
        const payload = {
          screenIdList: finalIds, // Use resolved IDs
          colorTemperature: value,
        };
        console.log("Adjust screen color temperature", value, "on screens:", finalIds);

        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        // Catch errors from _resolveScreenIds or fetch
        console.error("Error in colortemperature function:", error);
        reject(error.error ? error : { error: "Failed to set color temperature" });
      }
    });
  };

  // Returns a Promise - Modified to use _resolveScreenIds
  const enable3DLut = function (enable, screenids) {
    return new Promise(async (resolve, reject) => {
      // Validate enable parameter
      if (typeof enable !== 'boolean') {
        console.error("enable3DLut: 'enable' parameter must be a boolean (true or false).");
        return reject({ error: "'enable' parameter must be a boolean" });
      }

      try {
        const finalIds = await _resolveScreenIds(instance, screenids); // Use helper

        const url = baseurl + "/api/v1/screen/processing/threedlut/enable";
        const payload = {
          screenIdList: finalIds, // Use resolved IDs
          enable: enable,
        };
        console.log(`Setting 3D LUT enable to ${enable} on screens:`, finalIds);

        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        // Catch errors from _resolveScreenIds or fetch
        console.error("Error in enable3DLut function:", error);
        reject(error.error ? error : { error: "Failed to set 3D LUT status" });
      }
    });
  };

  // Returns a Promise to get display parameters for screens
  const getDisplayParams = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/screen/displayparams";
      // console.log("Get screen display parameters");
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Resolve with the 'list' property inside 'data' using responseparser
        resolve(responseparser(data, "data.list"));
      } catch (error) {
        console.error("Fetch error (getDisplayParams):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  // Returns a Promise to get the current display state (mapping and display mode)
  const getDisplayState = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/screen/output/display/state";
      // console.log("Get screen output display state");
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Resolve with the 'data' property using responseparser
        resolve(responseparser(data, "data"));
      } catch (error) {
        console.error("Fetch error (getDisplayState):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };
  // Returns a Promise to set screen mapping (enable/disable canvas mapping)
  // screenParam: optional - { screenIndex: number } to target specific screen, or omit for all screens
  const setMapping = function (enable, screenParam) {
    return new Promise(async (resolve, reject) => {
      // Validate enable parameter
      if (typeof enable !== 'boolean') {
        console.error("setMapping: 'enable' parameter must be a boolean (true or false).");
        return reject({ error: "'enable' parameter must be a boolean" });
      }

      try {
        const canvasIds = await _resolveCanvasIds(instance, screenParam);
        const url = baseurl + "/api/v1/screen/output/canvas/mapping";
        const payload = {
          enable: enable,
          canvasIds: canvasIds,
        };
        console.log(`Setting canvas mapping to ${enable} for canvas IDs:`, canvasIds);

        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data));
      } catch (error) {
        console.error("Error in setMapping function:", error);
        reject({ error: error.message || 'Failed to set canvas mapping' });
      }
    });
  };

  // Returns a Promise with simplified screen list for Companion dropdowns
  const getScreenList = function () {
    return new Promise(async (resolve, reject) => {
      try {
        const screenData = await screen();
        if (!screenData || !screenData.screens) {
          return resolve([]);
        }
        const list = screenData.screens.map((s, index) => ({
          index: index,
          id: s.screenID,
          name: s.screenName || `Screen ${index + 1}`,
          canvasCount: s.canvases ? s.canvases.length : 0
        }));
        resolve(list);
      } catch (error) {
        console.error("Error in getScreenList:", error);
        reject({ error: error.message || 'Failed to get screen list' });
      }
    });
  };

  return {
    screen,
    screenbrightness,
    displaymode,
    gamma,
    colortemperature,
    enable3DLut,
    getDisplayParams,
    getDisplayState,
    setMapping,
    getScreenList
  };
};

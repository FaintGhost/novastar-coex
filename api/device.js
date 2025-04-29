// api/device.js
const _ = require("lodash");

module.exports = function (instance, responseparser) {
  const baseurl = instance.baseurl;

  // Returns a Promise
  const cabinet = function () {
    return new Promise(async (resolve, reject) => {
      console.log("Get list of attached cabinets");
      const url = baseurl + "/api/v1/device/cabinet";

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Use the promise-based responseparser with path
        resolve(responseparser(data, "data"));
      } catch (error) {
        console.error("Fetch error (cabinet):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  // Returns a Promise
  const sources = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/device/input/sources";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        // Parse the response first
        const parsedData = await responseparser(data, "data");
        // Then process the data
        let processedData = _.map(parsedData, (d) => {
          if (d.supportFrameRate) d.supportFrameRate = _.split(d.supportFrameRate, "|");
          if (d.supportResolution) d.supportResolution = _.split(d.supportResolution, "|");
          return d;
        });
        resolve(processedData);
      } catch (error) {
        // Catch errors from fetch, json parsing, or responseparser
        console.error("Error (sources):", error);
        reject({ error: error.message || 'Fetch/Parse failed' });
      }
    });
  };

  // Returns a Promise
  const monitor = function () {
    return new Promise(async (resolve, reject) => {
      const url = baseurl + "/api/v1/device/monitor/info";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || response.statusText}`);
        }
        resolve(responseparser(data, "data"));
      } catch (error) {
        console.error("Fetch error (monitor):", error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  const dynamicboost = function (input, hdr) {
    console.log("adjust dynamic boost", hdr);
  };

  const colorspace = function (input, hdr) {
    console.log("adjust colorspace", hdr);
  };

  // Returns a Promise to set HDR mode for a specific input source
  const setHdrMode = function (id, hdrMode) {
    return new Promise(async (resolve, reject) => {
      // Validate hdrMode
      const validModes = [0, 1, 2, 255];
      if (!validModes.includes(hdrMode)) {
        return reject({ error: `Invalid hdrMode: ${hdrMode}. Must be one of ${validModes.join(', ')}.` });
      }
      // Validate id (basic check)
      if (typeof id !== 'number' || !Number.isInteger(id) || id < 0) {
        return reject({ error: `Invalid input source ID: ${id}. Must be a non-negative integer.` });
      }

      const url = `${baseurl}/api/v1/device/input/${id}/hdrmode`;
      const payload = { hdrMode: hdrMode };
      console.log(`Setting HDR mode for input ${id} to ${hdrMode}`);

      try {
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
        resolve(responseparser(data));
      } catch (error) {
        console.error(`Fetch error (setHdrMode for input ${id}):`, error);
        reject({ error: error.message || 'Fetch failed' });
      }
    });
  };

  return {
    cabinet,
    sources,
    monitor,
    dynamicboost,
    colorspace,
    setHdrMode
  };
};

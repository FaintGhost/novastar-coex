# novastar-coex

A modern Javascript library for controlling NovaStar COEX video wall processors, specifically targeting the **current (v1.4+) API**.

**Note:** This is a fork of the original `novastar-coex` library. This version has been updated to support the changes introduced in COEX firmware v1.4.0 and **removes support for the legacy API (v1.0-v1.3)** to simplify maintenance and ensure compatibility with modern devices.

This library provides a promise-based interface for interacting with COEX devices like the MX40 Pro, MX2000 Pro, and CX40 Pro.

## Installation

```bash
npm i @novastar-dev/coex
```

## Usage

### Connecting to a Processor

```javascript
const Novastar = require('novastar-coex');

// Replace with your device's IP and API port (default is 8001)
const novastar = new Novastar('192.168.0.10', 8001);

// All methods return Promises, so use async/await or .then()/.catch()
async function getDeviceSources() {
  try {
    const sources = await novastar.sources();
    console.log('Available Sources:', sources);
  } catch (error) {
    console.error('Failed to get sources:', error);
  }
}

getDeviceSources();
```

## API Methods & Examples

All methods return Promises. Use `async/await` within an `async` function for cleaner code.

### Get Presets (`getPreset`)

Retrieves the list of presets stored on the device.

```javascript
async function listPresets() {
  try {
    const presets = await novastar.getPreset();
    console.log('Presets:', presets);
    // Example result item:
    // {
    //   sequenceNumber: 1,
    //   name: '预设方案1',
    //   state: true, // Indicates if this preset is currently active
    //   sourceData: true,
    //   processingData: false,
    //   outputData: false,
    //   screenData: true,
    //   effectSwitch: 1,
    //   presetUUID: '{dc80bb97-f528-42f5-a2c8-b004b7387890}'
    // }
  } catch (error) {
    console.error('Failed to get presets:', error);
  }
}
listPresets();
```

### Apply Preset (`applyPreset`)

Applies a preset by its name or sequence number. If `screenID` is omitted, it attempts to apply to the first available screen.

```javascript
// preset: string (name) or number (sequenceNumber)
// screenID: string (optional) - Target screen ID

async function applyMyPreset(presetIdentifier) {
  try {
    const result = await novastar.applyPreset(presetIdentifier);
    console.log(`Successfully applied preset '${presetIdentifier}':`, result);
  } catch (error) {
    console.error(`Failed to apply preset '${presetIdentifier}':`, error);
  }
}

// Apply by name
applyMyPreset('预设方案1');

// Apply by sequence number (assuming preset with sequenceNumber 2 exists)
// applyMyPreset(2);
```

### Get Display Parameters (`getDisplayParams`)

Retrieves detailed parameters for all connected screens (brightness, color temperature, gamma, etc.).

```javascript
async function checkDisplayParams() {
  try {
    const params = await novastar.getDisplayParams();
    console.log('Display Parameters:', params);
    // Example result item:
    // {
    //   screenId: '...',
    //   brightness: 0.8, // Value between 0.0 and 1.0
    //   colorTemperature: 6500,
    //   gamma: 2.2,
    //   hdrMode: 0,
    //   enable3DLut: false
    //   // ... other parameters
    // }
  } catch (error) {
    console.error('Failed to get display parameters:', error);
  }
}
checkDisplayParams();
```

### Set Color Temperature (`colortemperature`)

Sets the color temperature for specific screens or all screens.

```javascript
// value: number (1700-15000)
// screenids: string or array of strings (optional) - Defaults to all screens if omitted

async function setScreenColorTemp(temp, screenId = null) {
  try {
    const result = await novastar.colortemperature(temp, screenId);
    console.log(`Set color temperature to ${temp}K for ${screenId || 'all screens'}:`, result);
  } catch (error) {
    console.error(`Failed to set color temperature for ${screenId || 'all screens'}:`, error);
  }
}

// Set all screens to 6500K
setScreenColorTemp(6500);

// Set a specific screen (replace 'your_screen_id' with an actual ID)
// setScreenColorTemp(5000, 'your_screen_id');
```

### Set Gamma (`gamma`)

Sets the gamma value for specific screens or all screens.

```javascript
// value: number (1.0 - 4.0)
// screenids: string or array of strings (optional) - Defaults to all screens if omitted

async function setScreenGamma(gammaValue, screenId = null) {
  try {
    const result = await novastar.gamma(gammaValue, screenId);
    console.log(`Set gamma to ${gammaValue} for ${screenId || 'all screens'}:`, result);
  } catch (error) {
    console.error(`Failed to set gamma for ${screenId || 'all screens'}:`, error);
  }
}

// Set all screens to gamma 2.2
setScreenGamma(2.2);

// Set specific screens (replace with actual IDs)
// setScreenGamma(2.4, ['screen_id_1', 'screen_id_2']);
```

### Set Brightness (`brightness`)

Sets the overall brightness. The library internally fetches screen IDs and applies the brightness to all of them via the `screenbrightness` API call.

```javascript
// brightnessValue: number (0-100 or 0.0-1.0) - Library handles conversion if needed.

async function setGlobalBrightness(level) {
  try {
    const result = await novastar.brightness(level);
    console.log(`Set brightness to ${level}:`, result);
  } catch (error) {
    console.error(`Failed to set brightness:`, error);
  }
}

setGlobalBrightness(75); // Set brightness to 75%
```

### Set Display Mode (`displaymode`, `normal`, `blackout`, `freeze`)

Changes the output display mode.

```javascript
// mode: 0 (Normal), 1 (Blackout), 2 (Freeze)

async function setDisplayOutputMode(mode) {
  try {
    let result;
    let modeName;
    switch (mode) {
      case 0:
        result = await novastar.normal(); // Alias for displaymode(0)
        modeName = 'Normal';
        break;
      case 1:
        result = await novastar.blackout(); // Alias for displaymode(1)
        modeName = 'Blackout';
        break;
      case 2:
        result = await novastar.freeze(); // Alias for displaymode(2)
        modeName = 'Freeze';
        break;
      default:
        console.error('Invalid display mode:', mode);
        return;
    }
    // Alternatively, call directly: result = await novastar.displaymode(mode);
    console.log(`Set display mode to ${modeName}:`, result);
  } catch (error) {
    console.error(`Failed to set display mode to ${mode}:`, error);
  }
}

setDisplayOutputMode(1); // Set to Blackout
// setDisplayOutputMode(0); // Set to Normal
```

### Set Input Source (`input`)

Changes the active input source. **Note:** This might only work correctly when the processor is in "Send Only" mode (see Known Issues).

```javascript
// inputIdentifier: string (name, e.g., "HDMI 1") or number (groupId)

async function setInput(inputNameOrId) {
  try {
    const result = await novastar.input(inputNameOrId);
    console.log(`Set input to '${inputNameOrId}':`, result);
  } catch (error) {
    console.error(`Failed to set input to '${inputNameOrId}':`, error);
  }
}

setInput('HDMI 1'); // Set input using its name
// setInput(40); // Set input using its group ID (example)
```

### Get Sources (`sources`)

Retrieves a list of available input sources and their properties.

```javascript
async function listSources() {
  try {
    const sourceList = await novastar.sources();
    console.log('Available Input Sources:', sourceList);
  } catch (error) {
    console.error('Failed to get sources:', error);
  }
}
listSources();
```

### Enable/Disable 3D LUT (`enable3DLut`)

Enables or disables the 3D LUT processing for specific screens or all screens.

```javascript
// enable: boolean (true to enable, false to disable)
// screenids: string or array of strings (optional) - Defaults to all screens

async function set3DLutState(isEnabled, screenId = null) {
  try {
    const result = await novastar.enable3DLut(isEnabled, screenId);
    const state = isEnabled ? 'enabled' : 'disabled';
    console.log(`Set 3D LUT to ${state} for ${screenId || 'all screens'}:`, result);
  } catch (error) {
    console.error(`Failed to set 3D LUT state for ${screenId || 'all screens'}:`, error);
  }
}

// Enable 3D LUT for all screens
set3DLutState(true);

// Disable 3D LUT for a specific screen
// set3DLutState(false, 'your_screen_id');
```

## Error Handling

Methods return Promises that reject upon API errors or network issues. Always wrap calls in `try...catch` blocks when using `async/await`, or use `.catch()` with promise chains.

```javascript
async function safeApiCall() {
  try {
    const data = await novastar.someMethod();
    // Process data
  } catch (error) {
    console.error('API call failed:', error);
    // Handle specific errors, e.g., device locked
    if (error.error === 'device locked') {
      console.warn('Device might be locked by VMP software.');
    }
  }
}
```

## Known Issues

*   **VMP Lock:** If you are running the NovaStar VMP software simultaneously, the processor might be locked, preventing API commands from other devices/IPs. Workaround: Close VMP or run your script from the same computer running VMP.

## License

MIT License (Refer to the LICENSE file)


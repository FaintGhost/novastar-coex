# @novastar-dev/coex

A TypeScript library for controlling NovaStar COEX video wall processors via HTTP API, targeting **COEX firmware v1.5+**.

## Features

- **Full TypeScript support** with strict type checking
- **Promise-based API** with async/await
- **Comprehensive input validation** using type guards
- **142 tests** with 91%+ coverage
- **MSW 2.x** for API mocking in tests

## Installation

```bash
npm i @novastar-dev/coex
```

## Quick Start

```typescript
import { COEX } from "@novastar-dev/coex";

const device = new COEX("192.168.1.100", 8001);

async function main() {
  try {
    // Get available input sources
    const sources = await device.apiInstance.sources();
    console.log("Sources:", sources);

    // Set brightness
    await device.brightness(80);

    // Apply a preset
    await device.apiInstance.applyPreset("screen1", 1);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## API Overview

### High-Level Methods (on `COEX` class)

| Method | Description |
|--------|-------------|
| `blackout()` | Set display to blackout mode |
| `normal()` | Set display to normal mode |
| `freeze()` | Freeze the current frame |
| `brightness(value)` | Set screen brightness (0-100) |
| `input(name)` | Switch input source by name |
| `summary()` | Get cabinet count |

### Screen API

| Method | Description |
|--------|-------------|
| `screen()` | Get screen information |
| `getScreenProperties()` | Get screen properties |
| `getCabinetCount()` | Get cabinet count |
| `displaymode(value)` | Set display mode (0=normal, 1=blackout, 2=freeze) |
| `brightness(value, screenIds?)` | Set brightness |
| `colortemperature(value, screenIds?)` | Set color temperature (1000-12000K) |
| `gamma(value, screenIds?)` | Set gamma (1.0-4.0) |
| `getDisplayState()` | Get display state |
| `getDisplayParams()` | Get display parameters |
| `switchLayerSource(screenId, layers)` | Switch layer source |
| `setMapping(canvasId, mappingData)` | Set canvas mapping |
| `getScreenList()` | Get all screens |

### Preset API

| Method | Description |
|--------|-------------|
| `getPreset()` | Get all presets |
| `applyPreset(screenID, sequenceNumber)` | Apply a preset |
| `modifyPreset(screenID, options)` | Modify preset settings |

### Device API

| Method | Description |
|--------|-------------|
| `sources()` | Get available input sources |
| `monitor()` | Get real-time monitoring info |
| `cabinet()` | Get cabinet information |
| `setHdrMode(id, hdrMode)` | Set HDR mode |
| `setInternalSource(options)` | Set internal source |
| `setSendingCardTestPattern(mode, params?)` | Set test pattern |
| `setShadow(inputIdList, type, shadow)` | Adjust shadow |
| `setHighlight(inputIdList, type, value)` | Adjust highlight |
| `setSaturation(inputIdList, value)` | Set saturation |
| `setContrast(inputIdList, value)` | Set contrast |
| `setHue(inputIdList, value)` | Set hue |
| `setEdid(inputId, options)` | Configure EDID |
| `setOutputAudio(enable, source)` | Set output audio |
| `getAudioSettings()` | Get audio settings |
| `controllerIdentify(enable, color)` | Identify controller |
| `getDeviceBackupStatus()` | Get backup status |
| `exportLog()` | Export device logs |
| `setSystemTime(options)` | Set system time |
| `setTimeZone(timezone)` | Set timezone |
| `setControllerName(name)` | Set controller name |
| `getSnmpStatus()` | Get SNMP status |
| `setSnmpOnOff(state)` | Enable/disable SNMP |
| `deviceIdentify(enable)` | Identify device |

### Cabinet API

| Method | Description |
|--------|-------------|
| `setNoDataSignal(idList, sourceType, imageType)` | Set no-data signal behavior |
| `setThermalCompensationOnOff(idList, enable)` | Toggle thermal compensation |
| `setThermalCompensationIntensity(idList, amount)` | Set compensation intensity |
| `setCabinetRgbBrightness(idList, r, g, b)` | Set RGB brightness |
| `setCabinetBrightness(idList, ratio, nit?)` | Set brightness |
| `adjustCabinetColorTemperature(idList, value)` | Adjust color temperature |
| `setReceivingCardTestPattern(idList, mode)` | Set test pattern |
| `enableCabinetMapping(idList, enable)` | Enable/disable mapping |
| `moveCabinet(screenID, canvases)` | Move cabinet |

## Error Handling

All methods throw typed errors with descriptive messages:

```typescript
try {
  await device.brightness(150); // Invalid: 0-100 range
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message); // "brightness must be between 0 and 100"
  }
}
```

## TypeScript

The library exports all relevant types:

```typescript
import {
  COEX,
  createCoexApi,
  type Screen,
  type Cabinet,
  type Preset,
  type InputSource,
  type ApiResponse,
} from "@novastar-dev/coex";
```

## Testing

```bash
npm test        # Run tests
npm run test:coverage  # Run with coverage
```

## License

MIT

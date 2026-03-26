// api/device.ts - Device-related API methods
import ky from "ky";
import type {
  ApiResponse,
  InputSource,
  AudioSettings,
  DeviceBackupStatus,
  MonitorInfo,
  InternalSourceOptions,
  EdidOptions,
  SystemTimeOptions,
  RGBColor,
} from "../types.js";

export interface DeviceApi {
  cabinet: () => Promise<unknown[]>;
  sources: () => Promise<InputSource[]>;
  monitor: () => Promise<MonitorInfo>;
  setHdrMode: (id: number, hdrMode: number) => Promise<void>;
  // Input methods
  setInternalSource: (options: InternalSourceOptions) => Promise<void>;
  setSendingCardTestPattern: (
    mode: number,
    params?: {
      red?: number;
      green?: number;
      blue?: number;
      gray?: number;
      gridWidth?: number;
      moveSpeed?: number;
    },
  ) => Promise<void>;
  getInputData: () => Promise<unknown>;
  setShadow: (inputIdList: number[], type: number, shadow: number) => Promise<void>;
  setHighlight: (inputIdList: number[], type: number, highLight: number) => Promise<void>;
  resetColorAdjustment: (inputIdList: number[], type?: number) => Promise<void>;
  setSaturation: (inputIdList: number[], saturation: number) => Promise<void>;
  setContrast: (inputIdList: number[], contrast: number) => Promise<void>;
  setBlackLevel: (inputIdList: number[], blackLevel: number) => Promise<void>;
  setHue: (inputIdList: number[], hue: number) => Promise<void>;
  setEdid: (inputId: number, options: EdidOptions) => Promise<void>;
  // Device methods
  setOutputAudio: (enable: boolean, source: number) => Promise<void>;
  getAudioSettings: () => Promise<AudioSettings>;
  controllerIdentify: (enable: boolean, color: RGBColor) => Promise<void>;
  getDeviceBackupStatus: () => Promise<DeviceBackupStatus>;
  primaryBackupVerify: (screenID: string, verifyType: number) => Promise<void>;
  exportLog: () => Promise<unknown>;
  setSystemTime: (options: SystemTimeOptions) => Promise<void>;
  setAutoTimeOnOff: (enable: boolean, timeSource: number) => Promise<void>;
  setTimeZone: (timezone: string) => Promise<void>;
  setControllerName: (customName: string) => Promise<void>;
  getSnmpStatus: () => Promise<{ state: boolean }>;
  setSnmpOnOff: (state: boolean) => Promise<void>;
  getMultifunctionCardInfo: () => Promise<unknown>;
  deviceIdentify: (enable: boolean) => Promise<void>;
}

export function createDeviceApi(
  instance: { baseurl: string },
  responseparser: (data: ApiResponse, path?: string) => Promise<unknown>,
): DeviceApi {
  const baseurl = instance.baseurl;

  // Get list of attached cabinets
  const cabinet = async (): Promise<unknown[]> => {
    const url = `${baseurl}/api/v1/device/cabinet`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data") as Promise<unknown[]>;
  };

  // Get input sources
  const sources = async (): Promise<InputSource[]> => {
    const url = `${baseurl}/api/v1/device/input/sources`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    const parsedData = (await responseparser(data, "data")) as InputSource[];
    return parsedData;
  };

  // Monitor info
  const monitor = async (): Promise<MonitorInfo> => {
    const url = `${baseurl}/api/v1/device/monitor/info`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data") as Promise<MonitorInfo>;
  };

  // Set HDR mode
  const setHdrMode = async (id: number, hdrMode: number): Promise<void> => {
    const validModes = [0, 1, 2, 255];
    if (!validModes.includes(hdrMode)) {
      throw new Error(`Invalid hdrMode: ${hdrMode}. Must be one of ${validModes.join(", ")}.`);
    }
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error(`Invalid input source ID: ${id}. Must be a non-negative integer.`);
    }

    const url = `${baseurl}/api/v1/device/input/${id}/hdrmode`;
    const payload = { hdrMode };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Internal Source Information
  const setInternalSource = async (options: InternalSourceOptions): Promise<void> => {
    const { width, height, refreshrate, bitdepth, isEdidCustom } = options;

    if (typeof width !== "number" || width <= 0) {
      throw new Error("Invalid width: must be a positive number");
    }
    if (typeof height !== "number" || height <= 0) {
      throw new Error("Invalid height: must be a positive number");
    }
    if (typeof refreshrate !== "number" || refreshrate <= 0) {
      throw new Error("Invalid refreshrate: must be a positive number");
    }
    const validBitdepths = [0, 1, 2];
    if (!validBitdepths.includes(bitdepth)) {
      throw new Error(`Invalid bitdepth: ${bitdepth}. Must be one of 0, 1, 2 (8bit, 10bit, 12bit)`);
    }

    const url = `${baseurl}/api/v1/device/input/internalsource`;
    const payload = {
      width,
      height,
      refreshrate,
      bitdepth,
      isEdidCustom: Boolean(isEdidCustom),
    };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Sending Card Test Pattern
  const setSendingCardTestPattern = async (
    mode: number,
    params?: {
      red?: number;
      green?: number;
      blue?: number;
      gray?: number;
      gridWidth?: number;
      moveSpeed?: number;
    },
  ): Promise<void> => {
    const url = `${baseurl}/api/v1/device/input/pattern/test`;
    const payload = {
      mode,
      parameters: params || {},
    };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Get Input Data
  const getInputData = async (): Promise<unknown> => {
    const url = `${baseurl}/api/v1/device/input`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data");
  };

  // Set Shadow (dark area adjustment)
  const setShadow = async (
    inputIdList: number[],
    type: number,
    shadow: number,
  ): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    const validTypes = [0, 1, 2, 3];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Must be one of ${validTypes.join(", ")}...`);
    }
    if (typeof shadow !== "number" || shadow < 0 || shadow > 200) {
      throw new Error("Invalid shadow: must be a number between 0 and 200");
    }

    const url = `${baseurl}/api/v1/device/input/shadow`;
    const payload = { inputIdList, type, shadow };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Highlight (bright area adjustment)
  const setHighlight = async (
    inputIdList: number[],
    type: number,
    highLight: number,
  ): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    const validTypes = [0, 1, 2, 3];
    if (!validTypes.includes(type)) {
      throw new Error(
        `Invalid type: ${type}. Must be one of ${validTypes.join(", ")} (0=red, 1=green, 2=blue, 3=contrast)`,
      );
    }
    if (typeof highLight !== "number" || highLight < 0 || highLight > 200) {
      throw new Error("Invalid highLight: must be a number between 0 and 200");
    }

    const url = `${baseurl}/api/v1/device/input/highlight`;
    const payload = { inputIdList, type, highLight };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Reset Color Adjustment
  const resetColorAdjustment = async (inputIdList: number[], type: number = 0): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }

    const url = `${baseurl}/api/v1/device/input/reset`;
    const payload = { inputIdList, type };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Saturation
  const setSaturation = async (inputIdList: number[], saturation: number): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    if (typeof saturation !== "number" || saturation < 0 || saturation > 200) {
      throw new Error("Invalid saturation: must be a number between 0 and 200");
    }

    const url = `${baseurl}/api/v1/device/input/saturation`;
    const payload = { inputIdList, saturation };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Contrast
  const setContrast = async (inputIdList: number[], contrast: number): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    if (typeof contrast !== "number" || contrast < 0 || contrast > 200) {
      throw new Error("Invalid contrast value: must be a number between 0 and 200");
    }

    const url = `${baseurl}/api/v1/device/input/contrast`;
    const payload = { inputIdList, type: 3, highLight: contrast };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Black Level
  const setBlackLevel = async (inputIdList: number[], blackLevel: number): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    if (typeof blackLevel !== "number" || blackLevel < 0 || blackLevel > 200) {
      throw new Error("Invalid shadow (black level): must be a number between 0 and 200");
    }

    const url = `${baseurl}/api/v1/device/input/shadow`;
    const payload = { inputIdList, type: 3, shadow: blackLevel };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Hue
  const setHue = async (inputIdList: number[], hue: number): Promise<void> => {
    if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
      throw new Error("inputIdList must be a non-empty array");
    }
    if (typeof hue !== "number" || hue < -180 || hue > 180) {
      throw new Error("Invalid hue: must be a number between -180 and 180");
    }

    const url = `${baseurl}/api/v1/device/input/hue`;
    const payload = { inputIdList, hue };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set EDID
  const setEdid = async (inputId: number, options: EdidOptions): Promise<void> => {
    if (typeof inputId !== "number" || !Number.isInteger(inputId) || inputId < 0) {
      throw new Error("Invalid input source ID: must be a non-negative integer");
    }
    const { resolution, refreshRate, isCustom } = options;

    const url = `${baseurl}/api/v1/device/input/${inputId}/edid`;
    const payload = {
      para: {
        resolution,
        refreshRate,
        isCustom: Boolean(isCustom),
      },
    };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Output Audio
  const setOutputAudio = async (enable: boolean, source: number): Promise<void> => {
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }

    const url = `${baseurl}/api/v1/device/audio`;
    const payload = { enable, source };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Get Audio Settings
  const getAudioSettings = async (): Promise<AudioSettings> => {
    const url = `${baseurl}/api/v1/device/audio`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data") as Promise<AudioSettings>;
  };

  // Controller Identify (color beacon)
  const controllerIdentify = async (enable: boolean, color: RGBColor): Promise<void> => {
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }
    const { r, g, b } = color;
    if (
      typeof r !== "number" ||
      r < 0 ||
      r > 255 ||
      typeof g !== "number" ||
      g < 0 ||
      g > 255 ||
      typeof b !== "number" ||
      b < 0 ||
      b > 255
    ) {
      throw new Error("Invalid color values: r, g, b must be between 0 and 255");
    }

    const url = `${baseurl}/api/v1/device/hw/colorBeacon`;
    const payload = { enable, color: { r, g, b } };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Get Device Backup Status
  const getDeviceBackupStatus = async (): Promise<DeviceBackupStatus> => {
    const url = `${baseurl}/api/v1/device/backup`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data") as Promise<DeviceBackupStatus>;
  };

  // Primary/Backup Verify
  const primaryBackupVerify = async (screenID: string, verifyType: number): Promise<void> => {
    if (!verifyType) {
      throw new Error("verifyType is required");
    }

    const url = `${baseurl}/api/v1/device/backup/verify`;
    const payload = { screenID, verifyType };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Export Log
  const exportLog = async (): Promise<unknown> => {
    const url = `${baseurl}/api/v1/device/hw/log`;
    const response = await ky.get(url);
    return response.json();
  };

  // Set System Time
  const setSystemTime = async (options: SystemTimeOptions): Promise<void> => {
    const { year, month, day, hour, minute, second, isUTC } = options;

    if (typeof year !== "number" || year < 1970 || year > 2069) {
      throw new Error("Invalid year: must be between 1970 and 2069");
    }

    const url = `${baseurl}/api/v1/device/hw/systemtime`;
    const payload = { year, month, day, hour, minute, second, isUTC: Boolean(isUTC) };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Auto Time On/Off
  const setAutoTimeOnOff = async (enable: boolean, timeSource: number): Promise<void> => {
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }
    if (timeSource !== 0 && timeSource !== 1) {
      throw new Error(`Invalid timeSource: ${timeSource}. Must be 0=PC, 1=NTP server`);
    }

    const url = `${baseurl}/api/v1/device/time/enable`;
    const payload = { enable, timeSource };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Time Zone
  const setTimeZone = async (timezone: string): Promise<void> => {
    const url = `${baseurl}/api/v1/device/timezone`;
    const payload = { timezone };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Controller Name
  const setControllerName = async (customName: string): Promise<void> => {
    if (typeof customName !== "string" || customName.length > 255) {
      throw new Error("Invalid customName: must be 255 characters or less");
    }

    const url = `${baseurl}/api/v1/device/hw/customname`;
    const payload = { customName };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Get SNMP Status
  const getSnmpStatus = async (): Promise<{ state: boolean }> => {
    const url = `${baseurl}/api/v1/device/snmpstate`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data") as Promise<{ state: boolean }>;
  };

  // Set SNMP On/Off
  const setSnmpOnOff = async (state: boolean): Promise<void> => {
    const url = `${baseurl}/api/v1/device/snmpstate`;
    const payload = { state };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Get Multifunction Card Info
  const getMultifunctionCardInfo = async (): Promise<unknown> => {
    const url = `${baseurl}/api/v1/device/multifunc-card/detailinfo`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data");
  };

  // Device Identify
  const deviceIdentify = async (enable: boolean): Promise<void> => {
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }

    const url = `${baseurl}/api/v1/device/hw/mapping`;
    const payload = { enable };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  return {
    cabinet,
    sources,
    monitor,
    setHdrMode,
    setInternalSource,
    setSendingCardTestPattern,
    getInputData,
    setShadow,
    setHighlight,
    resetColorAdjustment,
    setSaturation,
    setContrast,
    setBlackLevel,
    setHue,
    setEdid,
    setOutputAudio,
    getAudioSettings,
    controllerIdentify,
    getDeviceBackupStatus,
    primaryBackupVerify,
    exportLog,
    setSystemTime,
    setAutoTimeOnOff,
    setTimeZone,
    setControllerName,
    getSnmpStatus,
    setSnmpOnOff,
    getMultifunctionCardInfo,
    deviceIdentify,
  };
}

// Type definitions for NovaStar COEX API

export interface Screen {
  screenID: string;
  screenName: string;
  workingMode: number;
  lowLatency: boolean;
  canvases?: Canvas[];
  layersInWorkingMode?: Layer[];
}

export interface Canvas {
  canvasID: number;
  width: number;
  height: number;
}

export interface Layer {
  id: number;
  source: number;
}

export interface Cabinet {
  id: number;
  resolution: { width: number; height: number };
  size: { width: number; height: number };
  brightness: number;
  colorTemperature: number;
  gamma: number;
}

export interface Preset {
  sequenceNumber: number;
  name: string;
  state: boolean;
  sourceData: boolean;
  processingData: boolean;
  outputData: boolean;
  screenData: boolean;
  effectSwitch: number;
}

export interface InputSource {
  id: number;
  type: number;
  name: string;
  actualResolution?: { width: number; height: number };
  colorSpace?: string;
  sourceStatus?: number;
  isSupportHDR?: boolean;
}

export interface AudioSettings {
  enable: boolean;
  source: number;
}

export interface DeviceBackupStatus {
  master: string;
  backup: string;
}

export interface MonitorInfo {
  name: string;
  runtime: number;
  fanInfos: FanInfo[];
  voltageInfos: VoltageInfo[];
  temperatureInfos: TemperatureInfo[];
  cabinets: Cabinet[];
  backupStatus: number;
}

export interface FanInfo {
  id: number;
  speed: number;
}

export interface VoltageInfo {
  id: number;
  voltage: number;
}

export interface TemperatureInfo {
  id: number;
  temperature: number;
}

// API Response types
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface ApiError {
  error: string;
  note?: string;
}

// Color types
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// Screen output types
export interface ScreenOutputData {
  screenId: string;
  brightness: number;
  colorTemperature: number;
  gamma: number;
}

// EDID types
export interface EdidOptions {
  resolution: { width: number; height: number };
  refreshRate: number;
  isCustom: boolean;
}

// Internal source types
export interface InternalSourceOptions {
  width: number;
  height: number;
  refreshrate: number;
  bitdepth: number;
  isEdidCustom: boolean;
}

// System time types
export interface SystemTimeOptions {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isUTC: boolean;
}

// Preset options
export interface PresetOptions {
  sequenceNumber: number;
  name: string;
  sourceData: boolean;
  processingData: boolean;
  outputData: boolean;
  screenData: boolean;
  effectSwitch: number;
}

// Layer source switch
export interface LayerSource {
  id: number;
  source: number;
}

// Color correction types
export interface WhiteBlackColorParam {
  type: number;
  rgbcoef: RGBColor;
}

export interface OneColorParam {
  type: number;
  hsv: { hue: number; sat: number; value: number };
}

// Cabinet types
export interface CabinetPosition {
  x: number;
  y: number;
}

export interface CabinetSize {
  width: number;
  height: number;
}

export interface CabinetConfig {
  cabinetID: number;
  connectID: number;
  outputID: number;
  position: CabinetPosition;
  size: CabinetSize;
  angle: number;
}

export interface CanvasConfig {
  canvasID: number;
  cabinets: CabinetConfig[];
}

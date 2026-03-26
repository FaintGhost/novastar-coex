import ky from "ky";
import type { ApiResponse, RGBColor, LayerSource, CanvasConfig } from "../types.js";

export interface ScreenApi {
  // Screen info and properties
  screen: () => Promise<unknown>;
  getScreenProperties: () => Promise<unknown>;
  getCabinetCount: () => Promise<unknown>;

  // Display modes
  displaymode: (value: number, canvasIDs?: number[]) => Promise<void>;
  getDisplayState: () => Promise<unknown>;
  getDisplayParams: () => Promise<unknown>;

  // Brightness
  brightness: (brightness: number, screenIds?: string[]) => Promise<void>;
  screenbrightness: (brightness: number, screenIds: string[]) => Promise<void>;

  // Color temperature
  colortemperature: (colorTemp: number, screenIds?: string[]) => Promise<void>;

  // Gamma
  gamma: (gamma: number, screenIds?: string[]) => Promise<void>;
  setCustomGamma: (screenId: string, gammaTable: number[]) => Promise<void>;

  // Image/Output
  setCustomGamut: (screenIdList: string[], gamutData: RGBColor) => Promise<void>;
  switchColorGamut: (screenIdList: string[], gamutType: number) => Promise<void>;
  setBrightnessLimitOnOff: (state: boolean, screenIdList: string[]) => Promise<void>;
  setBrightnessLimitValue: (
    screenIdList: string[],
    type: 2 | 3,
    nit?: number,
    ratio?: number,
  ) => Promise<void>;

  // 3D LUT
  enable3DLut: (enable: boolean, screenIdList: string[]) => Promise<void>;
  set3DLutStrength: (screenIdList: string[], strength: number) => Promise<void>;
  import3DLutFile: (screenIdList: string[], file: Blob, fileName: string) => Promise<void>;
  delete3DLutFile: (screenIdList: string[], fileName: string) => Promise<void>;

  // Color Correction
  setColorCorrectionOnOff: (enable: boolean, screenIdList: string[]) => Promise<void>;
  setColorCorrectionBlackWhite: (data: RGBColor[]) => Promise<void>;
  setColorCorrectionOtherColors: (data: Array<{ hue: number; sat: number; value: number }>) => Promise<void>;

  // Schedule
  getAllScheduleInfo: () => Promise<unknown>;
  setScheduleOnOff: (screenId: string, enable: boolean) => Promise<void>;
  deleteBrightnessStrategy: (screenId: string) => Promise<void>;

  // Layer
  switchLayerSource: (screenId: string, layers: LayerSource[]) => Promise<void>;

  // Output
  getScreenOutputData: () => Promise<unknown>;
  setMultimodeByScreens: (screenIdList: string[], modeId: number) => Promise<void>;
  setOutputBitDepth: (screenIdList: string[], bitDepth: 0 | 1 | 2 | 255) => Promise<void>;
  outputSyncSourceSwitching: (enable: boolean, sourceType?: number) => Promise<void>;
  enable3DEmitter: (enable: boolean, screenIdList: string[]) => Promise<void>;
  enable3D: (enable: boolean, screenIdList: string[]) => Promise<void>;
  setMapping: (canvasId: number, mappingData: CanvasConfig) => Promise<void>;
  getScreenList: () => Promise<unknown>;
}

export function createScreenApi(
  instance: { baseurl: string },
  responseparser: (data: any, path?: string) => Promise<any>,
): ScreenApi {
  const { baseurl } = instance;

  return {
    // Screen info and properties
    screen: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen`).json();
      return responseparser(data);
    },

    getScreenProperties: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/base/info`).json();
      return responseparser(data);
    },

    getCabinetCount: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/cabinet/count`).json();
      return responseparser(data);
    },

    // Display modes
    displaymode: async (value: number, canvasIDs?: number[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/displaymode`, {
          json: { value, canvasIDs },
        })
        .json();
      await responseparser(data);
    },

    getDisplayState: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/output/display/state`).json();
      return responseparser(data);
    },

    getDisplayParams: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/displayparams`).json();
      return responseparser(data);
    },

    // Brightness
    brightness: async (brightness: number, screenIds?: string[]) => {
      if (typeof brightness !== "number" || brightness < 0 || brightness > 100) {
        throw new Error("brightness must be between 0 and 100");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/brightness`, {
          json: { brightness, screenIds },
        })
        .json();
      await responseparser(data);
    },

    screenbrightness: async (brightness: number, screenIds: string[]) => {
      if (!Array.isArray(screenIds) || screenIds.length === 0) {
        throw new Error("screenIds must be a non-empty array");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/brightness`, {
          json: { brightness, screenIds },
        })
        .json();
      await responseparser(data);
    },

    // Color temperature
    colortemperature: async (colorTemp: number, screenIds?: string[]) => {
      if (typeof colorTemp !== "number" || colorTemp < 1000 || colorTemp > 12000) {
        throw new Error("colorTemp must be between 1000 and 12000");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/colortemperature`, {
          json: { colorTemp, screenIds },
        })
        .json();
      await responseparser(data);
    },

    // Gamma
    gamma: async (gamma: number, screenIds?: string[]) => {
      if (typeof gamma !== "number" || gamma < 1.0 || gamma > 4.0) {
        throw new Error("gamma must be between 1.0 and 4.0");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/gamma`, {
          json: { gamma, screenIds },
        })
        .json();
      await responseparser(data);
    },

    setCustomGamma: async (screenId: string, gammaTable: number[]) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/gamma/update`, {
          json: { screenId, gammaTable },
        })
        .json();
      await responseparser(data);
    },

    // Image/Output
    setCustomGamut: async (screenIdList: string[], gamutData: RGBColor) => {
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      if (!gamutData || typeof gamutData !== "object") {
        throw new Error("gamutData must be an RGBColor object");
      }
      if (typeof gamutData.r !== "number" || typeof gamutData.g !== "number" || typeof gamutData.b !== "number") {
        throw new Error("gamutData must have r, g, b number properties");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/customgamut`, {
          json: { screenIdList, gamutData },
        })
        .json();
      await responseparser(data);
    },

    switchColorGamut: async (screenIdList: string[], gamutType: number) => {
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      if (typeof gamutType !== "number" || gamutType < 0) {
        throw new Error("gamutType must be a non-negative number");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/gamut`, {
          json: { screenIdList, gamutType },
        })
        .json();
      await responseparser(data);
    },

    setBrightnessLimitOnOff: async (state: boolean, screenIdList: string[]) => {
      if (typeof state !== "boolean") {
        throw new Error("state must be a boolean");
      }
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      const data = await ky
        .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
          json: { state, screenIdList },
        })
        .json();
      await responseparser(data);
    },

    setBrightnessLimitValue: async (
      screenIdList: string[],
      type: 2 | 3,
      nit?: number,
      ratio?: number,
    ) => {
      if (type !== 2 && type !== 3) {
        throw new Error("type must be 2 or 3");
      }
      const data = await ky
        .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
          json: { screenIdList, type, nit, ratio },
        })
        .json();
      await responseparser(data);
    },

    // 3D LUT
    enable3DLut: async (enable: boolean, screenIdList: string[]) => {
      if (typeof enable !== "boolean") {
        throw new Error("enable must be a boolean");
      }
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/threedlut/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      await responseparser(data);
    },

    set3DLutStrength: async (screenIdList: string[], strength: number) => {
      if (typeof strength !== "number" || strength < 0 || strength > 100) {
        throw new Error("strength must be between 0 and 100");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/threedlut/strength`, {
          json: { screenIdList, strength },
        })
        .json();
      await responseparser(data);
    },

    import3DLutFile: async (screenIdList: string[], file: Blob, fileName: string) => {
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      if (!(file instanceof Blob)) {
        throw new Error("file must be a Blob");
      }
      if (typeof fileName !== "string" || fileName.length === 0) {
        throw new Error("fileName must be a non-empty string");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/threedlut/file`, {
          body: (() => {
            const formData = new FormData();
            formData.append("file", file, fileName);
            formData.append("screenIdList", JSON.stringify(screenIdList));
            return formData;
          })(),
        })
        .json();
      await responseparser(data);
    },

    delete3DLutFile: async (screenIdList: string[], fileName: string) => {
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      if (typeof fileName !== "string" || fileName.length === 0) {
        throw new Error("fileName must be a non-empty string");
      }
      const data = await ky
        .delete(`${baseurl}/api/v1/screen/processing/threedlut/file`, {
          json: { screenIdList, fileName },
        })
        .json();
      await responseparser(data);
    },

    // Color Correction
    setColorCorrectionOnOff: async (enable: boolean, screenIdList: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/colorcorrect/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      await responseparser(data);
    },

    setColorCorrectionBlackWhite: async (data: unknown[]) => {
      if (!Array.isArray(data)) {
        throw new Error("data must be an array");
      }
      const response = await ky
        .put(`${baseurl}/api/v1/screen/processing/colorcorrect/whiteblack`, {
          json: { data },
        })
        .json();
      await responseparser(response);
    },

    setColorCorrectionOtherColors: async (data: unknown[][]) => {
      if (!Array.isArray(data)) {
        throw new Error("data must be an array");
      }
      const response = await ky
        .put(`${baseurl}/api/v1/screen/processing/colorcorrect/data`, {
          json: { data },
        })
        .json();
      await responseparser(response);
    },

    // Schedule
    getAllScheduleInfo: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/schedule/all`).json();
      return responseparser(data);
    },

    setScheduleOnOff: async (screenId: string, enable: boolean) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/schedule/enable/update`, {
          json: { screenId, enable },
        })
        .json();
      await responseparser(data);
    },

    deleteBrightnessStrategy: async (screenId: string) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/schedule/brightness-strategy/delete`, {
          json: { screenId },
        })
        .json();
      await responseparser(data);
    },

    // Layer
    switchLayerSource: async (screenId: string, layers: { id: number; source: number }[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/layer/input`, {
          json: { screenId, layers },
        })
        .json();
      await responseparser(data);
    },

    // Output
    getScreenOutputData: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen/output`).json();
      return responseparser(data);
    },

    setMultimodeByScreens: async (screenIdList: string[], modeId: number) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/multimode`, {
          json: { screenIdList, modeId },
        })
        .json();
      await responseparser(data);
    },

    setOutputBitDepth: async (screenIdList: string[], bitDepth: 0 | 1 | 2 | 255) => {
      const validBitDepths = [0, 1, 2, 255];
      if (!validBitDepths.includes(bitDepth)) {
        throw new Error(`bitDepth must be one of: ${validBitDepths.join(", ")}`);
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/bitdepth`, {
          json: { screenIdList, bitDepth },
        })
        .json();
      await responseparser(data);
    },

    outputSyncSourceSwitching: async (enable: boolean, sourceType?: number) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/sync/source`, {
          json: { enable, sourceType },
        })
        .json();
      await responseparser(data);
    },

    enable3DEmitter: async (enable: boolean, screenIdList: string[]) => {
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/threed/emitter`, {
          json: { enable, screenIdList },
        })
        .json();
      await responseparser(data);
    },

    enable3D: async (enable: boolean, screenIdList: string[]) => {
      if (typeof enable !== "boolean") {
        throw new Error("enable must be a boolean");
      }
      if (!Array.isArray(screenIdList) || screenIdList.length === 0) {
        throw new Error("screenIdList must be a non-empty array");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/threed/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      await responseparser(data);
    },

    setMapping: async (canvasId: number, mappingData: CanvasConfig) => {
      if (typeof canvasId !== "number" || canvasId < 0) {
        throw new Error("canvasId must be a non-negative number");
      }
      if (!mappingData || typeof mappingData !== "object") {
        throw new Error("mappingData must be a CanvasConfig object");
      }
      if (!Array.isArray(mappingData.cabinets)) {
        throw new Error("mappingData.cabinets must be an array");
      }
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/canvas/mapping`, {
          json: { canvasId, mappingData },
        })
        .json();
      await responseparser(data);
    },

    getScreenList: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen`).json();
      return responseparser(data);
    },
  };
}

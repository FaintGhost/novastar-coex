import ky from "ky";

export interface ScreenApi {
  // Screen info and properties
  screen: () => Promise<any>;
  getScreenProperties: () => Promise<any>;
  getCabinetCount: () => Promise<any>;

  // Display modes
  displaymode: (value: number, canvasIDs?: number[]) => Promise<void>;
  getDisplayState: () => Promise<any>;
  getDisplayParams: () => Promise<any>;

  // Brightness
  brightness: (brightness: number, screenIds?: string[]) => Promise<void>;
  screenbrightness: (brightness: number, screenIds: string[]) => Promise<void>;

  // Color temperature
  colortemperature: (colorTemp: number, screenIds?: string[]) => Promise<void>;

  // Gamma
  gamma: (gamma: number, screenIds?: string[]) => Promise<void>;
  setCustomGamma: (screenId: string, gammaTable: number[]) => Promise<void>;

  // Image/Output
  setCustomGamut: (screenIdList: string[], gamutData: any) => Promise<void>;
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
  setColorCorrectionBlackWhite: (data: any[]) => Promise<void>;
  setColorCorrectionOtherColors: (data: any[][]) => Promise<void>;

  // Schedule
  getAllScheduleInfo: () => Promise<any>;
  setScheduleOnOff: (screenId: string, enable: boolean) => Promise<void>;
  deleteBrightnessStrategy: (screenId: string) => Promise<void>;

  // Layer
  switchLayerSource: (screenId: string, layers: { id: number; source: number }[]) => Promise<void>;

  // Output
  getScreenOutputData: () => Promise<any>;
  setMultimodeByScreens: (screenIdList: string[], modeId: number) => Promise<void>;
  setOutputBitDepth: (screenIdList: string[], bitDepth: 0 | 1 | 2 | 255) => Promise<void>;
  outputSyncSourceSwitching: (enable: boolean, sourceType?: number) => Promise<void>;
  enable3DEmitter: (enable: boolean, screenIdList: string[]) => Promise<void>;
  enable3D: (enable: boolean, screenIdList: string[]) => Promise<void>;
  setMapping: (canvasId: number, mappingData: any) => Promise<void>;
  getScreenList: () => Promise<any>;
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
      return responseparser(data);
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
      const data = await ky
        .put(`${baseurl}/api/v1/screen/brightness`, {
          json: { brightness, screenIds },
        })
        .json();
      return responseparser(data);
    },

    screenbrightness: async (brightness: number, screenIds: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/brightness`, {
          json: { brightness, screenIds },
        })
        .json();
      return responseparser(data);
    },

    // Color temperature
    colortemperature: async (colorTemp: number, screenIds?: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/colortemperature`, {
          json: { colorTemp, screenIds },
        })
        .json();
      return responseparser(data);
    },

    // Gamma
    gamma: async (gamma: number, screenIds?: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/gamma`, {
          json: { gamma, screenIds },
        })
        .json();
      return responseparser(data);
    },

    setCustomGamma: async (screenId: string, gammaTable: number[]) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/gamma/update`, {
          json: { screenId, gammaTable },
        })
        .json();
      return responseparser(data);
    },

    // Image/Output
    setCustomGamut: async (screenIdList: string[], gamutData: any) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/customgamut`, {
          json: { screenIdList, gamutData },
        })
        .json();
      return responseparser(data);
    },

    switchColorGamut: async (screenIdList: string[], gamutType: number) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/gamut`, {
          json: { screenIdList, gamutType },
        })
        .json();
      return responseparser(data);
    },

    setBrightnessLimitOnOff: async (state: boolean, screenIdList: string[]) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
          json: { state, screenIdList },
        })
        .json();
      return responseparser(data);
    },

    setBrightnessLimitValue: async (
      screenIdList: string[],
      type: 2 | 3,
      nit?: number,
      ratio?: number,
    ) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
          json: { screenIdList, type, nit, ratio },
        })
        .json();
      return responseparser(data);
    },

    // 3D LUT
    enable3DLut: async (enable: boolean, screenIdList: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/threedlut/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      return responseparser(data);
    },

    set3DLutStrength: async (screenIdList: string[], strength: number) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/processing/threedlut/strength`, {
          json: { screenIdList, strength },
        })
        .json();
      return responseparser(data);
    },

    import3DLutFile: async (screenIdList: string[], file: Blob, fileName: string) => {
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
      return responseparser(data);
    },

    delete3DLutFile: async (screenIdList: string[], fileName: string) => {
      const data = await ky
        .delete(`${baseurl}/api/v1/screen/processing/threedlut/file`, {
          json: { screenIdList, fileName },
        })
        .json();
      return responseparser(data);
    },

    // Color Correction
    setColorCorrectionOnOff: async (enable: boolean, screenIdList: string[]) => {
      const data = await ky
        .put(`${baseurl}/screen/processing/colorcorrect/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      return responseparser(data);
    },

    setColorCorrectionBlackWhite: async (data: any[]) => {
      const response = await ky
        .put(`${baseurl}/screen/processing/colorcorrect/whiteblack`, {
          json: { data },
        })
        .json();
      return responseparser(response);
    },

    setColorCorrectionOtherColors: async (data: any[][]) => {
      const response = await ky
        .put(`${baseurl}/screen/processing/colorcorrect/data`, {
          json: { data },
        })
        .json();
      return responseparser(response);
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
      return responseparser(data);
    },

    deleteBrightnessStrategy: async (screenId: string) => {
      const data = await ky
        .post(`${baseurl}/api/v1/screen/schedule/brightness-strategy/delete`, {
          json: { screenId },
        })
        .json();
      return responseparser(data);
    },

    // Layer
    switchLayerSource: async (screenId: string, layers: { id: number; source: number }[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/layer/input`, {
          json: { screenId, layers },
        })
        .json();
      return responseparser(data);
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
      return responseparser(data);
    },

    setOutputBitDepth: async (screenIdList: string[], bitDepth: 0 | 1 | 2 | 255) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/bitdepth`, {
          json: { screenIdList, bitDepth },
        })
        .json();
      return responseparser(data);
    },

    outputSyncSourceSwitching: async (enable: boolean, sourceType?: number) => {
      const data = await ky
        .put(`${baseurl}/screen/output/sync/source`, {
          json: { enable, sourceType },
        })
        .json();
      return responseparser(data);
    },

    enable3DEmitter: async (enable: boolean, screenIdList: string[]) => {
      const data = await ky
        .put(`${baseurl}/screen/output/threed/emitter`, {
          json: { enable, screenIdList },
        })
        .json();
      return responseparser(data);
    },

    enable3D: async (enable: boolean, screenIdList: string[]) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/threed/enable`, {
          json: { enable, screenIdList },
        })
        .json();
      return responseparser(data);
    },

    setMapping: async (canvasId: number, mappingData: any) => {
      const data = await ky
        .put(`${baseurl}/api/v1/screen/output/canvas/mapping`, {
          json: { canvasId, mappingData },
        })
        .json();
      return responseparser(data);
    },

    getScreenList: async () => {
      const data = await ky.get(`${baseurl}/api/v1/screen`).json();
      return responseparser(data);
    },
  };
}

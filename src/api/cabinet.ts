// Cabinet API methods for NovaStar COEX
import ky from "ky";
import type { ApiResponse, CanvasConfig } from "../types.js";

export interface CabinetApi {
  setNoDataSignal: (
    idList: number[],
    sourceType: number,
    prestoreImageType: number,
  ) => Promise<void>;
  setThermalCompensationOnOff: (idList: number[], enable: boolean) => Promise<void>;
  setThermalCompensationIntensity: (idList: number[], amount: number) => Promise<void>;
  setThermalCompensationMode: (idList: number[], mode: number) => Promise<void>;
  setCabinetRgbBrightness: (idList: number[], r: number, g: number, b: number) => Promise<void>;
  setCabinetBrightness: (idList: number[], ratio: number, nit?: number) => Promise<void>;
  adjustCabinetColorTemperature: (idList: number[], value: number) => Promise<void>;
  setReceivingCardTestPattern: (
    idList: number[],
    testmode: number,
  ) => Promise<void>;
  enableCabinetMapping: (idList: number[], enable: boolean) => Promise<void>;
  setMultimodeByCabinets: (idList: number[], modeId: number) => Promise<void>;
  moveCabinet: (screenID: string, canvases: CanvasConfig[]) => Promise<void>;
  setCabinetRgbwBrightness: (
    idList: number[],
    changeType: 1 | 2 | 3 | 4,
    value: number,
  ) => Promise<void>;
}

export function createCabinetApi(
  instance: { baseurl: string },
  responseparser: (data: ApiResponse, path?: string) => Promise<unknown>,
): CabinetApi {
  const { baseurl } = instance;

  // Set No Data Signal (prestore image when no data)
  const setNoDataSignal = async (
    idList: number[],
    sourceType: number,
    prestoreImageType: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof sourceType !== "number") {
      throw new Error("sourceType must be a number (1 = follow output)");
    }
    if (prestoreImageType !== 0 && prestoreImageType !== 1) {
      throw new Error("prestoreImageType must be 0 (black) or 1 (last frame)");
    }

    const url = `${baseurl}/device/cabinet/prestoreimage`;
    const payload = { idList, sourceType, prestoreImageType };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Thermal Compensation On/Off
  const setThermalCompensationOnOff = async (idList: number[], enable: boolean): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }

    const url = `${baseurl}/api/v1/device/correctionop/cabinets/thermacal/enable`;
    const payload = { idList, enable };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Thermal Compensation Intensity
  const setThermalCompensationIntensity = async (
    idList: number[],
    amount: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof amount !== "number" || amount < 0 || amount > 255) {
      throw new Error("amount must be a number between 0 and 255");
    }

    const url = `${baseurl}/device/correctionop/cabinets/thermacal/amount`;
    const payload = { idList, amount };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Thermal Compensation Mode
  const setThermalCompensationMode = async (idList: number[], mode: number): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (mode !== 0 && mode !== 1) {
      throw new Error("mode must be 0 (manual) or 1 (auto)");
    }

    const url = `${baseurl}/api/v1/device/correctionop/cabinets/thermacal/mode`;
    const payload = { idList, mode };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Cabinet RGB Brightness
  const setCabinetRgbBrightness = async (
    idList: number[],
    r: number,
    g: number,
    b: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof r !== "number" || r < 0 || r > 255) {
      throw new Error("r must be a number between 0 and 255");
    }
    if (typeof g !== "number" || g < 0 || g > 255) {
      throw new Error("g must be a number between 0 and 255");
    }
    if (typeof b !== "number" || b < 0 || b > 255) {
      throw new Error("b must be a number between 0 and 255");
    }

    const url = `${baseurl}/api/v1/device/cabinet/rgb/brightness`;
    const payload = { idList, rgb: { r, g, b } };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Cabinet Brightness
  const setCabinetBrightness = async (
    idList: number[],
    ratio: number,
    nit?: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof ratio !== "number" || ratio < 0 || ratio > 1) {
      throw new Error("ratio must be a number between 0 and 1");
    }
    if (nit !== undefined && (typeof nit !== "number" || nit < 0)) {
      throw new Error("nit must be a non-negative number");
    }

    const url = `${baseurl}/api/v1/device/cabinet/brightness`;
    const payload: { idList: number[]; ratio: number; nit?: number } = { idList, ratio };
    if (nit !== undefined) {
      payload.nit = nit;
    }
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Adjust Cabinet Color Temperature
  const adjustCabinetColorTemperature = async (idList: number[], value: number): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof value !== "number" || value < 1700 || value > 15000) {
      throw new Error(
        "value must be a number between 1700 and 15000 (color temperature in Kelvin)",
      );
    }

    const url = `${baseurl}/api/v1/device/cabinet/colortemperature`;
    const payload = { idList, value };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Receiving Card Test Pattern
  const setReceivingCardTestPattern = async (
    idList: number[],
    testmode: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    const validModes = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    if (!validModes.includes(testmode)) {
      throw new Error(`testmode must be one of: ${validModes.join(", ")}`);
    }

    const url = `${baseurl}/api/v1/device/cabinet/testpattern`;
    const payload = { idList, testmode };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Enable Cabinet Mapping
  const enableCabinetMapping = async (idList: number[], enable: boolean): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof enable !== "boolean") {
      throw new Error("enable must be a boolean");
    }

    const url = `${baseurl}/api/v1/device/cabinet/mapping`;
    const payload = { idList, enable };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Multimode By Cabinets
  const setMultimodeByCabinets = async (idList: number[], modeId: number): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    if (typeof modeId !== "number" || modeId < 0) {
      throw new Error("modeId must be a non-negative number");
    }

    const url = `${baseurl}/api/v1/device/cabinet/multimode`;
    const payload = { idList, modeId };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Move Cabinet
  const moveCabinet = async (screenID: string, canvases: CanvasConfig[]): Promise<void> => {
    if (typeof screenID !== "string" || screenID.length === 0) {
      throw new Error("screenID must be a non-empty string");
    }
    if (!Array.isArray(canvases) || canvases.length === 0) {
      throw new Error("canvases must be a non-empty array");
    }

    const url = `${baseurl}/api/v1/screen/cabinets`;
    const payload = { screenID, canvases };
    const response = await ky.put(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Set Cabinet RGBW Brightness
  const setCabinetRgbwBrightness = async (
    idList: number[],
    changeType: 1 | 2 | 3 | 4,
    value: number,
  ): Promise<void> => {
    if (!Array.isArray(idList) || idList.length === 0) {
      throw new Error("idList must be a non-empty array");
    }
    const validChangeTypes = [1, 2, 3, 4];
    if (!validChangeTypes.includes(changeType)) {
      throw new Error("changeType must be 1 (W), 2 (R), 3 (G), or 4 (B)");
    }
    if (typeof value !== "number" || value < 0 || value > 1) {
      throw new Error("value must be a number between 0 and 1");
    }

    const url = `${baseurl}/api/v1/device/cabinet/rgbwbrightness`;
    const payload = { idList, changeType, value };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  return {
    setNoDataSignal,
    setThermalCompensationOnOff,
    setThermalCompensationIntensity,
    setThermalCompensationMode,
    setCabinetRgbBrightness,
    setCabinetBrightness,
    adjustCabinetColorTemperature,
    setReceivingCardTestPattern,
    enableCabinetMapping,
    setMultimodeByCabinets,
    moveCabinet,
    setCabinetRgbwBrightness,
  };
}

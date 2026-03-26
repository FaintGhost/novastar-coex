// Preset API methods for NovaStar COEX
import ky from "ky";
import type { ApiResponse, PresetOptions } from "../types.js";

export interface PresetApi {
  getPreset: () => Promise<unknown>;
  applyPreset: (screenID: string, sequenceNumber: number) => Promise<void>;
  modifyPreset: (screenID: string, presetOptions: PresetOptions) => Promise<void>;
}

export function createPresetApi(
  instance: { baseurl: string },
  responseparser: (data: ApiResponse, path?: string) => Promise<unknown>,
): PresetApi {
  const { baseurl } = instance;

  // Get Preset
  const getPreset = async (): Promise<unknown> => {
    const url = `${baseurl}/api/v1/preset`;
    const response = await ky.get(url);
    const data = (await response.json()) as ApiResponse;
    return responseparser(data, "data");
  };

  // Apply Preset
  const applyPreset = async (screenID: string, sequenceNumber: number): Promise<void> => {
    if (typeof screenID !== "string" || screenID.length === 0) {
      throw new Error("screenID must be a non-empty string");
    }
    if (
      typeof sequenceNumber !== "number" ||
      sequenceNumber < 0 ||
      !Number.isInteger(sequenceNumber)
    ) {
      throw new Error("sequenceNumber must be a non-negative integer");
    }

    const url = `${baseurl}/api/v1/preset/current/update`;
    const payload = { screenID, sequenceNumber };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  // Modify Preset
  const modifyPreset = async (screenID: string, presetOptions: PresetOptions): Promise<void> => {
    if (typeof screenID !== "string" || screenID.length === 0) {
      throw new Error("screenID must be a non-empty string");
    }
    if (
      typeof presetOptions.sequenceNumber !== "number" ||
      presetOptions.sequenceNumber < 0 ||
      !Number.isInteger(presetOptions.sequenceNumber)
    ) {
      throw new Error("presetOptions.sequenceNumber must be a non-negative integer");
    }

    const url = `${baseurl}/api/v1/preset/update`;
    const payload = { screenID, ...presetOptions };
    const response = await ky.post(url, { json: payload });
    const data = (await response.json()) as ApiResponse;
    await responseparser(data);
  };

  return {
    getPreset,
    applyPreset,
    modifyPreset,
  };
}

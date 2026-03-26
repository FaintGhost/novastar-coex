// api/index.ts - API module aggregation
import type { ApiResponse } from "../types.js";
import { createDeviceApi } from "./device.js";
import { createScreenApi } from "./screen.js";
import { createPresetApi } from "./preset.js";
import { createCabinetApi } from "./cabinet.js";

export interface CoexApiInstance {
  baseurl: string;
}

export function createCoexApi(
  ip: string,
  port: number = 8001,
): CoexApiInstance &
  ReturnType<typeof createDeviceApi> &
  ReturnType<typeof createScreenApi> &
  ReturnType<typeof createPresetApi> &
  ReturnType<typeof createCabinetApi> {
  const baseurl = `http://${ip}:${port}`;

  // Shared response parser - returns a Promise
  const responseparser = async (data: ApiResponse, path?: string): Promise<unknown> => {
    if (data.code && data.code !== 0) {
      const error: { error: string; note?: string } = { error: data.message };
      if (error.error === "device locked") {
        error.note =
          "VMP is likely on another device. Either close VMP or run Companion on the same machine & IP address.";
      }
      throw error;
    }

    if (path) {
      // Simple path navigation like 'data.list' or 'data.screens'
      const parts = path.split(".");
      let result: unknown = data;
      for (const part of parts) {
        if (result && typeof result === "object" && part in (result as Record<string, unknown>)) {
          result = (result as Record<string, unknown>)[part];
        } else {
          return undefined;
        }
      }
      return result;
    }

    return data;
  };

  const instance: CoexApiInstance = { baseurl };

  // Create API modules
  const deviceApi = createDeviceApi(instance, responseparser);
  const screenApi = createScreenApi(instance, responseparser);
  const presetApi = createPresetApi(instance, responseparser);
  const cabinetApi = createCabinetApi(instance, responseparser);

  return {
    baseurl,
    ...deviceApi,
    ...screenApi,
    ...presetApi,
    ...cabinetApi,
  };
}

export { createDeviceApi } from "./device.js";
export { createScreenApi } from "./screen.js";
export { createPresetApi } from "./preset.js";
export { createCabinetApi } from "./cabinet.js";
export type { DeviceApi } from "./device.js";
export type { ScreenApi } from "./screen.js";
export type { PresetApi } from "./preset.js";
export type { CabinetApi } from "./cabinet.js";

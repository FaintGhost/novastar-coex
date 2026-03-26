import { createDeviceApi } from "./device.js";
import { createScreenApi } from "./screen.js";
import { createPresetApi } from "./preset.js";
import { createCabinetApi } from "./cabinet.js";
export interface CoexApiInstance {
    baseurl: string;
}
export declare function createCoexApi(ip: string, port?: number): CoexApiInstance & ReturnType<typeof createDeviceApi> & ReturnType<typeof createScreenApi> & ReturnType<typeof createPresetApi> & ReturnType<typeof createCabinetApi>;
export { createDeviceApi } from "./device.js";
export { createScreenApi } from "./screen.js";
export { createPresetApi } from "./preset.js";
export { createCabinetApi } from "./cabinet.js";
export type { DeviceApi } from "./device.js";
export type { ScreenApi } from "./screen.js";
export type { PresetApi } from "./preset.js";
export type { CabinetApi } from "./cabinet.js";
//# sourceMappingURL=index.d.ts.map
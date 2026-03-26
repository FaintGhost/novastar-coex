export type { ApiResponse, Screen, Cabinet, Preset, InputSource } from "./types.js";
export declare class COEX {
    private api;
    readonly ip: string;
    readonly port: number;
    readonly baseurl: string;
    debug: boolean;
    constructor(ip: string, port?: number, options?: {
        debug?: boolean;
    });
    blackout(): Promise<void>;
    normal(): Promise<void>;
    freeze(): Promise<void>;
    brightness(brightnessValue: number): Promise<void>;
    input(inputName: string): Promise<{
        input: string;
        groupId: string;
    }>;
    summary(): Promise<number>;
    get apiInstance(): import("./api/index.js").CoexApiInstance & import("./api/device.js").DeviceApi & import("./api/screen.js").ScreenApi & import("./api/preset.js").PresetApi & import("./api/cabinet.js").CabinetApi;
}
export { createCoexApi } from "./api/index.js";
export { createDeviceApi } from "./api/device.js";
export { createScreenApi } from "./api/screen.js";
export { createPresetApi } from "./api/preset.js";
export { createCabinetApi } from "./api/cabinet.js";
//# sourceMappingURL=index.d.ts.map
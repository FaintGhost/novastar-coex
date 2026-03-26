import type { ApiResponse, PresetOptions } from "../types.js";
export interface PresetApi {
    getPreset: () => Promise<unknown>;
    applyPreset: (screenID: string, sequenceNumber: number) => Promise<void>;
    modifyPreset: (screenID: string, presetOptions: PresetOptions) => Promise<void>;
}
export declare function createPresetApi(instance: {
    baseurl: string;
}, responseparser: (data: ApiResponse, path?: string) => Promise<unknown>): PresetApi;
//# sourceMappingURL=preset.d.ts.map
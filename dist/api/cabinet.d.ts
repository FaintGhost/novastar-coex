import type { ApiResponse, CanvasConfig } from "../types.js";
export interface CabinetApi {
    setNoDataSignal: (idList: number[], sourceType: number, prestoreImageType: number) => Promise<void>;
    setThermalCompensationOnOff: (idList: number[], enable: boolean) => Promise<void>;
    setThermalCompensationIntensity: (idList: number[], amount: number) => Promise<void>;
    setThermalCompensationMode: (idList: number[], mode: number) => Promise<void>;
    setCabinetRgbBrightness: (idList: number[], r: number, g: number, b: number) => Promise<void>;
    setCabinetBrightness: (idList: number[], ratio: number, nit?: number) => Promise<void>;
    adjustCabinetColorTemperature: (idList: number[], value: number) => Promise<void>;
    setReceivingCardTestPattern: (idList: number[], testmode: number) => Promise<void>;
    enableCabinetMapping: (idList: number[], enable: boolean) => Promise<void>;
    setMultimodeByCabinets: (idList: number[], modeId: number) => Promise<void>;
    moveCabinet: (screenID: string, canvases: CanvasConfig[]) => Promise<void>;
    setCabinetRgbwBrightness: (idList: number[], changeType: 1 | 2 | 3 | 4, value: number) => Promise<void>;
}
export declare function createCabinetApi(instance: {
    baseurl: string;
}, responseparser: (data: ApiResponse, path?: string) => Promise<unknown>): CabinetApi;
//# sourceMappingURL=cabinet.d.ts.map
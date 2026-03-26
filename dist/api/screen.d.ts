export interface ScreenApi {
    screen: () => Promise<any>;
    getScreenProperties: () => Promise<any>;
    getCabinetCount: () => Promise<any>;
    displaymode: (value: number, canvasIDs?: number[]) => Promise<void>;
    getDisplayState: () => Promise<any>;
    getDisplayParams: () => Promise<any>;
    brightness: (brightness: number, screenIds?: string[]) => Promise<void>;
    screenbrightness: (brightness: number, screenIds: string[]) => Promise<void>;
    colortemperature: (colorTemp: number, screenIds?: string[]) => Promise<void>;
    gamma: (gamma: number, screenIds?: string[]) => Promise<void>;
    setCustomGamma: (screenId: string, gammaTable: number[]) => Promise<void>;
    setCustomGamut: (screenIdList: string[], gamutData: any) => Promise<void>;
    switchColorGamut: (screenIdList: string[], gamutType: number) => Promise<void>;
    setBrightnessLimitOnOff: (state: boolean, screenIdList: string[]) => Promise<void>;
    setBrightnessLimitValue: (screenIdList: string[], type: 2 | 3, nit?: number, ratio?: number) => Promise<void>;
    enable3DLut: (enable: boolean, screenIdList: string[]) => Promise<void>;
    set3DLutStrength: (screenIdList: string[], strength: number) => Promise<void>;
    import3DLutFile: (screenIdList: string[], file: Blob, fileName: string) => Promise<void>;
    delete3DLutFile: (screenIdList: string[], fileName: string) => Promise<void>;
    setColorCorrectionOnOff: (enable: boolean, screenIdList: string[]) => Promise<void>;
    setColorCorrectionBlackWhite: (data: any[]) => Promise<void>;
    setColorCorrectionOtherColors: (data: any[][]) => Promise<void>;
    getAllScheduleInfo: () => Promise<any>;
    setScheduleOnOff: (screenId: string, enable: boolean) => Promise<void>;
    deleteBrightnessStrategy: (screenId: string) => Promise<void>;
    switchLayerSource: (screenId: string, layers: {
        id: number;
        source: number;
    }[]) => Promise<void>;
    getScreenOutputData: () => Promise<any>;
    setMultimodeByScreens: (screenIdList: string[], modeId: number) => Promise<void>;
    setOutputBitDepth: (screenIdList: string[], bitDepth: 0 | 1 | 2 | 255) => Promise<void>;
    outputSyncSourceSwitching: (enable: boolean, sourceType?: number) => Promise<void>;
    enable3DEmitter: (enable: boolean, screenIdList: string[]) => Promise<void>;
    enable3D: (enable: boolean, screenIdList: string[]) => Promise<void>;
    setMapping: (canvasId: number, mappingData: any) => Promise<void>;
    getScreenList: () => Promise<any>;
}
export declare function createScreenApi(instance: {
    baseurl: string;
}, responseparser: (data: any, path?: string) => Promise<any>): ScreenApi;
//# sourceMappingURL=screen.d.ts.map
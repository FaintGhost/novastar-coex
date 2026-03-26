import type { ApiResponse, InputSource, AudioSettings, DeviceBackupStatus, MonitorInfo, InternalSourceOptions, EdidOptions, SystemTimeOptions, RGBColor } from "../types.js";
export interface DeviceApi {
    cabinet: () => Promise<unknown[]>;
    sources: () => Promise<InputSource[]>;
    monitor: () => Promise<MonitorInfo>;
    setHdrMode: (id: number, hdrMode: number) => Promise<void>;
    setInternalSource: (options: InternalSourceOptions) => Promise<void>;
    setSendingCardTestPattern: (mode: number, params?: {
        red?: number;
        green?: number;
        blue?: number;
        gray?: number;
        gridWidth?: number;
        moveSpeed?: number;
    }) => Promise<void>;
    getInputData: () => Promise<unknown>;
    setShadow: (inputIdList: number[], type: number, shadow: number) => Promise<void>;
    setHighlight: (inputIdList: number[], type: number, highLight: number) => Promise<void>;
    resetColorAdjustment: (inputIdList: number[], type?: number) => Promise<void>;
    setSaturation: (inputIdList: number[], saturation: number) => Promise<void>;
    setContrast: (inputIdList: number[], contrast: number) => Promise<void>;
    setBlackLevel: (inputIdList: number[], blackLevel: number) => Promise<void>;
    setHue: (inputIdList: number[], hue: number) => Promise<void>;
    setEdid: (inputId: number, options: EdidOptions) => Promise<void>;
    setOutputAudio: (enable: boolean, source: number) => Promise<void>;
    getAudioSettings: () => Promise<AudioSettings>;
    controllerIdentify: (enable: boolean, color: RGBColor) => Promise<void>;
    getDeviceBackupStatus: () => Promise<DeviceBackupStatus>;
    primaryBackupVerify: (screenID: string, verifyType: number) => Promise<void>;
    exportLog: () => Promise<unknown>;
    setSystemTime: (options: SystemTimeOptions) => Promise<void>;
    setAutoTimeOnOff: (enable: boolean, timeSource: number) => Promise<void>;
    setTimeZone: (timezone: string) => Promise<void>;
    setControllerName: (customName: string) => Promise<void>;
    getSnmpStatus: () => Promise<{
        state: boolean;
    }>;
    setSnmpOnOff: (state: boolean) => Promise<void>;
    getMultifunctionCardInfo: () => Promise<unknown>;
    deviceIdentify: (enable: boolean) => Promise<void>;
}
export declare function createDeviceApi(instance: {
    baseurl: string;
}, responseparser: (data: ApiResponse, path?: string) => Promise<unknown>): DeviceApi;
//# sourceMappingURL=device.d.ts.map
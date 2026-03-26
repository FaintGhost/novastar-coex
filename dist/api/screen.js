import ky from "ky";
export function createScreenApi(instance, responseparser) {
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
        displaymode: async (value, canvasIDs) => {
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
        brightness: async (brightness, screenIds) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/brightness`, {
                json: { brightness, screenIds },
            })
                .json();
            return responseparser(data);
        },
        screenbrightness: async (brightness, screenIds) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/brightness`, {
                json: { brightness, screenIds },
            })
                .json();
            return responseparser(data);
        },
        // Color temperature
        colortemperature: async (colorTemp, screenIds) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/colortemperature`, {
                json: { colorTemp, screenIds },
            })
                .json();
            return responseparser(data);
        },
        // Gamma
        gamma: async (gamma, screenIds) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/gamma`, {
                json: { gamma, screenIds },
            })
                .json();
            return responseparser(data);
        },
        setCustomGamma: async (screenId, gammaTable) => {
            const data = await ky
                .post(`${baseurl}/api/v1/screen/gamma/update`, {
                json: { screenId, gammaTable },
            })
                .json();
            return responseparser(data);
        },
        // Image/Output
        setCustomGamut: async (screenIdList, gamutData) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/output/customgamut`, {
                json: { screenIdList, gamutData },
            })
                .json();
            return responseparser(data);
        },
        switchColorGamut: async (screenIdList, gamutType) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/output/gamut`, {
                json: { screenIdList, gamutType },
            })
                .json();
            return responseparser(data);
        },
        setBrightnessLimitOnOff: async (state, screenIdList) => {
            const data = await ky
                .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
                json: { state, screenIdList },
            })
                .json();
            return responseparser(data);
        },
        setBrightnessLimitValue: async (screenIdList, type, nit, ratio) => {
            const data = await ky
                .post(`${baseurl}/api/v1/screen/output/max-brightness`, {
                json: { screenIdList, type, nit, ratio },
            })
                .json();
            return responseparser(data);
        },
        // 3D LUT
        enable3DLut: async (enable, screenIdList) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/processing/threedlut/enable`, {
                json: { enable, screenIdList },
            })
                .json();
            return responseparser(data);
        },
        set3DLutStrength: async (screenIdList, strength) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/processing/threedlut/strength`, {
                json: { screenIdList, strength },
            })
                .json();
            return responseparser(data);
        },
        import3DLutFile: async (screenIdList, file, fileName) => {
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
        delete3DLutFile: async (screenIdList, fileName) => {
            const data = await ky
                .delete(`${baseurl}/api/v1/screen/processing/threedlut/file`, {
                json: { screenIdList, fileName },
            })
                .json();
            return responseparser(data);
        },
        // Color Correction
        setColorCorrectionOnOff: async (enable, screenIdList) => {
            const data = await ky
                .put(`${baseurl}/screen/processing/colorcorrect/enable`, {
                json: { enable, screenIdList },
            })
                .json();
            return responseparser(data);
        },
        setColorCorrectionBlackWhite: async (data) => {
            const response = await ky
                .put(`${baseurl}/screen/processing/colorcorrect/whiteblack`, {
                json: { data },
            })
                .json();
            return responseparser(response);
        },
        setColorCorrectionOtherColors: async (data) => {
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
        setScheduleOnOff: async (screenId, enable) => {
            const data = await ky
                .post(`${baseurl}/api/v1/screen/schedule/enable/update`, {
                json: { screenId, enable },
            })
                .json();
            return responseparser(data);
        },
        deleteBrightnessStrategy: async (screenId) => {
            const data = await ky
                .post(`${baseurl}/api/v1/screen/schedule/brightness-strategy/delete`, {
                json: { screenId },
            })
                .json();
            return responseparser(data);
        },
        // Layer
        switchLayerSource: async (screenId, layers) => {
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
        setMultimodeByScreens: async (screenIdList, modeId) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/output/multimode`, {
                json: { screenIdList, modeId },
            })
                .json();
            return responseparser(data);
        },
        setOutputBitDepth: async (screenIdList, bitDepth) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/output/bitdepth`, {
                json: { screenIdList, bitDepth },
            })
                .json();
            return responseparser(data);
        },
        outputSyncSourceSwitching: async (enable, sourceType) => {
            const data = await ky
                .put(`${baseurl}/screen/output/sync/source`, {
                json: { enable, sourceType },
            })
                .json();
            return responseparser(data);
        },
        enable3DEmitter: async (enable, screenIdList) => {
            const data = await ky
                .put(`${baseurl}/screen/output/threed/emitter`, {
                json: { enable, screenIdList },
            })
                .json();
            return responseparser(data);
        },
        enable3D: async (enable, screenIdList) => {
            const data = await ky
                .put(`${baseurl}/api/v1/screen/output/threed/enable`, {
                json: { enable, screenIdList },
            })
                .json();
            return responseparser(data);
        },
        setMapping: async (canvasId, mappingData) => {
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
//# sourceMappingURL=screen.js.map
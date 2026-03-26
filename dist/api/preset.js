// Preset API methods for NovaStar COEX
import ky from "ky";
export function createPresetApi(instance, responseparser) {
    const { baseurl } = instance;
    // Get Preset
    const getPreset = async () => {
        const url = `${baseurl}/api/v1/preset`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Apply Preset
    const applyPreset = async (screenID, sequenceNumber) => {
        if (typeof screenID !== "string" || screenID.length === 0) {
            throw new Error("screenID must be a non-empty string");
        }
        if (typeof sequenceNumber !== "number" ||
            sequenceNumber < 0 ||
            !Number.isInteger(sequenceNumber)) {
            throw new Error("sequenceNumber must be a non-negative integer");
        }
        const url = `${baseurl}/api/v1/preset/current/update`;
        const payload = { screenID, sequenceNumber };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Modify Preset
    const modifyPreset = async (screenID, presetOptions) => {
        if (typeof screenID !== "string" || screenID.length === 0) {
            throw new Error("screenID must be a non-empty string");
        }
        if (typeof presetOptions.sequenceNumber !== "number" ||
            presetOptions.sequenceNumber < 0 ||
            !Number.isInteger(presetOptions.sequenceNumber)) {
            throw new Error("presetOptions.sequenceNumber must be a non-negative integer");
        }
        const url = `${baseurl}/api/v1/preset/update`;
        const payload = { screenID, ...presetOptions };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    return {
        getPreset,
        applyPreset,
        modifyPreset,
    };
}
//# sourceMappingURL=preset.js.map
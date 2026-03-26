import { createDeviceApi } from "./device.js";
import { createScreenApi } from "./screen.js";
import { createPresetApi } from "./preset.js";
import { createCabinetApi } from "./cabinet.js";
export function createCoexApi(ip, port = 8001) {
    const baseurl = `http://${ip}:${port}`;
    // Shared response parser - returns a Promise
    const responseparser = async (data, path) => {
        if (data.code && data.code !== 0) {
            const error = { error: data.message };
            if (error.error === "device locked") {
                error.note =
                    "VMP is likely on another device. Either close VMP or run Companion on the same machine & IP address.";
            }
            throw error;
        }
        if (path) {
            // Simple path navigation like 'data.list' or 'data.screens'
            const parts = path.split(".");
            let result = data;
            for (const part of parts) {
                if (result && typeof result === "object" && part in result) {
                    result = result[part];
                }
                else {
                    return undefined;
                }
            }
            return result;
        }
        return data;
    };
    const instance = { baseurl };
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
//# sourceMappingURL=index.js.map
// Main entry point for NovaStar COEX API
import ky from "ky";
import { createCoexApi } from "./api/index.js";
export class COEX {
    api;
    ip;
    port;
    baseurl;
    debug;
    constructor(ip, port = 8001, options = {}) {
        this.ip = ip;
        this.port = port || 8001;
        this.debug = options.debug || false;
        this.baseurl = `http://${this.ip}:${this.port}`;
        this.api = createCoexApi(this.ip, this.port);
    }
    // Proxy all API methods
    async blackout() {
        console.log("blackout the screen");
        await this.api.displaymode(1);
    }
    async normal() {
        console.log("normal the screen");
        await this.api.displaymode(0);
    }
    async freeze() {
        console.log("freeze the screen");
        await this.api.displaymode(2);
    }
    async brightness(brightnessValue) {
        console.log("adjust brightness", brightnessValue);
        const screenData = await this.api.screen();
        if (screenData && screenData.screens) {
            const screens = screenData.screens;
            const screenIds = screens.map((s) => s.screenID);
            if (screenIds.length > 0) {
                await this.api.screenbrightness(brightnessValue, screenIds);
            }
            else {
                throw { error: "No screens found to adjust brightness." };
            }
        }
        else {
            throw { error: "Failed to retrieve screen IDs or invalid response format" };
        }
    }
    async input(inputName) {
        const sources = (await this.api.sources());
        if (!Array.isArray(sources)) {
            throw { error: "Failed to get sources" };
        }
        const lookup = {};
        for (const source of sources) {
            if (source.name)
                lookup[source.name] = source.groupId || "";
            if (source.groupId)
                lookup[source.groupId] = source.groupId;
        }
        const groupId = lookup[inputName];
        if (!groupId) {
            throw { error: "Unknown input: " + inputName };
        }
        const response = await ky.put(`${this.baseurl}/api/v1/screen/layer/input`, {
            json: { groupId },
        });
        const data = (await response.json());
        if (data.code && data.code !== 0) {
            throw { error: data.message };
        }
        return { input: inputName, groupId };
    }
    async summary() {
        const cabinets = (await this.api.cabinet());
        if (Array.isArray(cabinets)) {
            console.log("Cabinet count:", cabinets.length);
            return cabinets.length;
        }
        throw { error: "Could not get cabinet count." };
    }
    // Dynamically delegate all other methods to the API
    get apiInstance() {
        return this.api;
    }
}
// Export the factory function as well
export { createCoexApi } from "./api/index.js";
export { createDeviceApi } from "./api/device.js";
export { createScreenApi } from "./api/screen.js";
export { createPresetApi } from "./api/preset.js";
export { createCabinetApi } from "./api/cabinet.js";
//# sourceMappingURL=index.js.map
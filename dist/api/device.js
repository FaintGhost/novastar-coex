// api/device.ts - Device-related API methods
import ky from "ky";
export function createDeviceApi(instance, responseparser) {
    const baseurl = instance.baseurl;
    // Get list of attached cabinets
    const cabinet = async () => {
        const url = `${baseurl}/api/v1/device/cabinet`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Get input sources
    const sources = async () => {
        const url = `${baseurl}/api/v1/device/input/sources`;
        const response = await ky.get(url);
        const data = (await response.json());
        const parsedData = (await responseparser(data, "data"));
        return parsedData;
    };
    // Monitor info
    const monitor = async () => {
        const url = `${baseurl}/api/v1/device/monitor/info`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Set HDR mode
    const setHdrMode = async (id, hdrMode) => {
        const validModes = [0, 1, 2, 255];
        if (!validModes.includes(hdrMode)) {
            throw new Error(`Invalid hdrMode: ${hdrMode}. Must be one of ${validModes.join(", ")}.`);
        }
        if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
            throw new Error(`Invalid input source ID: ${id}. Must be a non-negative integer.`);
        }
        const url = `${baseurl}/api/v1/device/input/${id}/hdrmode`;
        const payload = { hdrMode };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Internal Source Information
    const setInternalSource = async (options) => {
        const { width, height, refreshrate, bitdepth, isEdidCustom } = options;
        if (typeof width !== "number" || width <= 0) {
            throw new Error("Invalid width: must be a positive number");
        }
        if (typeof height !== "number" || height <= 0) {
            throw new Error("Invalid height: must be a positive number");
        }
        if (typeof refreshrate !== "number" || refreshrate <= 0) {
            throw new Error("Invalid refreshrate: must be a positive number");
        }
        const validBitdepths = [0, 1, 2];
        if (!validBitdepths.includes(bitdepth)) {
            throw new Error(`Invalid bitdepth: ${bitdepth}. Must be one of 0, 1, 2 (8bit, 10bit, 12bit)`);
        }
        const url = `${baseurl}/device/input/internalsource`;
        const payload = {
            width,
            height,
            refreshrate,
            bitdepth,
            isEdidCustom: Boolean(isEdidCustom),
        };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Sending Card Test Pattern
    const setSendingCardTestPattern = async (mode, params) => {
        const url = `${baseurl}/api/v1/device/input/pattern/test`;
        const payload = {
            mode,
            parameters: params || {},
        };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Get Input Data
    const getInputData = async () => {
        const url = `${baseurl}/api/v1/device/input`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Set Shadow (dark area adjustment)
    const setShadow = async (inputIdList, type, shadow) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        const validTypes = [0, 1, 2, 3];
        if (!validTypes.includes(type)) {
            throw new Error(`Invalid type: ${type}. Must be one of ${validTypes.join(", ")}...`);
        }
        if (typeof shadow !== "number" || shadow < 0 || shadow > 200) {
            throw new Error("Invalid shadow: must be a number between 0 and 200");
        }
        const url = `${baseurl}/api/v1/device/input/shadow`;
        const payload = { inputIdList, type, shadow };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Highlight (bright area adjustment)
    const setHighlight = async (inputIdList, type, highLight) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        const validTypes = [0, 1, 2, 3];
        if (!validTypes.includes(type)) {
            throw new Error(`Invalid type: ${type}. Must be one of ${validTypes.join(", ")} (0=red, 1=green, 2=blue, 3=contrast)`);
        }
        if (typeof highLight !== "number" || highLight < 0 || highLight > 200) {
            throw new Error("Invalid highLight: must be a number between 0 and 200");
        }
        const url = `${baseurl}/api/v1/device/input/highlight`;
        const payload = { inputIdList, type, highLight };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Reset Color Adjustment
    const resetColorAdjustment = async (inputIdList, type = 0) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        const url = `${baseurl}/api/v1/device/input/reset`;
        const payload = { inputIdList, type };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Saturation
    const setSaturation = async (inputIdList, saturation) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        if (typeof saturation !== "number" || saturation < 0 || saturation > 200) {
            throw new Error("Invalid saturation: must be a number between 0 and 200");
        }
        const url = `${baseurl}/api/v1/device/input/saturation`;
        const payload = { inputIdList, saturation };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Contrast
    const setContrast = async (inputIdList, contrast) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        if (typeof contrast !== "number" || contrast < 0 || contrast > 200) {
            throw new Error("Invalid contrast value: must be a number between 0 and 200");
        }
        const url = `${baseurl}/api/v1/device/input/contrast`;
        const payload = { inputIdList, type: 3, highLight: contrast };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Black Level
    const setBlackLevel = async (inputIdList, blackLevel) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        if (typeof blackLevel !== "number" || blackLevel < 0 || blackLevel > 200) {
            throw new Error("Invalid shadow (black level): must be a number between 0 and 200");
        }
        const url = `${baseurl}/api/v1/device/input/shadow`;
        const payload = { inputIdList, type: 3, shadow: blackLevel };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Hue
    const setHue = async (inputIdList, hue) => {
        if (!Array.isArray(inputIdList) || inputIdList.length === 0) {
            throw new Error("inputIdList must be a non-empty array");
        }
        if (typeof hue !== "number" || hue < -180 || hue > 180) {
            throw new Error("Invalid hue: must be a number between -180 and 180");
        }
        const url = `${baseurl}/api/v1/device/input/hue`;
        const payload = { inputIdList, hue };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set EDID
    const setEdid = async (inputId, options) => {
        if (typeof inputId !== "number" || !Number.isInteger(inputId) || inputId < 0) {
            throw new Error("Invalid input source ID: must be a non-negative integer");
        }
        const { resolution, refreshRate, isCustom } = options;
        const url = `${baseurl}/api/v1/device/input/${inputId}/edid`;
        const payload = {
            para: {
                resolution,
                refreshRate,
                isCustom: Boolean(isCustom),
            },
        };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Output Audio
    const setOutputAudio = async (enable, source) => {
        if (typeof enable !== "boolean") {
            throw new Error("enable must be a boolean");
        }
        const url = `${baseurl}/api/v1/device/audio`;
        const payload = { enable, source };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Get Audio Settings
    const getAudioSettings = async () => {
        const url = `${baseurl}/api/v1/device/audio`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Controller Identify (color beacon)
    const controllerIdentify = async (enable, color) => {
        if (typeof enable !== "boolean") {
            throw new Error("enable must be a boolean");
        }
        const { r, g, b } = color;
        if (typeof r !== "number" ||
            r < 0 ||
            r > 255 ||
            typeof g !== "number" ||
            g < 0 ||
            g > 255 ||
            typeof b !== "number" ||
            b < 0 ||
            b > 255) {
            throw new Error("Invalid color values: r, g, b must be between 0 and 255");
        }
        const url = `${baseurl}/device/hw/colorBeacon`;
        const payload = { enable, color: { r, g, b } };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Get Device Backup Status
    const getDeviceBackupStatus = async () => {
        const url = `${baseurl}/api/v1/device/backup`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Primary/Backup Verify
    const primaryBackupVerify = async (screenID, verifyType) => {
        if (!verifyType) {
            throw new Error("verifyType is required");
        }
        const url = `${baseurl}/api/v1/device/backup/verify`;
        const payload = { screenID, verifyType };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Export Log
    const exportLog = async () => {
        const url = `${baseurl}/device/hw/log`;
        const response = await ky.get(url);
        return response.json();
    };
    // Set System Time
    const setSystemTime = async (options) => {
        const { year, month, day, hour, minute, second, isUTC } = options;
        if (typeof year !== "number" || year < 1970 || year > 2069) {
            throw new Error("Invalid year: must be between 1970 and 2069");
        }
        const url = `${baseurl}/api/v1/device/hw/systemtime`;
        const payload = { year, month, day, hour, minute, second, isUTC: Boolean(isUTC) };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Auto Time On/Off
    const setAutoTimeOnOff = async (enable, timeSource) => {
        if (typeof enable !== "boolean") {
            throw new Error("enable must be a boolean");
        }
        if (timeSource !== 0 && timeSource !== 1) {
            throw new Error(`Invalid timeSource: ${timeSource}. Must be 0=PC, 1=NTP server`);
        }
        const url = `${baseurl}/api/v1/device/time/enable`;
        const payload = { enable, timeSource };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Time Zone
    const setTimeZone = async (timezone) => {
        const url = `${baseurl}/api/v1/device/timezone`;
        const payload = { timezone };
        const response = await ky.post(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Set Controller Name
    const setControllerName = async (customName) => {
        if (typeof customName !== "string" || customName.length > 255) {
            throw new Error("Invalid customName: must be 255 characters or less");
        }
        const url = `${baseurl}/device/hw/customname`;
        const payload = { customName };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Get SNMP Status
    const getSnmpStatus = async () => {
        const url = `${baseurl}/api/v1/device/snmpstate`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Set SNMP On/Off
    const setSnmpOnOff = async (state) => {
        const url = `${baseurl}/api/v1/device/snmpstate`;
        const payload = { state };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    // Get Multifunction Card Info
    const getMultifunctionCardInfo = async () => {
        const url = `${baseurl}/api/v1/device/multifunc-card/detailinfo`;
        const response = await ky.get(url);
        const data = (await response.json());
        return responseparser(data, "data");
    };
    // Device Identify
    const deviceIdentify = async (enable) => {
        if (typeof enable !== "boolean") {
            throw new Error("enable must be a boolean");
        }
        const url = `${baseurl}/api/v1/device/hw/mapping`;
        const payload = { enable };
        const response = await ky.put(url, { json: payload });
        const data = (await response.json());
        await responseparser(data);
    };
    return {
        cabinet,
        sources,
        monitor,
        setHdrMode,
        setInternalSource,
        setSendingCardTestPattern,
        getInputData,
        setShadow,
        setHighlight,
        resetColorAdjustment,
        setSaturation,
        setContrast,
        setBlackLevel,
        setHue,
        setEdid,
        setOutputAudio,
        getAudioSettings,
        controllerIdentify,
        getDeviceBackupStatus,
        primaryBackupVerify,
        exportLog,
        setSystemTime,
        setAutoTimeOnOff,
        setTimeZone,
        setControllerName,
        getSnmpStatus,
        setSnmpOnOff,
        getMultifunctionCardInfo,
        deviceIdentify,
    };
}
//# sourceMappingURL=device.js.map
// test/api.test.ts
// Tests for COEX API methods using Vitest
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createCoexApi } from "../src/api/index.js";

// Mock ky
vi.mock("ky", () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const createMockResponse = (data: unknown, ok = true, status = 200) => {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(data),
  });
};

describe("COEX API Tests", () => {
  let api: ReturnType<typeof createCoexApi>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let kyMock: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    api = createCoexApi("192.168.1.100", 8001);

    const kyModule = await import("ky");
    kyMock = kyModule.default;
  });

  describe("Device API", () => {
    describe("setInternalSource", () => {
      it("should set internal source with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setInternalSource({
          width: 1920,
          height: 1080,
          refreshrate: 60.0,
          bitdepth: 1,
          isEdidCustom: false,
        });

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/device/input/internalsource",
          expect.objectContaining({
            json: expect.objectContaining({
              width: 1920,
              height: 1080,
              bitdepth: 1,
            }),
          }),
        );
      });

      it("should reject invalid width", async () => {
        await expect(
          api.setInternalSource({
            width: -100,
            height: 1080,
            refreshrate: 60.0,
            bitdepth: 1,
            isEdidCustom: false,
          }),
        ).rejects.toThrow("Invalid width: must be a positive number");
      });

      it("should reject invalid bitdepth", async () => {
        await expect(
          api.setInternalSource({
            width: 1920,
            height: 1080,
            refreshrate: 60.0,
            bitdepth: 5,
            isEdidCustom: false,
          }),
        ).rejects.toThrow("Invalid bitdepth: 5. Must be one of 0, 1, 2 (8bit, 10bit, 12bit)");
      });
    });

    describe("setShadow", () => {
      it("should set shadow with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setShadow([1, 2], 0, 100);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/shadow",
          expect.objectContaining({
            json: expect.objectContaining({
              type: 0,
              shadow: 100,
            }),
          }),
        );
      });

      it("should reject invalid shadow value", async () => {
        await expect(api.setShadow([1, 2], 0, 300)).rejects.toThrow(
          "Invalid shadow: must be a number between 0 and 200",
        );
      });

      it("should reject empty inputIdList", async () => {
        await expect(api.setShadow([], 0, 100)).rejects.toThrow(
          "inputIdList must be a non-empty array",
        );
      });
    });

    describe("setHighlight", () => {
      it("should set highlight with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setHighlight([1, 2], 1, 150);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/highlight",
          expect.objectContaining({
            json: expect.objectContaining({
              type: 1,
              highLight: 150,
            }),
          }),
        );
      });

      it("should reject invalid type", async () => {
        await expect(api.setHighlight([1, 2], 5, 100)).rejects.toThrow(
          "Invalid type: 5. Must be one of 0, 1, 2, 3",
        );
      });
    });

    describe("setSaturation", () => {
      it("should set saturation with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setSaturation([1, 2], 100);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/saturation",
          expect.objectContaining({
            json: expect.objectContaining({
              saturation: 100,
            }),
          }),
        );
      });

      it("should reject invalid saturation value", async () => {
        await expect(api.setSaturation([1], 250)).rejects.toThrow(
          "Invalid saturation: must be a number between 0 and 200",
        );
      });
    });

    describe("setContrast", () => {
      it("should set contrast with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setContrast([1], 120);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/contrast",
          expect.objectContaining({
            json: expect.objectContaining({
              type: 3,
              highLight: 120,
            }),
          }),
        );
      });
    });

    describe("setHue", () => {
      it("should set hue with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setHue([1], 45);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/hue",
          expect.objectContaining({
            json: expect.objectContaining({
              hue: 45,
            }),
          }),
        );
      });

      it("should reject hue out of range", async () => {
        await expect(api.setHue([1], 200)).rejects.toThrow(
          "Invalid hue: must be a number between -180 and 180",
        );
      });
    });

    describe("setEdid", () => {
      it("should set EDID with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setEdid(1, {
          resolution: { width: 1920, height: 1080 },
          refreshRate: 60.0,
          isCustom: false,
        });

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/input/1/edid",
          expect.objectContaining({
            json: expect.objectContaining({
              para: expect.objectContaining({
                isCustom: false,
              }),
            }),
          }),
        );
      });

      it("should reject invalid input ID", async () => {
        await expect(
          api.setEdid(-1, {
            resolution: { width: 1920, height: 1080 },
            refreshRate: 60.0,
            isCustom: false,
          }),
        ).rejects.toThrow("Invalid input source ID: must be a non-negative integer");
      });
    });

    describe("setOutputAudio", () => {
      it("should set output audio with valid parameters", async () => {
        kyMock.post.mockResolvedValue(
          createMockResponse({ code: 0, data: {}, message: "Success" }),
        );

        await api.setOutputAudio(true, 1);

        expect(kyMock.post).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/audio",
          expect.objectContaining({
            json: expect.objectContaining({
              enable: true,
              source: 1,
            }),
          }),
        );
      });

      it("should reject non-boolean enable", async () => {
        await expect(api.setOutputAudio("yes" as unknown as boolean, 1)).rejects.toThrow(
          "enable must be a boolean",
        );
      });
    });

    describe("getAudioSettings", () => {
      it("should get audio settings", async () => {
        kyMock.get.mockResolvedValue(
          createMockResponse({ code: 0, data: { enable: true, source: 1 }, message: "Success" }),
        );

        await api.getAudioSettings();

        expect(kyMock.get).toHaveBeenCalledWith("http://192.168.1.100:8001/api/v1/device/audio");
      });
    });

    describe("controllerIdentify", () => {
      it("should identify controller with valid color", async () => {
        kyMock.post.mockResolvedValue(
          createMockResponse({ code: 0, data: null, message: "Success" }),
        );

        await api.controllerIdentify(true, { r: 121, g: 10, b: 10 });

        expect(kyMock.post).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/device/hw/colorBeacon",
          expect.objectContaining({
            json: expect.objectContaining({
              enable: true,
              color: { r: 121, g: 10, b: 10 },
            }),
          }),
        );
      });

      it("should reject invalid color values", async () => {
        await expect(api.controllerIdentify(true, { r: 300, g: 10, b: 10 })).rejects.toThrow(
          "Invalid color values: r, g, b must be between 0 and 255",
        );
      });
    });

    describe("getDeviceBackupStatus", () => {
      it("should get device backup status", async () => {
        kyMock.get.mockResolvedValue(
          createMockResponse({
            code: 0,
            data: { master: "mac1", backup: "mac2" },
            message: "Success",
          }),
        );

        await api.getDeviceBackupStatus();

        expect(kyMock.get).toHaveBeenCalledWith("http://192.168.1.100:8001/api/v1/device/backup");
      });
    });

    describe("setSystemTime", () => {
      it("should set system time with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setSystemTime({
          year: 2024,
          month: 12,
          day: 25,
          hour: 14,
          minute: 30,
          second: 45,
          isUTC: false,
        });

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/hw/systemtime",
          expect.objectContaining({
            json: expect.objectContaining({
              year: 2024,
            }),
          }),
        );
      });

      it("should reject invalid year", async () => {
        await expect(
          api.setSystemTime({
            year: 3000,
            month: 12,
            day: 25,
            hour: 14,
            minute: 30,
            second: 45,
            isUTC: false,
          }),
        ).rejects.toThrow("Invalid year: must be between 1970 and 2069");
      });
    });

    describe("setAutoTimeOnOff", () => {
      it("should set auto time on/off with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setAutoTimeOnOff(true, 1);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/time/enable",
          expect.objectContaining({
            json: expect.objectContaining({
              timeSource: 1,
            }),
          }),
        );
      });

      it("should reject invalid timeSource", async () => {
        await expect(api.setAutoTimeOnOff(true, 5)).rejects.toThrow(
          "Invalid timeSource: 5. Must be 0=PC, 1=NTP server",
        );
      });
    });

    describe("setControllerName", () => {
      it("should set controller name with valid name", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setControllerName("My Controller");

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/device/hw/customname",
          expect.objectContaining({
            json: expect.objectContaining({
              customName: "My Controller",
            }),
          }),
        );
      });

      it("should reject name longer than 255 characters", async () => {
        const longName = "a".repeat(300);
        await expect(api.setControllerName(longName)).rejects.toThrow(
          "Invalid customName: must be 255 characters or less",
        );
      });
    });

    describe("getSnmpStatus", () => {
      it("should get SNMP status", async () => {
        kyMock.get.mockResolvedValue(
          createMockResponse({ code: 0, data: { state: true }, message: "Success" }),
        );

        await api.getSnmpStatus();

        expect(kyMock.get).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/snmpstate",
        );
      });
    });

    describe("setSnmpOnOff", () => {
      it("should set SNMP on/off", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setSnmpOnOff(true);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/snmpstate",
          expect.objectContaining({
            json: expect.objectContaining({
              state: true,
            }),
          }),
        );
      });
    });

    describe("deviceIdentify", () => {
      it("should identify device", async () => {
        kyMock.put.mockResolvedValue(
          createMockResponse({ code: 0, data: null, message: "Success" }),
        );

        await api.deviceIdentify(true);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/hw/mapping",
          expect.objectContaining({
            json: expect.objectContaining({
              enable: true,
            }),
          }),
        );
      });
    });
  });

  describe("Cabinet API", () => {
    describe("setNoDataSignal", () => {
      it("should set no data signal with valid parameters", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setNoDataSignal([1, 2, 3], 1, 0);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/device/cabinet/prestoreimage",
          expect.objectContaining({
            json: expect.objectContaining({
              prestoreImageType: 0,
            }),
          }),
        );
      });

      it("should reject invalid prestoreImageType", async () => {
        await expect(api.setNoDataSignal([1], 1, 5)).rejects.toThrow(
          "prestoreImageType must be 0 (black) or 1 (last frame)",
        );
      });
    });

    describe("setThermalCompensationOnOff", () => {
      it("should set thermal compensation on/off", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setThermalCompensationOnOff([1, 2], true);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/correctionop/cabinets/thermacal/enable",
          expect.objectContaining({
            json: expect.objectContaining({
              enable: true,
            }),
          }),
        );
      });

      it("should reject non-boolean enable", async () => {
        await expect(
          api.setThermalCompensationOnOff([1], "yes" as unknown as boolean),
        ).rejects.toThrow("enable must be a boolean");
      });
    });

    describe("setCabinetRgbBrightness", () => {
      it("should set cabinet RGB brightness", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setCabinetRgbBrightness([1, 2], 128, 64, 255);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/cabinet/rgb/brightness",
          expect.objectContaining({
            json: expect.objectContaining({
              rgb: {
                r: 128,
                g: 64,
                b: 255,
              },
            }),
          }),
        );
      });

      it("should reject RGB value out of range", async () => {
        await expect(api.setCabinetRgbBrightness([1], 300, 64, 255)).rejects.toThrow(
          "r must be a number between 0 and 255",
        );
      });
    });

    describe("adjustCabinetColorTemperature", () => {
      it("should adjust cabinet color temperature", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.adjustCabinetColorTemperature([1, 2], 6500);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/cabinet/colortemperature",
          expect.objectContaining({
            json: expect.objectContaining({
              value: 6500,
            }),
          }),
        );
      });

      it("should reject temperature out of range", async () => {
        await expect(api.adjustCabinetColorTemperature([1], 100)).rejects.toThrow(
          "value must be a number between 1700 and 15000 (color temperature in Kelvin)",
        );
      });
    });

    describe("setReceivingCardTestPattern", () => {
      it("should set receiving card test pattern", async () => {
        kyMock.put.mockResolvedValue(createMockResponse({ code: 0, data: {}, message: "Success" }));

        await api.setReceivingCardTestPattern([1, 2], 4);

        expect(kyMock.put).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/device/cabinet/testpattern",
          expect.objectContaining({
            json: expect.objectContaining({
              testmode: 4,
            }),
          }),
        );
      });

      it("should reject invalid test mode", async () => {
        await expect(api.setReceivingCardTestPattern([1], 100)).rejects.toThrow(
          "testmode must be one of: 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13",
        );
      });
    });
  });

  describe("Preset API", () => {
    describe("modifyPreset", () => {
      it("should modify preset with valid parameters", async () => {
        kyMock.post.mockResolvedValue(
          createMockResponse({ code: 0, data: {}, message: "Success" }),
        );

        await api.modifyPreset("screen1", {
          sequenceNumber: 1,
          name: "My Preset",
          sourceData: true,
          processingData: false,
          outputData: true,
          screenData: true,
          effectSwitch: 0,
        });

        expect(kyMock.post).toHaveBeenCalledWith(
          "http://192.168.1.100:8001/api/v1/preset/update",
          expect.objectContaining({
            json: expect.objectContaining({
              name: "My Preset",
            }),
          }),
        );
      });

      it("should reject invalid screenID", async () => {
        await expect(
          api.modifyPreset(123 as unknown as string, {
            sequenceNumber: 1,
            name: "My Preset",
            sourceData: true,
            processingData: false,
            outputData: true,
            screenData: true,
            effectSwitch: 0,
          }),
        ).rejects.toThrow("screenID must be a non-empty string");
      });

      it("should reject negative sequence number", async () => {
        await expect(
          api.modifyPreset("screen1", {
            sequenceNumber: -1,
            name: "My Preset",
            sourceData: true,
            processingData: false,
            outputData: true,
            screenData: true,
            effectSwitch: 0,
          }),
        ).rejects.toThrow("presetOptions.sequenceNumber must be a non-negative integer");
      });
    });
  });
});

/**
 * NovaStar COEX API 基础功能测试
 */

const { createNovastarInstance, promisify } = require('../utils/test-helpers');

describe('API 基础功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance({ debug: true });
  });

  test('应该返回正确的API版本', () => {
    expect(novastar.apiversion()).toBe('1.4');
  });

  test('应该能够连接到COEX处理器', async () => {
    const summaryPromise = promisify(novastar.summary.bind(novastar));
    const result = await summaryPromise();
    expect(result).toBeTruthy();
    expect(result.deviceName).toBeDefined();
  }, 10000);

  test('应该能够获取屏幕信息', async () => {
    const screenPromise = promisify(novastar.screen.bind(novastar));
    const result = await screenPromise();
    expect(result).toBeTruthy();
    expect(result.screens).toBeDefined();
    expect(Array.isArray(result.screens)).toBe(true);
  }, 10000);

  test('应该能够获取机柜信息', async () => {
    const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
    const result = await cabinetPromise();
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
  }, 10000);
});
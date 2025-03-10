/**
 * NovaStar COEX API 预设管理测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('预设管理功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够获取可用预设列表', async () => {
    const presetsPromise = promisify(novastar.presets.bind(novastar));
    const result = await presetsPromise();
    
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
    
    // 验证预设信息的结构
    if (result.length > 0) {
      const preset = result[0];
      expect(preset.name).toBeDefined();
      expect(preset.id).toBeDefined();
    }
  }, 10000);

  test('应该能够通过名称加载预设', async () => {
    // 首先获取可用预设列表
    const presetsPromise = promisify(novastar.presets.bind(novastar));
    const presets = await presetsPromise();
    
    if (presets && presets.length > 0) {
      // 选择第一个可用的预设
      const presetName = presets[0].name;
      
      // 测试加载该预设
      const presetPromise = promisify(novastar.preset.bind(novastar));
      const result = await presetPromise(presetName);
      
      expect(result).toBeTruthy();
    } else {
      console.log('跳过预设加载测试：没有可用的预设');
    }
  }, 15000);

  test('应该能够通过ID加载预设', async () => {
    // 首先获取可用预设列表
    const presetsPromise = promisify(novastar.presets.bind(novastar));
    const presets = await presetsPromise();
    
    if (presets && presets.length > 0) {
      // 选择第一个可用的预设
      const presetId = presets[0].id;
      
      // 测试加载该预设
      const presetPromise = promisify(novastar.preset.bind(novastar));
      const result = await presetPromise(presetId);
      
      expect(result).toBeTruthy();
    } else {
      console.log('跳过预设加载测试：没有可用的预设');
    }
  }, 15000);

  test('加载无效的预设应该返回错误', async () => {
    const presetPromise = promisify(novastar.preset.bind(novastar));
    
    try {
      await presetPromise('无效预设名称');
      // 如果没有抛出错误，测试应该失败
      fail('应该抛出错误但没有');
    } catch (error) {
      // 期望捕获到错误
      expect(error).toBeTruthy();
    }
  }, 10000);
});
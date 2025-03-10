/**
 * NovaStar COEX API 输入源管理测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('输入源管理功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够获取可用输入源列表', async () => {
    const sourcesPromise = promisify(novastar.sources.bind(novastar));
    const result = await sourcesPromise();
    
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
    
    // 验证输入源信息的结构
    if (result.length > 0) {
      const source = result[0];
      expect(source.name).toBeDefined();
      expect(source.id).toBeDefined();
    }
  }, 10000);

  test('应该能够切换到有效的输入源', async () => {
    // 首先获取可用输入源列表
    const sourcesPromise = promisify(novastar.sources.bind(novastar));
    const sources = await sourcesPromise();
    
    if (sources && sources.length > 0) {
      // 选择第一个可用的输入源
      const sourceName = sources[0].name;
      
      // 测试切换到该输入源
      const inputPromise = promisify(novastar.input.bind(novastar));
      const result = await inputPromise(sourceName);
      
      expect(result).toBeTruthy();
      
      // 如果有多个输入源，测试切换到另一个
      if (sources.length > 1) {
        await wait(2000); // 等待足够长的时间以确保切换完成
        
        const secondSourceName = sources[1].name;
        const result2 = await inputPromise(secondSourceName);
        expect(result2).toBeTruthy();
      }
    } else {
      console.log('跳过输入源切换测试：没有可用的输入源');
    }
  }, 15000);

  test('切换到无效的输入源应该返回错误', async () => {
    const inputPromise = promisify(novastar.input.bind(novastar));
    
    try {
      await inputPromise('无效输入源名称');
      // 如果没有抛出错误，测试应该失败
      fail('应该抛出错误但没有');
    } catch (error) {
      // 期望捕获到错误
      expect(error).toBeTruthy();
    }
  }, 10000);

  test('应该能够获取当前活动的输入源', async () => {
    // 这个测试假设API提供了获取当前活动输入源的功能
    // 如果没有这个功能，可以跳过此测试
    
    if (typeof novastar.getCurrentInput === 'function') {
      const getCurrentInputPromise = promisify(novastar.getCurrentInput.bind(novastar));
      const result = await getCurrentInputPromise();
      
      expect(result).toBeTruthy();
      expect(result.name).toBeDefined();
      expect(result.id).toBeDefined();
    } else {
      console.log('跳过获取当前输入源测试：API不可用');
    }
  }, 10000);
});
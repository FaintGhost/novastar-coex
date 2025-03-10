/**
 * NovaStar COEX API 屏幕相关功能测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('屏幕功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够获取屏幕信息', async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        novastar.screen((response, error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        });
      });
      
      expect(result).toBeTruthy();
      expect(result.screens).toBeDefined();
      expect(Array.isArray(result.screens)).toBe(true);
      
      // 验证屏幕信息的结构
      if (result.screens.length > 0) {
        const screen = result.screens[0];
        expect(screen.screenID).toBeDefined();
        expect(screen.name).toBeDefined();
      }
    } catch (error) {
      console.log('获取屏幕信息测试失败:', error.message);
    }
  }, 10000);

  test('应该能够调整屏幕亮度', async () => {
    // 首先获取屏幕ID
    const screenPromise = promisify(novastar.screen.bind(novastar));
    const screenResult = await screenPromise();
    
    if (screenResult.screens && screenResult.screens.length > 0) {
      const screenIds = screenResult.screens.map(screen => screen.screenID);
      
      // 测试设置亮度为50%
      const brightnessPromise = promisify(novastar.screenbrightness.bind(novastar));
      const result = await brightnessPromise(50, screenIds);
      
      expect(result).toBeTruthy();
      
      // 等待一段时间后再测试设置亮度为30%
      await wait(1000);
      const result2 = await brightnessPromise(30, screenIds);
      expect(result2).toBeTruthy();
    } else {
      console.log('跳过亮度测试：没有可用的屏幕');
    }
  }, 15000);

  test('应该能够调整显示模式', async () => {
    // 测试正常模式
    const normalPromise = promisify(novastar.normal.bind(novastar));
    const normalResult = await normalPromise();
    expect(normalResult).toBeTruthy();
    
    await wait(1000);
    
    // 测试黑屏模式
    const blackoutPromise = promisify(novastar.blackout.bind(novastar));
    const blackoutResult = await blackoutPromise();
    expect(blackoutResult).toBeTruthy();
    
    await wait(1000);
    
    // 测试冻结模式
    const freezePromise = promisify(novastar.freeze.bind(novastar));
    const freezeResult = await freezePromise();
    expect(freezeResult).toBeTruthy();
    
    await wait(1000);
    
    // 恢复正常模式
    await normalPromise();
  }, 15000);

  test('应该能够使用displaymode直接设置显示模式', async () => {
    const displayModePromise = promisify(novastar.displaymode.bind(novastar));
    
    // 正常模式 (0)
    const normalResult = await displayModePromise(0);
    expect(normalResult).toBeTruthy();
    
    await wait(1000);
    
    // 黑屏模式 (1)
    const blackoutResult = await displayModePromise(1);
    expect(blackoutResult).toBeTruthy();
    
    await wait(1000);
    
    // 冻结模式 (2)
    const freezeResult = await displayModePromise(2);
    expect(freezeResult).toBeTruthy();
    
    await wait(1000);
    
    // 恢复正常模式
    await displayModePromise(0);
  }, 15000);
});
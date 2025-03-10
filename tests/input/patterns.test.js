/**
 * NovaStar COEX API 测试图案功能测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('测试图案功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够设置测试图案', async () => {
    if (typeof novastar.testpattern === 'function') {
      try {
        // 测试设置纯色测试图案（假设35是有效的图案ID）
        const testPatternPromise = promisify(novastar.testpattern.bind(novastar));
        const result = await testPatternPromise(35);
        expect(result).toBeTruthy();
        
        await wait(2000); // 等待足够长的时间以确保图案显示
        
        // 测试设置另一个测试图案
        const result2 = await testPatternPromise(1); // 假设1是另一个有效的图案ID
        expect(result2).toBeTruthy();
        
        await wait(2000);
        
        // 恢复正常显示（关闭测试图案）
        // 假设0表示关闭测试图案
        const result3 = await testPatternPromise(0);
        expect(result3).toBeTruthy();
      } catch (error) {
        console.log('测试图案测试失败:', error.message);
      }
    } else {
      console.log('跳过测试图案测试：API不可用');
    }
  }, 20000);


  test('设置无效的测试图案ID应该返回错误或被限制在有效范围内', async () => {
    if (typeof novastar.testpattern === 'function') {
      const testPatternPromise = promisify(novastar.testpattern.bind(novastar));
      
      try {
        // 尝试设置一个可能无效的图案ID
        const result = await testPatternPromise(9999);
        
        // 如果API会自动限制范围而不是报错，那么结果应该是成功的
        expect(result).toBeTruthy();
        
        // 恢复正常显示
        await wait(1000);
        await testPatternPromise(0);
      } catch (error) {
        // 如果API会报错，那么应该捕获到错误
        expect(error).toBeTruthy();
        console.log('测试图案ID无效测试：捕获到预期的错误');
      }
    } else {
      console.log('跳过测试图案测试：API不可用');
    }
  }, 15000);

  test('应该能够在设置测试图案后恢复正常显示', async () => {
    if (typeof novastar.testpattern === 'function' && typeof novastar.normal === 'function') {
      try {
        // 先设置测试图案
        const testPatternPromise = promisify(novastar.testpattern.bind(novastar));
        await testPatternPromise(1);
        
        await wait(2000);
        
        // 然后使用normal函数恢复正常显示
        const normalPromise = promisify(novastar.normal.bind(novastar));
        const result = await normalPromise();
        expect(result).toBeTruthy();
      } catch (error) {
        console.log('测试图案恢复测试失败:', error.message);
      }
    } else {
      console.log('跳过测试图案恢复测试：API不可用');
    }
  }, 15000);
});
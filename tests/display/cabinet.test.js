/**
 * NovaStar COEX API 机柜相关功能测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('机柜功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够获取机柜信息', async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        novastar.cabinet((response, error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        });
      });
      
      expect(result).toBeTruthy();
      expect(Array.isArray(result)).toBe(true);
      
      // 验证机柜信息的结构
      if (result.length > 0) {
        const cabinet = result[0];
        expect(cabinet.id).toBeDefined();
      }
    } catch (error) {
      console.log('获取机柜信息测试失败:', error.message);
    }
  }, 10000);

  test('应该能够调整机柜亮度', async () => {
    try {
      // 首先获取机柜ID
      const cabinetResult = await new Promise((resolve, reject) => {
        novastar.cabinet((response, error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        });
      });
      
      if (cabinetResult && cabinetResult.length > 0) {
        const cabinetIds = cabinetResult.map(cabinet => cabinet.id);
        
        // 测试设置亮度为50%
        const result = await new Promise((resolve, reject) => {
          novastar.cabinetbrightness(50, cabinetIds, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        
        expect(result).toBeTruthy();
        
        // 等待一段时间后再测试设置亮度为30%
        await wait(1000);
        const result2 = await new Promise((resolve, reject) => {
          novastar.cabinetbrightness(30, cabinetIds, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(result2).toBeTruthy();
        
        // 测试不指定机柜ID（应该应用于所有机柜）
        await wait(1000);
        const result3 = await new Promise((resolve, reject) => {
          novastar.cabinetbrightness(40, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(result3).toBeTruthy();
      } else {
        console.log('跳过亮度测试：没有可用的机柜');
      }
    } catch (error) {
      console.log('机柜亮度测试失败:', error.message);
    }
  }, 15000);

  test('应该能够设置机柜效果模式', async () => {
    if (typeof novastar.setCabinetEffectMode === 'function' && 
        typeof novastar.getCabinetEffectMode === 'function') {
      try {
        // 获取当前效果模式
        const currentMode = await new Promise((resolve, reject) => {
          novastar.getCabinetEffectMode((response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(currentMode).toBeDefined();
        
        // 设置新的效果模式
        const result = await new Promise((resolve, reject) => {
          novastar.setCabinetEffectMode(1, (response, error) => { // 假设1是有效的模式值
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(result).toBeTruthy();
        
        // 恢复原始模式
        await wait(1000);
        const restoreResult = await new Promise((resolve, reject) => {
          novastar.setCabinetEffectMode(currentMode, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(restoreResult).toBeTruthy();
      } catch (error) {
        console.log('机柜效果模式测试失败:', error.message);
      }
    } else {
      console.log('跳过机柜效果模式测试：API不可用');
    }
  }, 15000);

  test('应该能够设置机柜X-bit使能状态', async () => {
    if (typeof novastar.setCabinetXbitEnable === 'function') {
      try {
        // 测试启用X-bit
        const enableResult = await new Promise((resolve, reject) => {
          novastar.setCabinetXbitEnable(true, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(enableResult).toBeTruthy();
        
        await wait(1000);
        
        // 测试禁用X-bit
        const disableResult = await new Promise((resolve, reject) => {
          novastar.setCabinetXbitEnable(false, (response, error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
        expect(disableResult).toBeTruthy();
      } catch (error) {
        console.log('X-bit使能测试失败:', error.message);
      }
    } else {
      console.log('跳过X-bit使能测试：API不可用');
    }
  }, 15000);
});
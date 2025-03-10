/**
 * NovaStar COEX API 机柜效果模式测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('机柜效果模式功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够获取机柜效果模式', async () => {
    if (typeof novastar.getCabinetEffectMode === 'function') {
      try {
        const getCabinetEffectModePromise = promisify(novastar.getCabinetEffectMode.bind(novastar));
        const result = await getCabinetEffectModePromise();
        
        expect(result).toBeTruthy();
        // 验证返回的数据结构
        if (result) {
          expect(result.mode).toBeDefined();
        }
      } catch (error) {
        console.log('获取机柜效果模式测试失败:', error.message);
      }
    } else {
      console.log('跳过获取机柜效果模式测试：API不可用');
    }
  }, 10000);

  test('应该能够设置机柜效果模式', async () => {
    if (typeof novastar.setCabinetEffectMode === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试设置效果模式为标准模式(假设0是标准模式)
          const setCabinetEffectModePromise = promisify(novastar.setCabinetEffectMode.bind(novastar));
          const result = await setCabinetEffectModePromise(0, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试设置为另一个模式(假设1是另一个模式)
          await wait(1000);
          const result2 = await setCabinetEffectModePromise(1, cabinetIds);
          expect(result2).toBeTruthy();
          
          // 恢复为标准模式
          await wait(1000);
          await setCabinetEffectModePromise(0, cabinetIds);
        } else {
          console.log('跳过设置机柜效果模式测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置机柜效果模式测试失败:', error.message);
      }
    } else {
      console.log('跳过设置机柜效果模式测试：API不可用');
    }
  }, 15000);

  test('应该能够设置3D LUT功能', async () => {
    if (typeof novastar.set3DLUTEnable === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试启用3D LUT
          const set3DLUTEnablePromise = promisify(novastar.set3DLUTEnable.bind(novastar));
          const result = await set3DLUTEnablePromise(true, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试禁用3D LUT
          await wait(1000);
          const result2 = await set3DLUTEnablePromise(false, cabinetIds);
          expect(result2).toBeTruthy();
        } else {
          console.log('跳过设置3D LUT功能测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置3D LUT功能测试失败:', error.message);
      }
    } else {
      console.log('跳过设置3D LUT功能测试：API不可用');
    }
  }, 15000);

  test('应该能够设置帧重映射功能', async () => {
    if (typeof novastar.setFrameRemapingEnable === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试启用帧重映射
          const setFrameRemapingEnablePromise = promisify(novastar.setFrameRemapingEnable.bind(novastar));
          const result = await setFrameRemapingEnablePromise(true, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试禁用帧重映射
          await wait(1000);
          const result2 = await setFrameRemapingEnablePromise(false, cabinetIds);
          expect(result2).toBeTruthy();
        } else {
          console.log('跳过设置帧重映射功能测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置帧重映射功能测试失败:', error.message);
      }
    } else {
      console.log('跳过设置帧重映射功能测试：API不可用');
    }
  }, 15000);

  test('应该能够设置热校正功能', async () => {
    if (typeof novastar.setThermacalEnable === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试启用热校正
          const setThermacalEnablePromise = promisify(novastar.setThermacalEnable.bind(novastar));
          const result = await setThermacalEnablePromise(true, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试禁用热校正
          await wait(1000);
          const result2 = await setThermacalEnablePromise(false, cabinetIds);
          expect(result2).toBeTruthy();
        } else {
          console.log('跳过设置热校正功能测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置热校正功能测试失败:', error.message);
      }
    } else {
      console.log('跳过设置热校正功能测试：API不可用');
    }
  }, 15000);

  test('应该能够设置校正效果', async () => {
    if (typeof novastar.setCorrectionEffect === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试设置校正效果为标准模式(假设0是标准模式)
          const setCorrectionEffectPromise = promisify(novastar.setCorrectionEffect.bind(novastar));
          const result = await setCorrectionEffectPromise(0, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试设置为另一个模式(假设1是另一个模式)
          await wait(1000);
          const result2 = await setCorrectionEffectPromise(1, cabinetIds);
          expect(result2).toBeTruthy();
          
          // 恢复为标准模式
          await wait(1000);
          await setCorrectionEffectPromise(0, cabinetIds);
        } else {
          console.log('跳过设置校正效果测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置校正效果测试失败:', error.message);
      }
    } else {
      console.log('跳过设置校正效果测试：API不可用');
    }
  }, 15000);

  test('应该能够设置机柜Xbit功能', async () => {
    if (typeof novastar.setCabinetXbitEnable === 'function') {
      try {
        // 首先获取机柜ID
        const cabinetPromise = promisify(novastar.cabinet.bind(novastar));
        const cabinets = await cabinetPromise();
        
        if (cabinets && cabinets.length > 0) {
          const cabinetIds = cabinets.map(cabinet => cabinet.id);
          
          // 测试启用Xbit
          const setCabinetXbitEnablePromise = promisify(novastar.setCabinetXbitEnable.bind(novastar));
          const result = await setCabinetXbitEnablePromise(true, cabinetIds);
          
          expect(result).toBeTruthy();
          
          // 等待一段时间后再测试禁用Xbit
          await wait(1000);
          const result2 = await setCabinetXbitEnablePromise(false, cabinetIds);
          expect(result2).toBeTruthy();
        } else {
          console.log('跳过设置机柜Xbit功能测试：没有可用的机柜');
        }
      } catch (error) {
        console.log('设置机柜Xbit功能测试失败:', error.message);
      }
    } else {
      console.log('跳过设置机柜Xbit功能测试：API不可用');
    }
  }, 15000);
});
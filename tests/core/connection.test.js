/**
 * NovaStar COEX API 连接相关测试
 */

const { createNovastarInstance, promisify, wait } = require('../utils/test-helpers');

describe('连接功能测试', () => {
  let novastar;

  beforeEach(() => {
    novastar = createNovastarInstance();
  });

  test('应该能够创建多个实例并连接到不同的处理器', () => {
    const novastar1 = createNovastarInstance({ port: 8001 });
    const novastar2 = createNovastarInstance({ port: 8001 });
    
    expect(novastar1).toBeDefined();
    expect(novastar2).toBeDefined();
    expect(novastar1).not.toBe(novastar2);
  });

  test('应该能够获取设备摘要信息', async () => {
    const summaryPromise = promisify(novastar.summary.bind(novastar));
    const result = await summaryPromise();
    
    expect(result).toBeTruthy();
    expect(result.deviceName).toBeDefined();
    expect(result.deviceType).toBeDefined();
    expect(result.firmwareVersion).toBeDefined();
  }, 10000);

  test('连接到无效地址应该返回错误', async () => {
    const invalidNovastar = new (require('../../index'))('192.168.255.255', { port: 8001, debug: true });
    const summaryPromise = promisify(invalidNovastar.summary.bind(invalidNovastar));
    
    await expect(summaryPromise()).rejects.toThrow();
  }, 10000);

  test('应该能够处理并发请求', async () => {
    const promises = [
      promisify(novastar.screen.bind(novastar))(),
      promisify(novastar.cabinet.bind(novastar))(),
      promisify(novastar.summary.bind(novastar))()
    ];
    
    const results = await Promise.all(promises);
    
    expect(results.length).toBe(3);
    expect(results[0]).toBeTruthy(); // screen
    expect(results[1]).toBeTruthy(); // cabinet
    expect(results[2]).toBeTruthy(); // summary
  }, 15000);
});
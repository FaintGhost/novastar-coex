/**
 * NovaStar COEX API 测试辅助函数
 */

const Novastar = require('../../index');

// 测试配置
const config = {
  host: '127.0.0.1',
  port: 8001
};

/**
 * 创建Novastar实例
 * @param {Object} options - 配置选项
 * @returns {Novastar} Novastar实例
 */
function createNovastarInstance(options = {}) {
  const opts = { port: config.port, debug: false, ...options };
  return new Novastar(config.host, opts);
}

/**
 * 等待指定时间
 * @param {number} ms - 等待毫秒数
 * @returns {Promise} Promise对象
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 将回调风格的API转换为Promise风格
 * @param {Function} fn - 回调风格的函数
 * @param {...any} args - 函数参数
 * @returns {Promise} Promise对象
 */
function promisify(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (response, error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response);
    });
  });
}

/**
 * 创建模拟响应对象
 * @param {Object} data - 响应数据
 * @returns {Object} 模拟响应对象
 */
function createMockResponse(data) {
  return {
    data: {
      data: data,
      code: 0
    }
  };
}

/**
 * 创建模拟错误响应对象
 * @param {string} message - 错误消息
 * @returns {Object} 模拟错误响应对象
 */
function createMockErrorResponse(message) {
  return {
    data: {
      code: 1,
      message: message
    }
  };
}

module.exports = {
  config,
  createNovastarInstance,
  wait,
  promisify,
  createMockResponse,
  createMockErrorResponse
};
module.exports = {
  // 测试环境
  testEnvironment: 'node',
  
  // 测试文件匹配模式
  testMatch: ['**/tests/**/*.test.js'],
  
  // 覆盖率收集配置
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'api.js',
    'index.js',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  
  // 覆盖率报告格式
  coverageReporters: ['text', 'lcov', 'clover', 'json'],
  
  // 测试报告配置
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml'
    }]
  ],
  
  // 测试超时设置（毫秒）
  testTimeout: 10000,
  
  // 在每个测试文件执行前显示测试套件的名称
  verbose: true
};
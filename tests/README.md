# NovaStar COEX API 测试

此目录包含NovaStar COEX API的自动化测试。测试使用Jest框架实现，按功能模块组织。

## 测试结构

- `core/` - 核心功能测试
  - `api.test.js` - API基础功能测试
  - `connection.test.js` - 连接相关测试

- `display/` - 显示功能测试
  - `screen.test.js` - 屏幕相关功能测试
  - `cabinet.test.js` - 机柜相关功能测试
  - `brightness.test.js` - 亮度控制测试
  - `color.test.js` - 颜色和图像质量测试

- `input/` - 输入源测试
  - `sources.test.js` - 输入源管理测试
  - `presets.test.js` - 预设管理测试
  - `patterns.test.js` - 测试图案功能测试

- `utils/` - 测试工具和辅助函数
  - `test-helpers.js` - 测试辅助函数
  - `mock-server.js` - 模拟COEX服务器

## 运行测试

```bash
npm test            # 运行所有测试
npm test -- --watch # 监视模式运行测试
npm test -- --coverage # 生成测试覆盖率报告
```

## 测试覆盖率

测试覆盖率报告将生成在 `coverage/` 目录中。
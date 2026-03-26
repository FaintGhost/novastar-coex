# Novastar COEX API 实现任务

## 当前已实现 (已验证)

- ✅ screen - 获取屏幕信息
- ✅ screenbrightness - 设置屏幕亮度
- ✅ gamma - 设置屏幕伽马
- ✅ colortemperature - 设置屏幕色温
- ✅ displaymode - 显示模式 (blackout/normal/freeze)
- ✅ getPreset - 获取预置信息
- ✅ applyPreset - 应用预置
- ✅ cabinet - 获取所有机柜信息
- ✅ sources - 获取输入源列表
- ✅ monitor - 获取实时监控信息
- ✅ enable3DLut - 启用/禁用3D LUT
- ✅ getDisplayParams - 获取显示参数
- ✅ getDisplayState - 获取显示状态
- ✅ setMapping - 设置画布映射
- ✅ getScreenList - 获取屏幕列表
- ✅ setHdrMode - 设置HDR模式

## 待实现 API (按模块分类)

### Input 模块 (api/device.js)

- [ ] setInternalSource - 设置内部源信息
- [ ] setSendingCardTestPattern - 设置发送卡测试图案
- [ ] getInputSourceInfo - 获取输入源信息
- [ ] getInputData - 获取输入数据
- [ ] setRedShadow - 设置红色暗部
- [ ] setGreenShadow - 设置绿色暗部
- [ ] setBlueShadow - 设置蓝色暗部
- [ ] setRedHighlight - 设置红色亮部
- [ ] setGreenHighlight - 设置绿色亮部
- [ ] setBlueHighlight - 设置蓝色亮部
- [ ] resetColorAdjustment - 重置颜色调整
- [ ] setSaturation - 设置饱和度
- [ ] setContrast - 设置对比度
- [ ] setBlackLevel - 设置黑电平
- [ ] setHue - 设置色调
- [ ] setEdid - 设置EDID

### Screen > Image 模块 (api/screen.js)

- [ ] setCustomGamut - 设置自定义色域
- [ ] switchColorGamut - 切换色域
- [ ] setBrightnessLimitOnOff - 亮度限制开关
- [ ] setBrightnessLimitValue - 亮度限制值
- [ ] setCustomGamma - 设置自定义伽马

### Screen > Schedule 模块 (api/screen.js)

- [ ] getAllScheduleInfo - 获取所有计划信息
- [ ] setScheduleOnOff - 设置计划开关
- [ ] deleteBrightnessStrategy - 删除亮度策略

### Screen > Color Correction 模块 (api/screen.js)

- [ ] setColorCorrectionOnOff - 颜色校正开关
- [ ] setColorCorrectionBlackWhite - 黑白校正数据
- [ ] setColorCorrectionOtherColors - 其他颜色校正数据

### Screen > Layer 模块 (api/screen.js)

- [ ] switchLayerSource - 切换图层源

### Screen > Process > 3D LUT 模块 (api/screen.js)

- [ ] import3DLutFile - 导入3D LUT文件
- [ ] delete3DLutFile - 删除3D LUT文件
- [ ] set3DLutStrength - 设置3D LUT强度

### Screen > Preset 模块 (api/preset.js)

- [ ] modifyPreset - 修改预置

### Screen > Output 模块 (api/screen.js)

- [ ] enable3DEmitter - 启用3D发射器
- [ ] enable3D - 启用/禁用3D
- [ ] getScreenOutputData - 获取屏幕输出数据
- [ ] setMultimodeByScreens - 按屏幕设置多模式
- [ ] setOutputBitDepth - 设置输出位深度
- [ ] outputSyncSourceSwitching - 输出同步源切换

### Screen 其他模块

- [ ] getCabinetCount - 获取机柜数量
- [ ] getScreenProperties - 获取屏幕属性信息

### Device 模块 (api/device.js)

- [ ] setOutputAudio - 设置输出音频
- [ ] getAudioSettings - 获取音频设置
- [ ] controllerIdentify - 控制器标识
- [ ] getDeviceBackupStatus - 获取设备备份状态
- [ ] primaryBackupVerify - 主备验证
- [ ] exportLog - 导出日志
- [ ] setSystemTime - 设置系统时间
- [ ] setAutoTimeOnOff - 自动时间设置开关
- [ ] setTimeZone - 设置时区
- [ ] setControllerName - 设置控制器名称
- [ ] getSnmpStatus - 获取SNMP状态
- [ ] setSnmpOnOff - 设置SNMP开关
- [ ] getMultifunctionCardInfo - 获取多功能卡信息
- [ ] deviceIdentify - 设备标识
- [ ] getDeviceInfo - 获取设备信息

### Cabinet 模块 (api/cabinet.js - 新建)

- [ ] setNoDataSignal - 设置无数据信号
- [ ] setThermalCompensationOnOff - 热补偿开关
- [ ] setThermalCompensationIntensity - 热补偿强度
- [ ] setThermalCompensationMode - 热补偿模式
- [ ] setCabinetRgbBrightness - 设置机柜RGB亮度
- [ ] setCabinetBrightness - 设置机柜亮度
- [ ] adjustCabinetColorTemperature - 调整机柜色温
- [ ] setReceivingCardTestPattern - 设置接收卡测试图案
- [ ] enableCabinetMapping - 启用机柜映射
- [ ] setMultimodeByCabinets - 按机柜设置多模式
- [ ] moveCabinet - 移动机柜
- [ ] setCabinetRgbwBrightness - 设置机柜RGBW亮度

## 实现顺序建议

1. Input 模块 (基础输入功能)
2. Screen > Image (图像处理)
3. Screen > Schedule (计划任务)
4. Screen > Color Correction (色彩校正)
5. Screen > Layer (图层)
6. Screen > Process > 3D LUT (3D LUT处理)
7. Screen > Preset (预置扩展)
8. Screen > Output (输出)
9. Device (设备功能)
10. Cabinet (机柜控制)

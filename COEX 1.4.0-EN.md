---
title: COEX 1.4.0-EN
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.28"

---

# COEX 1.4.0-EN

COEX Series Interactive API

Base URLs:

# Authentication

# Contents/Input/Retrieve Input Information

## GET Retrieve Input Source List

GET /api/v1/device/input/sources

:::tip
Retrieve all input source information (source ID, groupId, type) of the device
:::

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "cardId": 0,
  "type": 0,
  "name": "string",
  "order": 0,
  "step": 0,
  "supportFrameRate": "string",
  "supportResolution": "string",
  "maxwidth": 0,
  "maxheight": 0,
  "minwidth": 0,
  "minheight": 0,
  "actualResolution": {
    "height": 0,
    "width": 0
  },
  "actualRefreshRate": 0,
  "bitDepth": 0,
  "colorSpace": "string",
  "dynamicRange": "string",
  "gamut": "string",
  "range": 0,
  "scanMode": 0,
  "inPhase": true,
  "defaultEDID": {
    "resolution": {
      "width": 0,
      "height": 0
    },
    "refreshRate": 0,
    "isCustom": true
  },
  "usable": true,
  "groupId": 0,
  "isSupportHDR": true,
  "isSupportMetaData": true,
  "isSupportEDID": true,
  "isSupportInputOverride": true,
  "isSupportColorAdjust": "string",
  "sourceChannel": 0,
  "metaData": {
    "minMasterDisplayLight": 0,
    "maxMasterDisplayLight": 0,
    "maxContentLight": 0,
    "maxFrameAvgLight": 0,
    "whitePointX": 0,
    "whitePointY": 0
  },
  "hDRParams": {
    "overrideHdrType": 0,
    "pqMode": 0,
    "pqMaxCllChecked": true,
    "pqMaxCll": 0,
    "realHdrType": 0
  },
  "isSupportHDRParams": true,
  "isSupportPQMaxCllChecked": true,
  "hdrList": [
    0
  ],
  "isEdidCustom": true,
  "sourceStatus": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» id|integer|true|none|Source ID|int|
|» cardId|integer|true|none|Card ID|int|
|» type|integer|true|none|Input interface type: HDMI, SDI, etc. [0: DVI, 1: DualDVI, 2: HDMI1.4, 3: HDMI 2.0, 4: DP 1.1, 5: DP 1.2, 6 DP 1.4, 7: 3G SDI, 8: 6G SDI, 9: 12G SDI, 10: PiP Video, 11: HDMI 1.2, 12: HDMI 2.1, 13: Internal Source]|Uint8|
|» name|string|true|none|Input source name|none|
|» order|integer|true|none|Source order (internal use only)|uint8|
|» step|integer|true|none|step (internal use only)|int|
|» supportFrameRate|string|true|none|All supported frame rates (internal use only)|none|
|» supportResolution|string|true|none|All supported resolutions (internal use only)|none|
|» maxwidth|integer|true|none|Maximum resolution width supported (internal use only)|int|
|» maxheight|integer|true|none|Maximum resolution height supported (internal use only)|int|
|» minwidth|integer|true|none|Minimum resolution width supported (internal use only)|int|
|» minheight|integer|true|none|Minimum resolution height supported (internal use only)|none|
|» actualResolution|object|true|none|The actual resolution|none|
|»» height|integer|true|none|Width|int|
|»» width|integer|true|none|Height|int|
|» actualRefreshRate|number|true|none|Actual frame rate|float|
|» bitDepth|integer|true|none|The input source bit depth|int|
|» colorSpace|string|true|none|The video format|0: RGB, 1: YCbCr 4:2:2, 2: YCbCr 4:4:4, 3: YCbCr 4:2:0|
|» dynamicRange|string|true|none|The dynamic range|none|
|» gamut|string|true|none|Color Gamut|none|
|» range|integer|true|none|0x00: limit, 0x01: full|int|
|» scanMode|integer|true|none|0x00: progressive scanning, 0x01: Interlace Scanning|int|
|» inPhase|boolean|true|none|Whether in phase (internal use only)|none|
|» defaultEDID|object|true|none|Default resolution|none|
|»» resolution|object|true|none|Resolution|none|
|»»» width|integer|true|none|Width|int32|
|»»» height|integer|true|none|Height|int32|
|»» refreshRate|number|true|none|Refresh rate|float|
|»» isCustom|boolean|true|none|Indicates whether the default EDID configuration is customized.|true: Customized, false: Default list item.|
|» usable|boolean|true|none|Connector usage status|none|
|» groupId|integer|true|none|Source group ID|uint8|
|» isSupportHDR|boolean|true|none|Whether HDR is supported|none|
|» isSupportMetaData|boolean|true|none|Whether metaData is supported|none|
|» isSupportEDID|boolean|true|none|Whether EDID settings are supported|none|
|» isSupportInputOverride|boolean|true|none|Whether InfoFrame Override is supported|none|
|» isSupportColorAdjust|string|true|none|Whether color adjustment is supported|none|
|» sourceChannel|integer|true|none|Source number (unique within the card, for input view, internal use only)|uint8|
|» metaData|object|true|none|MetaData (internal use only)|none|
|»» minMasterDisplayLight|number|true|none|Min Display Mastering Luminance|float|
|»» maxMasterDisplayLight|number|true|none|Max display mastering luminance|float|
|»» maxContentLight|number|true|none|Max content light level (MaxCLL)|float|
|»» maxFrameAvgLight|number|true|none|Max frame-average light level (MaxFLL)|float|
|»» whitePointX|number|true|none|Whitepoint coordinate X|float|
|»» whitePointY|number|true|none|Whitepoint coordinate Y|float|
|» hDRParams|object|true|none|HDRParams (internal use only)|none|
|»» overrideHdrType|integer|true|none|Current mode|int|
|»» pqMode|integer|true|none|PQ mode|int|
|»» pqMaxCllChecked|boolean|true|none|Whether MaxCLL override is enabled|none|
|»» pqMaxCll|integer|true|none|MaxCLL value|int|
|»» realHdrType|integer|true|none|Real mode|int|
|» isSupportHDRParams|boolean|true|none|Whether HDR10 parameters are supported|none|
|» isSupportPQMaxCllChecked|boolean|true|none|Whether HDR10 override is supported|none|
|» hdrList|[integer]|true|none|HDR list|none|
|»» hdr|integer|false|none|hdr|uint16|
|» isEdidCustom|boolean|true|none|Indicates whether it is customized EDID|true: Customized, false: Default list item.|
|» sourceStatus|integer|true|none|Source link status|0x00: Not inserted 0x01: Signal available|

## GET Retrieve Input Data

GET /api/v1/device/input

:::tip
Retrieve input source configuration (including internal sources, source EDID, etc.)
:::

> 返回示例

> 200 Response

```json
{
  "testPattern": {
    "mode": 0,
    "parameters": {
      "red": 0,
      "green": 0,
      "blue": 0,
      "gray": 0,
      "gridWidth": 0,
      "moveSpeed": 0,
      "gradientStretch": 0,
      "state": 0
    }
  },
  "InputPortConfig": {
    "logicId": 0,
    "modelId": 0,
    "hardwareID": "string",
    "cscParameter": {
      "PortID": 0,
      "HueValue": 0,
      "ContrastValue": 0,
      "SaturationValue": 0
    },
    "edidInfo": {
      "resolution": {
        "width": "string",
        "height": "string"
      },
      "refreshRate": "string",
      "isCustom": "string"
    },
    "isLimitToFull": true,
    "range": 0,
    "colorSpaceType": 0,
    "colorGamut": 0,
    "hdrParameter": {
      "overrideHdrType": 0,
      "pqMode": 0,
      "pqMaxCllChecked": true,
      "realHdrType": "string"
    },
    "blackLevelInfo": {
      "shadow": {},
      "highLight": {}
    },
    "capacity": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» testPattern|object|true|none|Test pattern (internal use only)|none|
|»» mode|integer|true|none|Mode|uint8|
|»» parameters|object|true|none|Parameter|none|
|»»» red|integer|true|none|Red|uint16|
|»»» green|integer|true|none|Green|uint16|
|»»» blue|integer|true|none|Blue|uint16|
|»»» gray|integer|true|none|Grayscale|uint16|
|»»» gridWidth|integer|true|none|Grid|uint8|
|»»» moveSpeed|integer|true|none|Moving speed|uint8|
|»»» gradientStretch|integer|true|none|Grid size|uint16|
|»»» state|integer|true|none|Internal source test pattern state [0: off, 1: on]|uint8|
|» InputPortConfig|object|false|none|Input source configuration|uint8|
|»» logicId|integer|true|none|Source logic ID|none|
|»» modelId|integer|true|none|Model ID of the source corresponding card (internal use only)|none|
|»» hardwareID|string|true|none|Source-corresponding hardware ID (internal use only)|none|
|»» cscParameter|object|true|none|Source's CSC parameters (internal use only)|none|
|»»» PortID|integer|true|none|Source logic ID|none|
|»»» HueValue|integer|true|none|Hue|none|
|»»» ContrastValue|integer|true|none|Contrast|none|
|»»» SaturationValue|integer|true|none|Saturation|none|
|»» edidInfo|object|true|none|EDID information|none|
|»»» resolution|object|true|none|Resolution|none|
|»»»» width|string|true|none|Width|none|
|»»»» height|string|true|none|Height|none|
|»»» refreshRate|string|true|none|Frame rate|none|
|»»» isCustom|string|true|none|Whether it is customized|none|
|»» isLimitToFull|boolean|true|none|Whether it is Limited to Full|none|
|»» range|integer|true|none|Quantization range|none|
|»» colorSpaceType|integer|true|none|Color space|none|
|»» colorGamut|integer|true|none|Color gamut|none|
|»» hdrParameter|object|true|none|HDR configuration|none|
|»»» overrideHdrType|integer|true|none|HDR mode|0: HDR10, 1: HLG, 2: SDR, 255: Auto|
|»»» pqMode|integer|true|none|PQ mode type|none|
|»»» pqMaxCllChecked|boolean|true|none| Whether the check box is enabled|none|
|»»» realHdrType|string|true|none|Real HDR mode|none|
|»» blackLevelInfo|object|true|none|blackLevelInfo parameters (internal use only)|none|
|»»» shadow|object¦null|true|none|Shadow|none|
|»»» highLight|object|true|none|Highlight|none|
|»» capacity|string|true|none|Current port capacity|none|

# Contents/Input/EDID

## PUT Set EDID

PUT /api/v1/device/input/{id}/edid

:::tip
Set the EDID of the source (resolution, frame rate)
:::

> Body 请求参数

```json
{
  "para": {
    "resolution": {
      "width": 0,
      "height": 0
    },
    "refreshRate": 0,
    "isCustom": true
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||uint16 type, API for retrieving source ID: /api/v1/device/input/sources, key name: id.|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» para|body|object| 是 | Parameter object|none|
|»» resolution|body|object| 是 | Resolution|none|
|»»» width|body|integer| 是 | Width|int32 type, API: /api/v1/device/input/sources, key name: supportResolution.|
|»»» height|body|integer| 是 | Height|int32 type, API: /api/v1/device/input/sources, key: supportResolution.|
|»» refreshRate|body|number| 是 | Refresh rate|float32 type, API: /api/v1/device/input/sources, key name: supportFrameRate.|
|»» isCustom|body|boolean| 是 | Indicates whether it is customized|true: Customized, false: list item. Default to list item.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Input/Color Adjustment

## PUT Set Saturation

PUT /api/v1/device/input/saturation

:::tip
Adjust the saturation of the input source
:::

> Body 请求参数

```json
{
  "inputIdList": [
    0
  ],
  "saturation": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» inputIdList|body|[integer]| 是 | Input source ID list|[]uint16 type, API: /api/v1/device/input/sources, key name: id.|
|» saturation|body|integer| 是 | Contrast|int32 type, range: 0 to 200|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Set Color Highlight

PUT /api/v1/device/input/highlight

:::tip
Adjust the color highlight of the input source
:::

> Body 请求参数

```json
{
  "inputIdList": [
    0
  ],
  "type": 0,
  "highLight": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» inputIdList|body|[integer]| 是 | Input source ID list|[]uint16 type, API: /api/v1/device/input/sources, key name: id.|
|» type|body|integer| 是 | Type|uint8 type, 0: red, 1: green, 2: blue, 3: white|
|» highLight|body|integer| 是 | Value|int32 type, range: 0 to 200|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Set Color Shadow

PUT /api/v1/device/input/shadow

:::tip
Adjust the color shadow of the input source
:::

> Body 请求参数

```json
{
  "inputIdList": [
    0
  ],
  "type": 0,
  "shadow": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» inputIdList|body|[integer]| 是 | Input source ID list|[]uint16 type, API: /api/v1/device/input/sources, key name: id.|
|» type|body|integer| 是 | Type |uint8 type, 0: red, 1: green, 2: blue, 3: white|
|» shadow|body|integer| 是 | Value|int32 type, range: 0 to 200|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Adjust Hue

PUT /api/v1/device/input/hue

:::tip
Adjust the input source hue
:::

> Body 请求参数

```json
{
  "inputIdList": [
    0
  ],
  "hue": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» inputIdList|body|[integer]| 是 | Input source ID list|[]uint16 type, API: /api/v1/device/input/sources, key name: id.|
|» hue|body|integer| 是 | Hue value|int32 type, range: -180 to 180|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Reset Color Adjustment

PUT /api/v1/device/input/reset

:::tip
Reset the color adjustment parameters of the input source
:::

> Body 请求参数

```json
{
  "inputIdList": [
    0
  ],
  "type": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» inputIdList|body|[integer]| 是 | Source ID|[]uint16 type, API: /api/v1/device/input/sources, key name: id.|
|» type|body|integer| 否 | Type|none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Input/Internal Source

## PUT Set Sending Card Test Pattern

PUT /api/v1/device/input/pattern/test

:::tip
Set test pattern for the sending card
:::

> Body 请求参数

```json
""
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» mode|body|integer| 是 | Mode|0: Pure color (the color is controlled by the red, green and blue component values below)|
|» parameters|body|object| 是 | Parameter|none|
|»» red|body|integer| 是 | Red component|none|
|»» green|body|integer| 是 | Green component|none|
|»» blue|body|integer| 是 | Blue component|none|
|»» gray|body|integer| 是 | Grayscale|Range: 0 to 255|
|»» gridWidth|body|integer| 是 | Spacing|Range: 8 to 255|
|»» moveSpeed|body|integer| 是 | Moving speed|Range: 0 to 100|
|»» gradientStretch|body|integer| 是 | Gradient stretch|Range: 1 to 20|
|»» state|body|integer| 是 | Status|Constant to 0|

#### 详细说明

**» mode**: 0: Pure color (the color is controlled by the red, green and blue component values below)
16: Horizontal stripes downward
17: Horizontal stripes to the right
18: Diagonal stripes from bottom-left to top-right
19: Diagonal stripes from top-left to bottom-right
20: Grid pattern from top-left to bottom-right
21: Grid pattern to the right
32: Red gradient from left to right
33: Green gradient from left to right
34: Blue gradient from left to right
35: Gray gradient from left to right
36: Red gradient from top to bottom
37: Green gradient from top to bottom
38: Blue gradient from top to bottom
39: Gray gradient from top to bottom
48: Lightning pattern

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Input/Set HDR Mode

## PUT Set HDR Mode

PUT /api/v1/device/input/{id}/hdrmode

:::tip
Modify the HDR mode of a specified source
:::

> Body 请求参数

```json
{
  "hdrMode": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||uint16 type, API for retrieving source ID: /api/v1/device/input/sources, key name: id.|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» hdrMode|body|integer| 是 | Mode|uint8 type, 0: HDR10, 1: HLG, 2: SDR, 255: auto. Default to auto|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen

## GET Retrieve Screen Information

GET /api/v1/screen

:::tip
Retrieve all basic information of screens (screen ID, screen name, etc.), cabinet information, canvas information, layer information, etc.
:::

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|isNeedCabinetInfo|query|string| 否 ||If 1 is passed, the canvas information in the returned screen data does not include the cabinet and cabinet group data.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "screens": [
      {
        "screenID": "string",
        "screenName": "string",
        "createTime": "string",
        "workingMode": 0,
        "lowLatency": true,
        "layoutMode": 0,
        "screenIndex": 0,
        "screenGroupID": "string",
        "ordinal": 0,
        "position": {
          "x": 0,
          "y": 0
        },
        "canvases": [
          {
            "canvasID": null,
            "outputCardId": null,
            "canvasSerialNum": null,
            "ordinal": null,
            "size": null,
            "isCustomSize": null,
            "position": null,
            "rectSize": null,
            "cabinets": null,
            "groups": null,
            "maxFrameRate": null,
            "layoutLines": null,
            "zorder": null,
            "frequencyPhaseStatus": null
          }
        ],
        "layersInWorkingMode": [
          {
            "workingMode": null,
            "layerLayoutMode": null,
            "layers": null
          }
        ],
        "masterFrameRate": 0,
        "pixToPixMode": 0
      }
    ],
    "screenGroups": [
      {
        "screenGroupID": "string",
        "name": "string",
        "ordinal": 0
      }
    ]
  },
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none|Error code|none|
|» data|object|true|none|Return Data|none|
|»» screens|[object]|true|none|Screen information|none|
|»»» screenID|string|true|none|Screen ID|none|
|»»» screenName|string|true|none|Screen name (internal use only)|none|
|»»» createTime|string|true|none|Create time (internal use only)|none|
|»»» workingMode|number|true|none|Working mode|0: send-only controller, 1: all-in-one controller|
|»»» lowLatency|boolean|true|none|Low latency enable|none|
|»»» layoutMode|number|true|none|Layout|0: free layout, 1: 1x1 layout, 2: 2x1 layout, 3: 1x2 layout, 4: 1x3 layout, 5: 3x1 layout, 6: 1x4 layout, 7: 4x1 layout, 8: 2x2 layout|
|»»» screenIndex|number|true|none|Screen number|none|
|»»» screenGroupID|string|true|none|Screen group ID of the screen|none|
|»»» ordinal|integer|true|none|Screen order (internal use only)|none|
|»»» position|object|true|none|Screen position (internal use only)|none|
|»»»» x|number|true|none||none|
|»»»» y|number|true|none||none|
|»»» canvases|[object]|true|none|Canvas Information|none|
|»»»» canvasID|number|true|none|Canvas ID|none|
|»»»» outputCardId|number|true|none|Output card ID|none|
|»»»» canvasSerialNum|number|true|none|Canvas number (internal use only)|none|
|»»»» ordinal|integer|true|none|Canvas order (internal use only)|none|
|»»»» size|object|true|none|Canvas size (internal use only)|none|
|»»»»» width|number|true|none|Width|none|
|»»»»» height|number|true|none|Height|none|
|»»»» isCustomSize|boolean|true|none|Indicates whether it is customized size|none|
|»»»» position|object|true|none|Canvas position|none|
|»»»»» x|number|true|none|x-coordinate|none|
|»»»»» y|number|true|none|y-coordinate|none|
|»»»» rectSize|object|true|none|Canvas circumscribed rectangle size|none|
|»»»»» width|number|true|none||none|
|»»»»» height|number|true|none||none|
|»»»» cabinets|[object]|true|none|Cabinet information|none|
|»»»»» cabinetID|number|true|none|Cabinet ID|none|
|»»»»» connectID|number|true|none|Connect ID|none|
|»»»»» outputID|number|true|none|Output pot ID|none|
|»»»»» position|object|true|none|Cabinet Location|Relative to the canvas's (0, 0) point|
|»»»»»» x|number|true|none||none|
|»»»»»» y|number|true|none||none|
|»»»»» size|object|true|none|Cabinet size|none|
|»»»»»» width|number|true|none||none|
|»»»»»» height|number|true|none||none|
|»»»»» angle|number|true|none|Angle of rotation|none|
|»»»»» lockStatus|boolean|true|none|Lock type|none|
|»»»» groups|[object]|true|none|Cabinet group information|none|
|»»»»» groupID|string|true|none|Cabinet group ID|none|
|»»»»» groupName|string|true|none|Cabinet group name|none|
|»»»»» groupColor|object|true|none|Group color|none|
|»»»»»» r|number|true|none|Red component|none|
|»»»»»» g|number|true|none|Green component|none|
|»»»»»» b|number|true|none|Blue component|none|
|»»»»» cabinetIDs|[number]|true|none|Cabinet IDs of the cabinet group|none|
|»»»»» angle|number|true|none|Angle of rotation|none|
|»»»» maxFrameRate|number|true|none|Max frame rate|none|
|»»»» layoutLines|[string]|true|none|Layout divider|none|
|»»»» zorder|number|true|none|Canvas Z order|none|
|»»»» frequencyPhaseStatus|number|true|none|Whether In-phase and same-frequency|0: In-phase and same-frequency, 1: Out-of-phase and not same-frequency|
|»»» layersInWorkingMode|[object]|true|none|Layers of the working mode|none|
|»»»» workingMode|number|true|none|Working mode|none|
|»»»» layerLayoutMode|number|true|none|Layer layout|none|
|»»»» layers|[object]|true|none|Layer information|none|
|»»»»» id|number|true|none|Layer ID|none|
|»»»»» layerIndex|number|true|none|Layer number|none|
|»»»»» source|number|true|none|Source group ID|none|
|»»»»» position|object|true|none|Layer position|none|
|»»»»»» x|number|true|none||none|
|»»»»»» y|number|true|none||none|
|»»»»» zOrder|number|true|none|Layer Z order|none|
|»»»»» lock|boolean|true|none|Locked or not|none|
|»»»»» border|object|true|none|Layer border|none|
|»»»»»» enable|boolean|true|none|Opened or not|none|
|»»»»»» width|number|true|none|Width|none|
|»»»»»» color|object|true|none|Color|none|
|»»»»»»» r|number|true|none||none|
|»»»»»»» g|number|true|none||none|
|»»»»»»» b|number|true|none||none|
|»»»»» cut|object|true|none|Layer cropping|none|
|»»»»»» enable|boolean|true|none|Enable|none|
|»»»»»» rect|object|true|none||none|
|»»»»»»» x|number|true|none||none|
|»»»»»»» y|number|true|none||none|
|»»»»»»» width|number|true|none||none|
|»»»»»»» height|number|true|none||none|
|»»»»» scaler|object|true|none|Size|none|
|»»»»»» width|number|true|none||none|
|»»»»»» height|number|true|none||none|
|»»»»» followState|boolean|true|none|Follow state|none|
|»»»»» layerInCanvasId|number|true|none||none|
|»»» masterFrameRate|number|true|none|Screen max frame rate|none|
|»»» pixToPixMode|integer|true|none|Pixel to pixel|0: not pixel to pixel, 1: pixel to pixel|
|»» screenGroups|[object]|true|none|Screen group information|none|
|»»» screenGroupID|string|true|none|Screen group ID|none|
|»»» name|string|true|none|Screen group name|none|
|»»» ordinal|integer|true|none|Order|none|
|» message|string|true|none||none|

## GET Retrieve Screen Properties Information

GET /api/v1/screen/base/info

:::tip
Retrieve screen related properties
:::

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "characteristic": 0,
    "screenImageQualityInfo": [
      {
        "screenId": "string",
        "version": {
          "version": 0,
          "functionList": {}
        }
      }
    ],
    "multiModeInfo": [
      {
        "screenID": "string",
        "multiModeParam": {
          "currentCfgParam": {},
          "currentModeId": 0,
          "modeInfo": [
            null
          ]
        }
      }
    ]
  },
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|false|none|Error code|none|
|» data|object|false|none|Data|none|
|»» characteristic|number|false|none|Whether the screen has been corrected|none|
|»» screenImageQualityInfo|[object]|false|none|Image booster information|none|
|»»» screenId|string|false|none|Screen ID|none|
|»»» version|object|false|none|Version Information|none|
|»»»» version|number|false|none|Version number|none|
|»»»» functionList|object|false|none|Functions|none|
|»»»»» isEDE|boolean|false|none|Whether EDE is supported|none|
|»»»»» isABL|boolean|false|none|Whether ABL is supported|none|
|»»»»» IsItmo|boolean|false|none|Whether Itmo is supported|none|
|»»»»» isXBit|boolean|false|none|Whether Xbit is supported|none|
|»»»»» is18Bit|boolean|false|none|Whether 18bit is supported|none|
|»»»»» isColorSpace|boolean|false|none|Whether color space management is supported|none|
|»»»»» isGrayScale|boolean|false|none|Whether precise grayscale is supported|none|
|»»»»» isMagicGray|boolean|false|none|Whether magic gray is supported|none|
|»» multiModeInfo|[object]|false|none|Multi-mode information|none|
|»»» screenID|string|false|none|Screen ID|none|
|»»» multiModeParam|object|false|none|Multi-mode parameters|none|
|»»»» currentCfgParam|object|false|none|Parameters of the cabinet file in use|none|
|»»»»» manufactureName|string|false|none|Manufacturer|none|
|»»»»» cabinetName|string|false|none|Cabinet name|none|
|»»»»» cardModel|string|false|none|Card model|none|
|»»»»» status|string|false|none|Status|none|
|»»»»» version|string|false|none|Version|none|
|»»»»» issue|number|false|none|Revision number|none|
|»»»» currentModeId|number|false|none|Current mode ID|none|
|»»»» modeInfo|[object]|false|none|Mode list|none|
|»»»»» modeId|number|true|none|Mode ID|none|
|»»»»» modeName|string|true|none|Mode name|none|
|» message|string|false|none||none|

## GET Retrieve the Number of Cabinets of the Screen

GET /api/v1/screen/cabinet/count

:::tip
Retrieve the number of online cabinets of each screen
:::

> 返回示例

> 200 Response

```json
{
  "list": {
    "screenId": "string",
    "cabinetCount": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» list|object|true|none||none|
|»» screenId|string|true|none||Screen ID|
|»» cabinetCount|number|true|none||Number of cabinets|

# Contents/Screen/Image booster

## PUT Set Screen Color Temperature

PUT /api/v1/screen/colortemperature

:::tip
Adjust screen color temperature
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "colorTemperature": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» colorTemperature|body|integer| 是 | Color temperature value|uint32 type, range: 1,700 to 15,000|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT Set Screen Brightness

PUT /api/v1/screen/brightness

:::tip
Set the brightness level for all cabinets of the screen
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "screen"
  ],
  "brightness": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» brightness|body|number| 是 | Brightness percentage|float32 type, range: 0 to 1|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Set Screen Gamma

PUT /api/v1/screen/gamma

:::tip
Adjust screen gamma
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "screen"
  ],
  "gamma": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenIdList|body|[string]| 是 | Screen ID list |[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» gamma|body|number| 否 | Gamma value|float32 type, range: 1 to 4|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET Retrieve Screen Display Effect Parameters

GET /api/v1/screen/displayparams

:::tip
Retrieve the overall brightness, color temperature, gamma of each screen
:::

> 返回示例

> 200 Response

```json
{
  "list": {
    "screenId": 0,
    "brightness": 0,
    "colorTemperature": 0,
    "gamma": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» list|object|true|none||none|
|»» screenId|integer|true|none|Screen ID|string Screen ID|
|»» brightness|number|true|none|Brightness|float32 brightness|
|»» colorTemperature|integer|true|none|Color temperature|uint32 color temperature|
|»» gamma|number|false|none|Gamma|float32 gamma|

## POST Set Custom Gamma for the Screen

POST /api/v1/screen/gamma/update

:::tip
Customize the gamma table on a screen-basis
:::

> Body 请求参数

```json
[
  {
    "screenId": "{xxxxx}",
    "gammaTable": [
      0,
      1,
      2,
      3
    ]
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|array[object]| 否 ||none|

> 返回示例

```json
{
  "code": 0,
  "data": "",
  "message": "Success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||The return code, refer to "Error Codes."|
|» data|string|true|none||Return Data|
|» message|string|true|none||Information corresponding to the code.|

# Contents/Screen/Image booster/Color Gamut

## PUT Set Custom Gamut on a Screen-Basis

PUT /api/v1/screen/output/customgamut

:::tip
Adjust the screen custom gamut
:::

> Body 请求参数

```json
[
  {
    "screenId": "string",
    "colorGamutInfo": {
      "targetGamut": {
        "name": "string",
        "gamut": {
          "rLxy": {},
          "gLxy": {},
          "bLxy": {},
          "wLxy": {}
        }
      },
      "colorTemperature": 0
    }
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|array[object]| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Switch Color Gamut

PUT /api/v1/screen/output/gamut

> Body 请求参数

```json
{
  "name": "string",
  "screenIdList": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» name|body|string| 是 | Gamut name|API: api/v1/screen/output, key name: name in gamutList.|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Layer

## PUT Switch Source for Layer

PUT /api/v1/screen/layer/input

:::tip
Switch source
:::

> Body 请求参数

```json
{
  "layers": [
    {
      "id": "0",
      "source": "0"
    }
  ],
  "screenID": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» layers|body|[object]| 是 | Layer data|none|
|»» id|body|integer| 是 | Layer ID|uint8 type, API: /api/v1/screen, key name: id (You need to first retrieve the current working mode. API: /api/v1/screen, key name: workingMode. Next, retrieve the layer ID based on the working mode.)|
|»» source|body|integer| 是 | Source group ID|uint8 type, API for retrieving: /api/v1/device/input/sources, key name: groupId.|
|» screenID|body|string| 是 | Screen ID|API: /api/v1/screen, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Processing/3D LUT

## DELETE Delete 3D LUT File

DELETE /api/v1/screen/processing/threedlut/file

:::tip
Delete the imported 3D LUT file
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» screenIdList|body|[string]| 否 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Import 3D LUT File

PUT /api/v1/screen/processing/threedlut/file

:::tip
Import 3D LUT file
:::

> Body 请求参数

```yaml
text: ""
file:
  - ""
screenIdList: ""

```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» text|body|string| 是 ||3D LUT file name|
|» file|body|[string]| 是 ||A 3D LUT file has the file extension .cube, which contains decimal values in floating point format. Example 3D LUT file:**|
|» screenIdList|body|string| 否 ||Screen ID list. API for retrieving screen ID: /api/v1/screen, key name: screenID.|

#### 详细说明

**» file**: A 3D LUT file has the file extension .cube, which contains decimal values in floating point format. Example 3D LUT file:**

\# 3D LUT 2024320171(Fabulux).cube
\# 03/20/2024 05:07:44 PM
\# CalMAN 5 (23.3.13.577, 03/20/2024 05:07:44 PM, CubeGenerator, 16)
\# LUT_ORDER BGR 

LUT_3D_SIZE 17

DOMAIN_MIN 0.0 0.0 0.0
DOMAIN_MAX 1.0 1.0 1.0

0.0000 0.0000 0.0000
0.0731 0.0000 0.0000
0.1438 0.0011 0.0000
0.2123 0.0034 0.0000
0.2831 0.0057 0.0000
0.3539 0.0091 0.0000
...

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Set 3D LUT Strength

PUT /api/v1/screen/processing/threedlut/strength

:::tip
Set the imported 3D LUT coefficient strength
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "strength": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» screenIdList|body|[string]| 否 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» strength|body|number| 否 | Strength|int32 type, range: 0 to 100|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Enable 3D LUT

PUT /api/v1/screen/processing/threedlut/enable

:::tip
Enable or disable 3D LUT
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» screenIdList|body|[string]| 否 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» enable|body|boolean| 否 | Enabled or not|true: enabled, false: disabled.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Canvas

## PUT Canvas Mapping

PUT /api/v1/screen/output/canvas/mapping

:::tip
Set canvas mapping
:::

> Body 请求参数

```json
{
  "canvasIDs": [
    0
  ],
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» canvasIDs|body|[number]| 是 | Canvas ID list|[]uint16 type, API for retrieving canvas ID: /api/v1/screen, key name: canvasID.|
|» enable|body|boolean| 是 | Enable|true: on, false: off. Default to off.|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# Contents/Screen/Preset

## GET Retrieve Preset Information

GET /api/v1/preset

:::tip
Retrieve all preset information
:::

> 返回示例

> 200 Response

```json
{
  "screenPresetList": [
    {
      "presetList": [
        {
          "sequenceNumber": 0,
          "name": "string",
          "state": true,
          "sourceData": true,
          "processingData": true,
          "outputData": true,
          "screenData": true,
          "effectSwitch": 0
        }
      ],
      "screenID": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» screenPresetList|[object]|false|none|Preset information of all screens.|none|
|»» presetList|[object]|true|none|Preset index of the screen|none|
|»»» sequenceNumber|integer|true|none|Preset number|none|
|»»» name|string|true|none|Name|none|
|»»» state|boolean|true|none|Selected or not|none|
|»»» sourceData|boolean|true|none|Source selected or not|none|
|»»» processingData|boolean|true|none|"Processing" selected or not|none|
|»»» outputData|boolean|true|none|Output selected or not|none|
|»»» screenData|boolean|true|none|Screen selected or not|none|
|»»» effectSwitch|integer|true|none|Gradient enabled or not|none|
|»» screenID|string|true|none|Screen ID|none|

## POST Apply Preset

POST /api/v1/preset/current/update

:::tip
Apply a user-defined preset
:::

> Body 请求参数

```json
{
  "sequenceNumber": 0,
  "screenID": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» sequenceNumber|body|integer| 是 | Preset number|int16 type, API: /api/v1/preset, key name: sequenceNumber.|
|» screenID|body|string| 是 | Screen ID|API: /api/v1/preset, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## POST Modify Preset

POST /api/v1/preset/update

:::tip
Modify preset name and whether to include input, output, screen topology data
:::

> Body 请求参数

```json
{
  "screenID": "string",
  "preset": {
    "sequenceNumber": 0,
    "name": "string",
    "sourceData": true,
    "processingData": true,
    "outputData": true,
    "screenData": true,
    "effectSwitch": 0
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» screenID|body|string| 是 | Screen ID|API: /api/v1/preset, key name: screenID.|
|» preset|body|object| 是 ||none|
|»» sequenceNumber|body|integer| 是 | Preset number|int16 type, API: /api/v1/preset, key name: sequenceNumber.|
|»» name|body|string| 是 | Preset Name|none|
|»» sourceData|body|boolean| 是 | Whether to modify the input source-related information for the preset|true: The preset includes input source-related parameters, false: Not included|
|»» processingData|body|boolean| 是 | Whether to modify the processing-related information for the preset|true: The preset includes processing-related parameters, false: Not included|
|»» outputData|body|boolean| 是 | Whether to modify the output-related information for the preset|true: The preset includes output-related parameters, false: Not included|
|»» screenData|body|boolean| 是 | Whether to modify the screen-related information for the preset|true: The preset includes screen-related parameters (including layer parameters), false: Not included|
|»» effectSwitch|body|integer| 是 | Transition through black enabled or not |0: Transition through black not enabled, 1: Transition through black enabled. Default to not enabled.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Schedule

## GET Retrieve All Schedule Information of the Screens

GET /api/v1/screen/schedule/all

:::tip
Retrieve all schedule information of the screens
:::

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": [
    {
      "screenId": "string",
      "enable": true,
      "brightnessMappingMode": 0,
      "relatedToMultiMode": true,
      "brightnessMappingList": [
        {
          "id": "string",
          "ambientBrightness": 0,
          "screenBrightnessRatio": 0,
          "screenBrightnessNit": 0,
          "modeName": "string"
        }
      ],
      "brightnessStrategyList": [
        {
          "strategyId": "string",
          "strategyType": 0,
          "startTime": "string",
          "endTime": "string",
          "adjustType": 0,
          "brightnessRatio": 0,
          "brightnessNit": 0,
          "repeatEnable": true,
          "repeatList": [
            0
          ],
          "repeatEndTime": "string"
        }
      ],
      "presetStrategyList": [
        {
          "strategyId": "string",
          "strategyType": 0,
          "startTime": "string",
          "presetNum": 0,
          "presetName": "string",
          "repeatEnable": true,
          "repeatList": [
            0
          ],
          "repeatEndTime": "string"
        }
      ],
      "powerStrategyList": [
        "string"
      ],
      "peripheralList": [
        {
          "mfCardId": 0,
          "peripheralIndex": 0,
          "peripheralType": 0
        }
      ],
      "powerInfoList": [
        "string"
      ]
    }
  ],
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|false|none||none|
|» data|[object]|false|none||none|
|»» screenId|string|false|none|Screen ID|none|
|»» enable|boolean|false|none|Schedule enabled or not|none|
|»» brightnessMappingMode|number|false|none|Brightness mapping mode|0: specified brightness, 1: ambient brightness, 2: brightness when light sensor fails|
|»» relatedToMultiMode|boolean|false|none|Whether to associate multi-mode|none|
|»» brightnessMappingList|[object]|false|none|Brightness mapping table|none|
|»»» id|string|true|none||none|
|»»» ambientBrightness|number|true|none|Ambient brightness|none|
|»»» screenBrightnessRatio|number|true|none|Screen brightness ratio|none|
|»»» screenBrightnessNit|number|true|none|Brightness (nits) value|none|
|»»» modeName|string|true|none|Mode name|none|
|»» brightnessStrategyList|[object]|false|none|Brightness policy|none|
|»»» strategyId|string|true|none|Policy unique ID|none|
|»»» strategyType|number|true|none|Policy type|0: all policies, 1: brightness policy, 2: preset policy, 3: power supply policy|
|»»» startTime|string|true|none|Start time|none|
|»»» endTime|string|true|none|End time|none|
|»»» adjustType|number|true|none|Brightness mode|0: specified brightness, 1: ambient brightness|
|»»» brightnessRatio|number|true|none|Brightness ratio|none|
|»»» brightnessNit|number|true|none|Brightness (nit)|none|
|»»» repeatEnable|boolean|true|none||none|
|»»» repeatList|[number]|true|none||none|
|»»» repeatEndTime|string|true|none||none|
|»» presetStrategyList|[object]|false|none|Preset policy|none|
|»»» strategyId|string|true|none||none|
|»»» strategyType|number|true|none||none|
|»»» startTime|string|true|none||none|
|»»» presetNum|number|true|none||none|
|»»» presetName|string|true|none||none|
|»»» repeatEnable|boolean|true|none||none|
|»»» repeatList|[number]|true|none||none|
|»»» repeatEndTime|string|true|none||none|
|»» powerStrategyList|[string]|false|none|Power supply policy|none|
|»» peripheralList|[object]|false|none|Multi-function card peripheral information configured for the screen|none|
|»»» mfCardId|number|true|none||none|
|»»» peripheralIndex|number|true|none||none|
|»»» peripheralType|number|true|none||none|
|»» powerInfoList|[string]|false|none| Multi-function card power channel configured for this screen|none|
|» message|string|false|none||none|

## POST Set Schedule On\Off

POST /api/v1/screen/schedule/enable/update

:::tip
Turn on or off the schedule
:::

> Body 请求参数

```json
{
  "screenId": "25",
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenId|body|string| 是 | Screen ID|API: /screen/schedule/all, key name: screenId.|
|» enable|body|boolean| 是 | On or off|true: on, false: off. Default to off.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## POST Delete Brightness Schedule

POST /api/v1/screen/schedule/brightness-strategy/delete

:::tip
Delete the created brightness policy
:::

> Body 请求参数

```json
{
  "screenId": "string",
  "strategyIdList": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenId|body|string| 是 | Screen ID|API: /api/v1/screen/schedule/all, key name: screenId.|
|» strategyIdList|body|[string]| 是 | Policy ID list|[]string type, API: /api/v1/screen/schedule/all, key name: strategyId in brightnessStrategyList.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Output

## GET Retrieve Display Status

GET /api/v1/screen/output/display/state

:::tip
Retrieve the display status of the canvas (canvas position, and whether the blackout and freeze screen functions are enabled)
:::

> 返回示例

> 200 Response

```json
{
  "mappingState": [
    {
      "canvasID": 0,
      "enable": true
    }
  ],
  "displayState": [
    {
      "canvasID": 0,
      "displayMode": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» mappingState|[object]|false|none|Mapping status|none|
|»» canvasID|number|true|none|Canvas ID|none|
|»» enable|boolean|true|none|Enable|none|
|» displayState|[object]|false|none|Display status|none|
|»» canvasID|number|false|none|Canvas ID|none|
|»» displayMode|number|false|none|Display mode|0: normal display, 1: frozen, 2: blackout, with the default being the normal display.|

## PUT Set Output Bit Depth

PUT /api/v1/screen/output/bitdepth

:::tip
Set output bit depth
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "bitDepth": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» bitDepth|body|integer| 是 | Bit Depth|int type, 0: 8bit, 1: 10bit, 2: 12bit, 255: follow input source. Default to follow input source|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# Contents/Screen/Output/3D function

## PUT Enable/Disable 3D

PUT /api/v1/screen/output/threed/enable

:::tip
Enable or disable 3D
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|
|» enable|body|boolean| 是 | 3D on/off|true: on, false: off. Default to off.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Output/3D function/3D Emitter

## PUT Enable 3D Emitter

PUT /screen/output/threed/emitter

:::tip
Enable or disable 3D emitter
:::

> Body 请求参数

```json
{
  "Enable": true,
  "screenIdList": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» Enable|body|boolean| 是 | Enable|true: on, false: off. Default to off.|
|» screenIdList|body|[string]| 是 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||Code|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Output/Retrieve Output Parameters

## GET Retrieve Screen Output Data

GET /api/v1/screen/output

:::Tip
Retrieve the screen output data (3D on/off, frame multiplication, sync, etc.)
:::

> 返回示例

> 200 Response

```json
{
  "lowDelay": true,
  "additionalFrameDelay": 0,
  "outputBitDepth": {
    "bitDepth": 0,
    "currentBitDepth": 0
  },
  "threeD": {
    "enable": true,
    "sourceMode": 0,
    "eyePriority": 0,
    "rightEyeOffset": {
      "x": 0,
      "y": 0
    },
    "threeDFrame": 0,
    "threeDFrameList": [
      "string"
    ]
  },
  "currentFrameRate": 0,
  "curtainMaxFrameRate": 0,
  "phaseList": [
    0
  ],
  "curPhase": {
    "type": 0,
    "value": 0,
    "absoluteValue": {
      "phaseline": 0,
      "phasepixel": 0,
      "isValid": true
    }
  },
  "genlock": {
    "masterLayerGroupId": 0,
    "selectedType": 0,
    "syncframeratelist": [
      {
        "selectedType": 0,
        "frameratevalue": 0
      }
    ]
  },
  "frameRemapingData": {
    "frameType": 0,
    "frameSwitch": true,
    "frameRemaping": [
      {
        "index": 0,
        "offsetX": 0,
        "offsetY": 0,
        "rData": 0,
        "gData": 0,
        "bData": 0,
        "customColourEn": true
      }
    ]
  },
  "hDREOTFParams": {
    "overridePeakLum": true,
    "peakLuminance": 0,
    "highLightRatio": 0,
    "darkRatio": 0,
    "sceRatio": 0
  },
  "screenid": "string",
  "gamutList": {
    "currentGamutName": "string",
    "colorGamutInfoList": {
      "fromInputStatus": true,
      "isCustomGamut": true,
      "colorGamutInfo": {
        "colorTemperature": 0,
        "targetGamut": {
          "name": null,
          "gamut": null
        }
      }
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» lowDelay|boolean|true|none|Low latency enable|none|
|» additionalFrameDelay|integer|true|none|Additional frame latency|uint8|
|» outputBitDepth|object|true|none|Bit Depth|none|
|»» bitDepth|integer|true|none|Output bit depth|uint8|
|»» currentBitDepth|integer|true|none|Current receiving card bit depth|uint8|
|» threeD|object|true|none|3D|none|
|»» enable|boolean|true|none|3D on/off|none|
|»» sourceMode|integer|true|none|Mode (internal use only)|uint8|
|»» eyePriority|integer|true|none|Left or right eye (internal use only)|uint8|
|»» rightEyeOffset|object|true|none|Offset (internal use only)|none|
|»»» x|integer|true|none|x|int32|
|»»» y|integer|true|none|y|int32|
|»» threeDFrame|number|true|none|3D frame multiplication mode (internal use only)|none|
|»» threeDFrameList|[string]|true|none|3D frame multiplication list (internal use only)|none|
|» currentFrameRate|number|true|none|Frame rate (internal use only)|float|
|» curtainMaxFrameRate|number|true|none|Max frame rate supported by the canvas (internal use only)|float32|
|» phaseList|[number]|true|none|Phase offset list (internal use only)|float[]|
|»» float32|number|false|none|float32|none|
|» curPhase|object|true|none|Current phase offset (internal use only)|none|
|»» type|integer|true|none|Type|uint8|
|»» value|number|true|none|Value|float64|
|»» absoluteValue|object|true|none|Absolute value|none|
|»»» phaseline|integer|true|none|Row|none|
|»»» phasepixel|integer|true|none|Pixels|none|
|»»» isValid|boolean|true|none|Whether the data is valid|none|
|» genlock|object|true|none|Genlock (internal use only)|none|
|»» masterLayerGroupId|integer|true|none|The input source group ID of the main layer in all-in-one controller mode|uint8|
|»» selectedType|integer|true|none|Current output mode|uint8|
|»» syncframeratelist|[object]|true|none|Data|none|
|»»» selectedType|integer|true|none||uint8|
|»»» frameratevalue|number|true|none|Frame rate|float32|
|» frameRemapingData|object|true|none|Multiply (internal use only)|none|
|»» frameType|integer|true|none|Type|uint8|
|»» frameSwitch|boolean|true|none|On or off|boolean|
|»» frameRemaping|[object]|true|none||none|
|»»» Multiply|object|false|none|Multiply|none|
|»»»» index|integer|true|none|Index|uint8|
|»»»» offsetX|integer|true|none|Image overall horizontal offset x|int16|
|»»»» offsetY|integer|true|none|Image overall vertical offset y|int16|
|»»»» rData|integer|true|none|Red data|uint16|
|»»»» gData|integer|true|none|Green data|uint16|
|»»»» bData|integer|true|none|Blue data|uint16|
|»»»» customColourEn|boolean|true|none|Active source/Custom image|none|
|» hDREOTFParams|object|true|none|EOTF parameters (internal use only)|none|
|»» overridePeakLum|boolean|true|none|Whether to overwrite peak screen brightness|none|
|»» peakLuminance|integer|true|none|Peak Screen Brightness|int|
|»» highLightRatio|integer|true|none|Highlight protection ratio|int|
|»» darkRatio|integer|true|none|Low-grayscale protection ratio|int|
|»» sceRatio|integer|true|none|Ambient light ratio|int|
|» screenid|string|true|none|Screen ID|none|
|» gamutList|object|true|none|Gamut information|none|
|»» currentGamutName|string|true|none|Current gamut name|none|
|»» colorGamutInfoList|object|true|none|Gamut information list of the screen|[]object|
|»»» fromInputStatus|boolean|true|none|Whether to follow input|none|
|»»» isCustomGamut|boolean|true|none|Whether it is custom gamut|none|
|»»» colorGamutInfo|object|true|none|Gamut information|none|
|»»»» colorTemperature|number|true|none|Color temperature value|none|
|»»»» targetGamut|object|true|none|Gamut information|none|
|»»»»» name|string|true|none|Name|none|
|»»»»» gamut|object|true|none||none|
|»»»»»» rLxy|object|true|none|Red gamut information|none|
|»»»»»»» name|string|true|none|Name|none|
|»»»»»»» lum|number|true|none|Brightness|none|
|»»»»»»» cx|number|true|none|x-coordinate|none|
|»»»»»»» cy|number|true|none|y-coordinate|none|
|»»»»»» gLxy|object|true|none|Green gamut information|none|
|»»»»»»» name|string|true|none||none|
|»»»»»»» lum|number|true|none||none|
|»»»»»»» cx|number|true|none||none|
|»»»»»»» cy|number|true|none||none|
|»»»»»» bLxy|object|true|none|Blue gamut information|none|
|»»»»»»» name|string|true|none||none|
|»»»»»»» lum|number|true|none||none|
|»»»»»»» cx|number|true|none||none|
|»»»»»»» cy|number|true|none||none|
|»»»»»» wLxy|object|true|none|White gamut information|none|
|»»»»»»» name|string|true|none||none|
|»»»»»»» lum|number|true|none||none|
|»»»»»»» cx|number|true|none||none|
|»»»»»»» cy|number|true|none||none|

# Contents/Screen/Output/Display mode

## PUT Set Blackout/Freeze Screen

PUT /api/v1/screen/output/displaymode

:::tip
Set the freeze and black screen display mode for the sending card (on a screen basis)
:::

> Body 请求参数

```json
{
  "value": 0,
  "screenIdList": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» value|body|integer| 是 | Display mode|uint8 type, 0: normal display, 1: frozen, 2: blackout, with the default being the normal display.|
|» screenIdList|body|[string]| 是 | Screen ID list (empty list indicates all screens)|[]string type, API: /api/v1/screen, key name: screenID.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Screen/Output/Multi-Mode

## PUT Set Multi-mode by Screens

PUT /api/v1/screen/output/multimode

:::tip
Set multi-mode
:::

> Body 请求参数

```json
{
  "screenIdList": [
    "string"
  ],
  "modeId": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» screenIdList|body|[string]| 否 | Screen ID list|[]string type, API for retrieving screen ID: /api/v1/screen/base/info, key name: screenID in multiModeInfo.|
|» modeId|body|number| 否 | Mode ID|uint8 type, API: /api/v1/screen/base/info, key name: modeId in multiModeInfo.|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# Contents/Device

## PUT Set Blackout/Freeze Screen

PUT /api/v1/device/displaymode

:::tip
Control the display of the sending card, including functions such as blackout, freeze, and normal display (on a canvas basis)
:::

> Body 请求参数

```json
{
  "value": 0,
  "canvasIDs": [
    45
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» value|body|integer| 是 | Sending card display control|uint8 type.  0: normal display, 1: blackout,2: frozen, with the default being the normal display.|
|» canvasIDs|body|[number]| 是 | Canvas ID list |[]uint16 type, API for retrieving canvas ID: /api/v1/screen, key name: canvasID.|
|»» Canvas ID list|body|number| 否 | Canvas ID list |none|

> 返回示例

```json
{
  "code": 0,
  "data": null,
  "message": "Success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Device/Device Identify

## PUT Device Identify

PUT /api/v1/device/hw/mapping

:::tip
Identify devices
:::

> Body 请求参数

```json
{
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» enable|body|boolean| 是 | Whether to enable controller mapping|true: on, false: off. Default to off.|

> 返回示例

```json
{
  "code": 0,
  "data": null,
  "message": "Success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Device/Monitoring

## GET Retrieve Real-Time Monitoring Information

GET /api/v1/device/monitor/info

:::tip
Retrieve the monitoring information of the device, including the card temperature, voltage, fan speed, etc.
:::

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|isNeedCabinetInfo|query|string| 否 ||If 1 is passed, th returned monitoring data does not include the cabinet monitoring and cabinet uptime data.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "name": "string",
    "runtime": 0,
    "totalRuntime": 0,
    "backupStatus": 0,
    "mainBoardTemperature": {
      "value": 0,
      "status": 0
    },
    "mainBoardVoltage": {
      "value": 0,
      "status": 0
    },
    "fanInfos": [
      {
        "fanSpeed": 0,
        "fanType": 0,
        "status": 0
      }
    ],
    "voltageInfos": [
      {
        "voltage": null,
        "voltageType": null,
        "status": null
      }
    ],
    "temperatureInfos": [
      {
        "temperature": null,
        "temperatureType": null,
        "status": null
      }
    ],
    "cabinetPowerNumber": 0,
    "controllerPortMonitorInfos": [
      {
        "controllerPortID": 0,
        "status": 0
      }
    ],
    "cardMonitorInfo": [
      {
        "cardID": 0,
        "cardType": 0,
        "status": 0,
        "cardTemperatureInfos": [
          {
            "temperature": null,
            "temperatureType": null
          }
        ],
        "cardVoltageInfos": [
          {
            "voltage": null,
            "voltageType": null
          }
        ]
      }
    ],
    "screenSourceStatus": [
      {
        "portID": 0,
        "status": 0,
        "inputCardID": 0
      }
    ],
    "outputStatus": [
      {
        "outputID": 0,
        "type": 0,
        "status": 0,
        "outputCardID": 0
      }
    ],
    "cabinets": [
      {
        "CabinetID": 0,
        "rvCardID": 0,
        "outPutID": 0,
        "index": 0,
        "temperature": {
          "value": 0,
          "status": 0
        },
        "voltage": {
          "value": 0,
          "status": 0
        },
        "rvCards": [
          {
            "cabinetID": null,
            "rvCardID": null,
            "netPortIndex": null,
            "cabinetIndex": null,
            "runtime": null,
            "totalRuntime": null,
            "temperature": null,
            "voltage": null,
            "humidity": null,
            "errorBit": null,
            "backupStatus": null,
            "nextCabinetLinkStatus": null,
            "moduleInfos": null
          }
        ],
        "powerInfo": [
          {
            "number": null,
            "status": null
          }
        ]
      }
    ],
    "rvCardsRuntime": [
      {
        "cabinetID": 0,
        "rvCardID": 0,
        "runtime": null,
        "totalRuntime": null
      }
    ],
    "screenRunTime": 0
  },
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||none|
|»» name|string|false|none|Controller name|none|
|»» runtime|number|false|none|The uptime of the controller (second).|none|
|»» totalRuntime|number|false|none|The total uptime of the controller (second).|none|
|»» backupStatus|integer|true|none|Backup status|109: primary in use, backup standby, 110: primary in use, backup in use, 111: primary in use, backup failed, 112: primary failed, backup standby, 113: primary failed, backup in use, 114: primary failed, backup failed.|
|»» mainBoardTemperature|object|false|none|Mainboard temperature|none|
|»»» value|number|false|none|Value|none|
|»»» status|number|false|none|Status|0: normal, 1: alarm, 2: fault|
|»» mainBoardVoltage|object|false|none|Mainboard voltage|none|
|»»» value|number|false|none|Value|none|
|»»» status|number|false|none|Status|0: normal, 1: alarm, 2: fault|
|»» fanInfos|[object]|false|none|Fan information|none|
|»»» fanSpeed|number|true|none|Fan speed|none|
|»»» fanType|number|true|none|Fan type|0: chassis fan, 1: front panel left fan (facing forward), 2: front panel right fan (facing forward), 3: FPGA_A fan, 4: FPGA_B fan.|
|»»» status|number|true|none|Status|0: normal, 1: alarm, 2: fault|
|»» voltageInfos|[object]|false|none|Voltage information|none|
|»»» voltage|float32|true|none|Voltage value|none|
|»»» voltageType|uint8|true|none|Voltage type|0: ARM voltage, 1: FPGA_A voltage, 2: FPGA_B voltage|
|»»» status|uint8|true|none|Status|0: normal, 1: alarm, 2: fault|
|»» temperatureInfos|[object]|false|none|Temperature information|none|
|»»» temperature|float32|true|none|Temperature value|none|
|»»» temperatureType|uint8|true|none|Temperature type|0: ARM temperature, 1: FPGA_A temperature, 2: FPGA_B temperature|
|»»» status|uint8|true|none|Status|0: normal, 1: alarm, 2: fault|
|»» cabinetPowerNumber|number|true|none|Power supply quantity|none|
|»» controllerPortMonitorInfos|[object]|true|none|Control port information|none|
|»»» controllerPortID|integer|true|none|Control port No.|none|
|»»» status|integer|true|none|Control port status|0: normal, 1: alarm, 2: fault|
|»» cardMonitorInfo|[object]|true|none||none|
|»»» cardID|integer|true|none|Card ID|none|
|»»» cardType|integer|true|none|Card type|0: input card, 1: output card, 2: expansion card, 3: backplane.|
|»»» status|integer|true|none|Card status|0: normal, 1: alarm, 2: fault|
|»»» cardTemperatureInfos|[object]|true|none|Card temperature information|none|
|»»»» temperature|number|true|none|Temperature value|none|
|»»»» temperatureType|integer|true|none|Temperature type|0: ARM temperature, 1: FPGA_A temperature, 2: FPGA_B temperature|
|»»» cardVoltageInfos|[object]|true|none||none|
|»»»» voltage|number|true|none|Voltage value|none|
|»»»» voltageType|integer|true|none|Voltage type|0: ARM voltage, 1: FPGA_A voltage, 2: FPGA_B voltage|
|»» screenSourceStatus|[object]|false|none|Active source status|none|
|»»» portID|number|false|none|Source ID|none|
|»»» status|number|false|none|Status|none|
|»»» inputCardID|integer|false|none|Input card ID|none|
|»» outputStatus|[object]|false|none|Output port status|none|
|»»» outputID|number|true|none|Output ID|none|
|»»» type|number|true|none|Output port type|none|
|»»» status|number|true|none|Status|none|
|»»» outputCardID|integer|true|none|Output card ID|none|
|»» cabinets|[object]|false|none|Cabinet|none|
|»»» CabinetID|number|true|none|Cabinet ID|none|
|»»» rvCardID|number|true|none|Receiving card ID|none|
|»»» outPutID|number|true|none|Output pot ID|none|
|»»» index|number|true|none|Cabinet index|none|
|»»» temperature|object|true|none|Cabinet temperature|none|
|»»»» value|number|false|none||none|
|»»»» status|number|false|none||none|
|»»» voltage|object|true|none|Cabinet voltage|none|
|»»»» value|number|false|none||none|
|»»»» status|number|false|none||none|
|»»» rvCards|[object]|true|none|Receiving card|none|
|»»»» cabinetID|number|true|none||Cabinet ID|
|»»»» rvCardID|number|true|none||Receiving card ID|
|»»»» netPortIndex|number|true|none||Ethernet port index|
|»»»» cabinetIndex|number|true|none||Cabinet index|
|»»»» runtime|number|true|none||Uptime|
|»»»» totalRuntime|number|true|none||Total uptime|
|»»»» temperature|object|true|none||Receiving card temperature|
|»»»»» value|number|false|none||none|
|»»»»» status|number|false|none||none|
|»»»» voltage|object|true|none||Receiving card voltage|
|»»»»» value|number|false|none||none|
|»»»»» status|number|false|none||none|
|»»»» humidity|object|true|none||Receiving card humidity|
|»»»»» value|number|false|none||none|
|»»»»» status|number|false|none||none|
|»»»» errorBit|[object]|true|none||Receiving card bit error|
|»»»»» value|number|true|none||Bit error value|
|»»»»» type|number|true|none||Bit error type|
|»»»»» status|number|true|none||Status|
|»»»» backupStatus|object|true|none||Backup status|
|»»»»» mode|number|false|none||Working mode|
|»»»»» status|number|false|none||Status|
|»»»» nextCabinetLinkStatus|object|true|none||Disconnection status|
|»»»»» linkStatus|boolean|false|none||Disconnection status|
|»»»»» status|number|false|none||Status|
|»»»» moduleInfos|[object]|true|none||none|
|»»»»» moduleIndex|string|true|none||Module ID|
|»»»»» temperature|object|true|none||Module temperature|
|»»»»»» value|number|true|none||Value|
|»»»»»» status|number|true|none||Status|
|»»»»» voltage|object|true|none||Module voltage|
|»»»»»» value|number|true|none||Value|
|»»»»»» status|number|true|none||Status|
|»»» powerInfo|[object]|true|none|Power supply information|none|
|»»»» number|number|true|none|Number of power supplies|none|
|»»»» status|number|true|none|Power supply status|none|
|»» rvCardsRuntime|[object]|false|none|Run-time monitoring of receiving card|none|
|»»» cabinetID|number|true|none|Cabinet ID|none|
|»»» rvCardID|number|true|none|Receiving card ID|none|
|»»» runtime|int64|true|none|Uptime|none|
|»»» totalRuntime|int64|true|none|Total uptime|none|
|»» screenRunTime|integer|true|none|Total uptime of the screen|none|
|» message|string|false|none||none|

# Contents/Cabinet/Retrieve Cabinet Information

## GET Retrieve All Cabinet Information

GET /api/v1/device/cabinet

:::tip
Retrieve cabinet information
:::

> 返回示例

> 200 Response

```json
[
  {
    "resolution": {
      "width": "0",
      "height": "0"
    },
    "size": {
      "width": "0",
      "height": 0
    },
    "weight": "0",
    "power": "0",
    "colorTemperature": "6500",
    "voltage": "5.0",
    "rvCardName": "string",
    "brightness": 0,
    "customGamma": false,
    "gain": {
      "r": "0",
      "g": "0",
      "b": "0"
    },
    "outputID": "0",
    "canvasID": 0,
    "outputCardID": 0,
    "index": "0",
    "bunchesIndex": "0",
    "id": "0",
    "moduleCount": "0",
    "cabType": "string",
    "beacon": true,
    "indicatorLightState": true,
    "manufacture": "string",
    "pointSpacing": "string",
    "shortName": "string",
    "familyName": "string",
    "ncpVersion": "string",
    "vsFreMax": null,
    "angle": 0,
    "moduleSize": {
      "overwrite": true,
      "moduleRow": 0,
      "moduleCol": 0
    },
    "rvCardInfo": {
      "firmware": "string",
      "firmwareRemark": "string",
      "mcuFirmWare": "string",
      "mcuFirmWareRemark": "string",
      "driverChip": "string",
      "decodeIc": "string",
      "scanNumber": 0,
      "moduleResolution": {
        "width": 0,
        "height": 0
      },
      "refreshRate": null,
      "grayScale": 0,
      "chipEffectFlag": 0,
      "maxGamma": 0
    },
    "cabinetFileParam": {
      "manufactureName": "string",
      "cabinetName": "string",
      "cardModel": "string",
      "status": "string",
      "version": "string",
      "issue": "string"
    },
    "gamma": {
      "r": "2.8",
      "g": "2.8",
      "b": "2.8"
    }
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» title|object|false|none|title|none|
|»» resolution|object|true|none|Cabinet pixels (internal use only)|none|
|»»» width|integer|true|none|Cabinet width|Int32|
|»»» height|integer|true|none|Cabinet height|int32|
|»» size|object|true|none|Cabinet size|none|
|»»» width|integer|true|none|Cabinet width|Int32|
|»»» height|integer|true|none|Cabinet height|int32|
|»» weight|integer|true|none|Cabinet weight (internal use only)|Int32|
|»» power|integer|true|none|Cabinet power (internal use only)|Int32|
|»» colorTemperature|integer|true|none|Color temperature value|Int32|
|»» voltage|integer|true|none|Cabinet voltage (internal use only)|Int32|
|»» rvCardName|string|true|none|Name of receiving card in the cabinet (internal use only)|none|
|»» brightness|number|true|none|Brightness|float|
|»» customGamma|boolean|true|none|Custom gamma enable (internal use only)|none|
|»» gain|object|true|none|Current Gain (internal use only)|none|
|»»» r|integer|true|none|Red gain|Int32|
|»»» g|integer|true|none|Green gain|Int32|
|»»» b|integer|true|none|Blue gain|Int32|
|»» outputID|integer|true|none|Ethernet port number of the cabinet|uint8|
|»» canvasID|integer|true|none|Canvas ID of the cabinet|none|
|»» outputCardID|integer|true|none|Output card ID of the cabinet|none|
|»» index|integer|true|none|Cabinet index (internal use only)|uint32|
|»» bunchesIndex|integer|true|none|Index of the cabinet string (internal use only)|uint16|
|»» id|integer|true|none|Cabinet ID|uint64|
|»» moduleCount|integer|true|none|Number of modules of the cabinet (internal use only)|int|
|»» cabType|string|true|none|Cabinet type (internal use only)|none|
|»» beacon|boolean|true|none|Beacon enable (internal use only)|none|
|»» indicatorLightState|boolean|true|none|Receiving card indicator status (internal use only)|none|
|»» manufacture|string|true|none|Cabinet manufacturer (internal use only)|none|
|»» pointSpacing|string|true|none|Cabinet pixel pitch (internal use only)|none|
|»» shortName|string|true|none|Cabinet short name (internal use only)|none|
|»» familyName|string|true|none|Cabinet series name (internal use only)|none|
|»» ncpVersion|string|true|none|Cabinet library version (internal use only)|none|
|»» vsFreMax|float32|true|none|Max frame rate (internal use only)|none|
|»» angle|integer|true|none|Angle of rotation (internal use only)|none|
|»» moduleSize|object|true|none|Overridden module size (internal use only)|none|
|»»» overwrite|boolean|true|none|Overwrite or not|none|
|»»» moduleRow|integer|true|none|Row|none|
|»»» moduleCol|integer|true|none|Column|none|
|»» rvCardInfo|object|true|none|Receiving card information (internal use only)|none|
|»»» firmware|string|true|none|Firmware version|none|
|»»» firmwareRemark|string|true|none|FPGA version note|none|
|»»» mcuFirmWare|string|true|none|MCU firmware version|none|
|»»» mcuFirmWareRemark|string|true|none|MCU version note|none|
|»»» driverChip|string|true|none|Driver IC|none|
|»»» decodeIc|string|true|none|Decoding IC model|none|
|»»» scanNumber|number|true|none|Number of scans|none|
|»»» moduleResolution|object|true|none|Module specifications|none|
|»»»» width|integer|true|none|Width|none|
|»»»» height|integer|true|none|Height|none|
|»»» refreshRate|float|true|none|Refresh rate|none|
|»»» grayScale|number|true|none|Grayscale level|none|
|»»» chipEffectFlag|number|true|none|Chip active high or low|none|
|»»» maxGamma|number|true|none|ICN chip max gamma value|none|
|»» cabinetFileParam|object|true|none|Parameters of the cabinet file in use (internal use only)|none|
|»»» manufactureName|string|true|none|Manufacturer|none|
|»»» cabinetName|string|true|none|Cabinet name|none|
|»»» cardModel|string|true|none|Card model|none|
|»»» status|string|true|none|Releasing status|none|
|»»» version|string|true|none|Version number|none|
|»»» issue|string|true|none|Revision number|none|
|»» gamma|object|false|none|RGB gamma values (internal use only)|none|
|»»» r|number|true|none|Red gamma value|none|
|»»» g|number|true|none|Green gamma value|none|
|»»» b|number|true|none|Blue gamma value|none|

# Contents/Cabinet/Brightness Adjustment

## PUT Set Cabinet RGB Brightness

PUT /api/v1/device/cabinet/rgb/brightness

:::tip
Set RGB brightness for receiving cards
:::

> Body 请求参数

```json
{
  "r": 255,
  "g": 100,
  "b": 80,
  "idList": [
    22279485852286988
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» r|body|uint32| 是 | Red component brightness|CX series RGB component values range from 0 to 1023, MX series from 0 to 255|
|» g|body|uint32| 是 | Green component brightness|CX series RGB component values range from 0 to 1023, MX series from 0 to 255|
|» b|body|uint32| 是 | Blue component brightness|CX series RGB component values range from 0 to 1023, MX series from 0 to 255|
|» idList|body|[integer]| 否 ||API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

## PUT Set Cabinet Brightness

PUT /api/v1/device/cabinet/brightness

:::tip
Set cabinet brightness
:::

> Body 请求参数

```json
{
  "idList": [
    22279485852286988
  ],
  "ratio": 0.9,
  "nit": 1000
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» idList|body|[number]| 是 | Cabinet ID list|[]uint64 type, API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|
|» ratio|body|number| 是 | Brightness ratio|float32 type, range: 0 to 1|
|» nit|body|number| 否 | Brightness (nits) value|uint16 type|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Cabinet/Color Temperature Adjustment

## PUT Adjust Cabinet Color Temperature

PUT /api/v1/device/cabinet/colortemperature

:::tip
Adjust the color temperature for one or more cabinets
:::

> Body 请求参数

```json
{
  "idList": [
    0
  ],
  "value": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» idList|body|[number]| 是 | Cabinet ID list|[]uint64 type, API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|
|» value|body|number| 是 ||uint32 type, range: 1,700 to 15,000|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Cabinet/Cabinet Control

## PUT Set Receiving Card Test Pattern

PUT /api/v1/device/cabinet/testpattern

:::tip
Set test pattern for the receiving card
:::

> Body 请求参数

```json
{
  "idList": [
    22279485852286988
  ],
  "testmode": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» idList|body|[integer]| 是 | ID list of the cabinets that are operated|[]uint64 type, API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|
|» testmode|body|integer| 是 | Test pattern type|uint8 type, 1: normal display, 4: red, 5: green, 6: blue, 7: white, 8: H lines, 9: V lines, 10: slashes, 11: checkerboard, 12: grayscale, 13: aging. Default to normal display|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Cabinet/Cabinet Identify

## PUT Enable Cabinet Mapping

PUT /api/v1/device/cabinet/mapping

:::tip
Allows for selecting multiple cabinets for mapping
:::

> Body 请求参数

```json
{
  "idList": [
    0
  ],
  "enable": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» idList|body|[integer]| 是 | List of cabinet IDs for operations.|[]uint64 type, API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|
|» enable|body|boolean| 是 | Enable|true: on, false: off. Default to off.|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Cabinet/Multi-Mode

## PUT Set Multi-mode by Cabinets

PUT /api/v1/device/cabinet/multimode

:::tip
Switch multi-mode for the cabinet
:::

> Body 请求参数

```json
{
  "idList": [
    22279485852286988
  ],
  "modeId": 2
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» idList|body|[number]| 是 | Cabinet ID list|[]uint64 type, API for retrieving cabinet ID: /api/v1/device/cabinet, key name: id.|
|» modeId|body|number| 是 | Mode ID|uint8 type, API: /api/v1/screen/base/info, key name: modeId in multiModeInfo.|

> 返回示例

```json
{
  "code": 0,
  "data": null,
  "message": "Success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||The return code, refer to "Error Codes."|
|» data|object|false|none||Return Data|
|» message|string|false|none||Information corresponding to the code.|

# Contents/Cabinet/Configure Cabinet Topology

## PUT Move Cabinet

PUT /api/v1/screen/cabinets

:::tip
Move the cabinet topology position
:::

> Body 请求参数

```json
{
  "screenID": "88",
  "canvases": [
    {
      "canvasID": 18,
      "cabinets": [
        {
          "cabinetsID": 33,
          "connectID": 16,
          "outputID": 66,
          "position": {
            "x": 85,
            "y": 88
          },
          "size": {
            "width": 98,
            "height": 33
          }
        }
      ]
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | title|none|
|» screenID|body|string| 是 | Screen ID|API: /api/v1/screen, key name: screenID.|
|» canvases|body|[object]| 是 ||none|
|»» canvasID|body|number| 是 | Canvas ID|uint16 type, API: /api/v1/screen, key name: canvasID.|
|»» cabinets|body|[object]| 是 | Cabinet information|none|
|»»» cabinetID|body|number| 是 | Cabinet ID|uint64 type, API: /api/v1/screen, key name: cabinetID.|
|»»» connectID|body|number| 是 | Connect ID|uint32 type, API: /api/v1/screen, key name: connectID.|
|»»» outputID|body|number| 是 | Ethernet port ID|uint16 type, API: /api/v1/screen, key name: outputID.|
|»»» position|body|object| 是 | Position information|none|
|»»»» x|body|number| 是 | x-coordinate|int32 type, target position|
|»»»» y|body|number| 是 | y-coordinate|int32 type, target position|
|»»» size|body|object| 是 | Cabinet resolution|none|
|»»»» width|body|number| 是 | Width|int32 type, API: /api/v1/screen, key name: x in size.|
|»»»» height|body|number| 是 | Height|int32 type, API: /api/v1/screen, key name: y in size.|
|»»» angle|body|float64| 否 | Angle of rotation|none|

> 返回示例

```json
{
  "code": 0,
  "data": null,
  "message": "Success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*title*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||The return code, refer to "Error Codes."|
|» data|object¦null|false|none||Return Data|
|» message|string|true|none||Return information|

# 数据模型


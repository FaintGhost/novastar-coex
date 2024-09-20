Retrieve Screen Information
GET	
/api/v1/screen
Contents/General
Released	
All

Set Screen Brightness
PUT	
/api/v1/screen/brightness
Contents/General
Released	
MX6000

Set Screen Gamma
PUT	
/api/v1/screen/gamma
Contents/General
Released	
MX6000

Set Blackout/Freeze Screen
PUT	
/api/v1/device/displaymode
Contents/General
Released	
All

Retrieve Preset Information
GET	
/api/v1/preset
Contents/General
Released	
All

Apply Preset
POST	
/api/v1/preset/current/update
Contents/General
Released	
All

Retrieve All Cabinet Information
GET	
/api/v1/device/cabinet
Contents/General
Released	
All

Enable Cabinet Mapping
PUT	
/api/v1/device/cabinet/mapping
Contents/General
Released	
All

Retrieve Input Source List
GET	
/api/v1/device/input/sources
Contents/General
Released	
All

Switch Source for Layer
PUT	
/api/v1/screen/layer/input
Contents/General
Released	
All

Set EDID
PUT	
/api/v1/device/input/{id}/edid
Contents/General
Released	
All

Set Screen Color Temperature
PUT	
/api/v1/screen/colortemperature
Contents/General
Released	
MX6000

Retrieve Input Data
GET	
/api/v1/device/input
Contents/Input/Retrieve Input Information
Released	
All

Retrieve Input Source List
GET	
/api/v1/device/input/sources
Contents/Input/Retrieve Input Information
Released	
All

Set EDID
PUT	
/api/v1/device/input/{id}/edid
Contents/Input/EDID
Released	
All

Set Saturation
PUT	
/api/v1/device/input/saturation
Contents/Input/Color Adjustment
Released	
All

Set Color Highlight
PUT	
/api/v1/device/input/highlight
Contents/Input/Color Adjustment
Released	
All

Set Color Highlight
PUT	
/api/v1/device/input/shadow
Contents/Input/Color Adjustment
Released	
All

Adjust Hue
PUT	
/api/v1/device/input/hue
Contents/Input/Color Adjustment
Released	
All

Reset Color Adjustment
PUT	
/api/v1/device/input/reset
Contents/Input/Color Adjustment
Released	
All

Set Sending Card Test Pattern
PUT	
/api/v1/device/input/pattern/test
Contents/Input/Internal Source
Released	
All

Set HDR Mode
PUT	
/api/v1/device/input/{id}/hdrmode
Contents/Input/Set HDR Mode
Released	
CX80
MX40 Pro
+3

Set Custom Gamut on a Screen-Basis
PUT	
/api/v1/screen/output/customgamut
Contents/Screen/Image booster/Color Gamut
Released	
All

Switch Color Gamut
PUT	
/api/v1/screen/output/gamut
Contents/Screen/Image booster/Color Gamut
Released	
All

Retrieve Screen Display Effect Parameters
GET	
/api/v1/screen/displayparams
Contents/Screen/Image booster
Developing	
MX6000

Set Screen Color Temperature
PUT	
/api/v1/screen/colortemperature
Contents/Screen/Image booster
Released	
MX6000

Set Custom Gamma for the Screen
POST	
/api/v1/screen/gamma/update
Contents/Screen/Image booster
Released	
MX6000

Set Screen Brightness
PUT	
/api/v1/screen/brightness
Contents/Screen/Image booster
Released	
MX6000

Set Screen Gamma
PUT	
/api/v1/screen/gamma
Contents/Screen/Image booster
Released	
MX6000

Switch Source for Layer
PUT	
/api/v1/screen/layer/input
Contents/Screen/Layer
Released	
All

Delete 3D LUT File
DELETE	

/api/v1/screen/processing/threedlut/file
Contents/Screen/Processing/3D LUT
Released	
CY60
MX40 Pro
+3

Import 3D LUT File
PUT	
/api/v1/screen/processing/threedlut/file
Contents/Screen/Processing/3D LUT
Released	
CY60
MX40 Pro
+3

Set 3D LUT Strength
PUT	
/api/v1/screen/processing/threedlut/strength
Contents/Screen/Processing/3D LUT
Released	
CY60
MX40 Pro
+3

Enable 3D LUT
PUT	
/api/v1/screen/processing/threedlut/enable
Contents/Screen/Processing/3D LUT
Released	
CY60
MX40 Pro
+3

Canvas Mapping
PUT	
/api/v1/screen/output/canvas/mapping
Contents/Screen/Canvas
Released	
MX6000

Modify Preset
POST	
/api/v1/preset/update
Contents/Screen/Preset
Released	
All

Retrieve Preset Information
GET	
/api/v1/preset
Contents/Screen/Preset
Released	
All

Apply Preset
POST	
/api/v1/preset/current/update
Contents/Screen/Preset
Released	
All

Retrieve All Schedule Information of the Screens
GET	
/api/v1/screen/schedule/all
Contents/Screen/Schedule
Released	-

Set Schedule On\Off
POST	
/api/v1/screen/schedule/enable/update
Contents/Screen/Schedule
Released	
MX40 Pro
MXT

Delete Brightness Policy
POST	
/api/v1/screen/schedule/brightness-strategy/delete
Contents/Screen/Schedule
Released	-

Enable 3D Emitter
PUT	
/screen/output/threed/emitter
Contents/Screen/Output/3D function/3D Emitter
Released	
All

Enable/Disable 3D
PUT	
/api/v1/screen/output/threed/enable
Contents/Screen/Output/3D function
Released	-

Retrieve Screen Output Data
GET	
/api/v1/screen/output
Contents/Screen/Output/Retrieve Output Parameters
Released	
All

Set Blackout/Freeze Screen
PUT	
/api/v1/screen/output/displaymode
Contents/Screen/Output/Display mode
Released	
All

Set Multi-mode by Screens
PUT	
/api/v1/screen/output/multimode
Contents/Screen/Output/Multi-Mode
Released	
MX6000

Retrieve Display Status
GET	
/api/v1/screen/output/display/state
Contents/Screen/Output
Released	
MX6000

Set Output Bit Depth
PUT	
/api/v1/screen/output/bitdepth
Contents/Screen/Output
Released	
All

Retrieve Screen Properties Information
GET	
/api/v1/screen/base/info
Contents/Screen
Released	
MX6000

Retrieve the Number of Cabinets of the Screen
GET	
/api/v1/screen/cabinet/count
Contents/Screen
Developing	
MX6000

Retrieve Screen Information
GET	
/api/v1/screen
Contents/Screen
Released	
All

Device Identify
PUT	
/api/v1/device/hw/mapping
Contents/Device/Device Identify
Released	
All

Retrieve Real-Time Monitoring Information
GET	
/api/v1/device/monitor/info
Contents/Device/Monitoring
Released	
All]

Set Blackout/Freeze Screen
PUT	
/api/v1/device/displaymode
Contents/Device
Released	
All

Retrieve All Cabinet Information
GET	
/api/v1/device/cabinet
Contents/Cabinet/Retrieve Cabinet Information
Released	
All

Set Cabinet RGB Brightness
PUT	
/api/v1/device/cabinet/rgb/brightness
Contents/Cabinet/Brightness Adjustment
Released	
All

Set Cabinet Brightness
PUT	
/api/v1/device/cabinet/brightness
Contents/Cabinet/Brightness Adjustment
Released	
All

Adjust Cabinet Color Temperature
PUT	
/api/v1/device/cabinet/colortemperature
Contents/Cabinet/Color Temperature Adjustment
Released	
All

Set Receiving Card Test Pattern
PUT	
/api/v1/device/cabinet/testpattern
Contents/Cabinet/Cabinet Control
Released	
All

Enable Cabinet Mapping
PUT	
/api/v1/device/cabinet/mapping
Contents/Cabinet/Cabinet Identify
Released	
All

Set Multi-mode by Cabinets
PUT	
/api/v1/device/cabinet/multimode
Contents/Cabinet/Multi-Mode
Released	
MX40 Pro
MX30
+2

Move Cabinet
PUT	
/api/v1/screen/cabinets
Contents/Cabinet/Configure Cabinet Topology
Released	
All
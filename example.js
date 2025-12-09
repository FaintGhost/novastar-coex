const COEX = require('./index'); // Assuming you run this from the novastar-coex directory

// --- Configuration ---
const DEVICE_IP = '127.0.0.1'; // <-- Replace with your device's IP address
const DEVICE_PORT = 8001; // Default COEX API port
// ---------------------

const novastar = new COEX(DEVICE_IP, DEVICE_PORT);

async function runExamples() {
  console.log(`--- Running examples against ${DEVICE_IP}:${DEVICE_PORT} ---`);

  // Example 1: Get Display Parameters
  try {
    console.log('\n[Example 1: Get Display Parameters]');
    const params = await novastar.getDisplayParams();
    console.log('Current Display Params:', JSON.stringify(params, null, 2));
    if (params && params.length > 0) {
      console.log(` -> Brightness of first screen: ${params[0].brightness * 100}%`);
      console.log(` -> Color Temp of first screen: ${params[0].colorTemperature}K`);
    }
  } catch (error) {
    console.error('Error getting display parameters:', error);
  }

  // Example 2: Get Presets
  try {
    console.log('\n[Example 2: Get Presets]');
    const presets = await novastar.getPreset();
    console.log('Available Presets:', JSON.stringify(presets, null, 2));
    const activePreset = presets.find(p => p.state === true);
    if (activePreset) {
      console.log(` -> Currently active preset: ${activePreset.name} (Seq: ${activePreset.sequenceNumber})`);
    } else {
      console.log(' -> No preset is currently active.');
    }
  } catch (error) {
    console.error('Error getting presets:', error);
  }

  // Example 3: Set Brightness (Example: Set to 60%)
  try {
    console.log('\n[Example 3: Set Brightness to 60%]');
    const brightnessResult = await novastar.brightness(60);
    console.log('Set brightness result:', brightnessResult);
    // Verify by getting params again (optional)
    // const updatedParams = await novastar.getDisplayParams();
    // console.log('Brightness after update (first screen):', updatedParams[0]?.brightness * 100);
  } catch (error) {
    console.error('Error setting brightness:', error);
  }

  // Example 4: Apply Preset (Example: Apply preset named '预设方案2')
  // Note: Replace '预设方案2' with an actual preset name on your device
  const presetToApply = '预设方案2';
  try {
    console.log(`\n[Example 4: Apply Preset '${presetToApply}']`);
    const applyResult = await novastar.applyPreset(presetToApply);
    console.log(`Apply preset '${presetToApply}' result:`, applyResult);
  } catch (error) {
    console.error(`Error applying preset '${presetToApply}':`, error);
  }

  // Example 5: Get Sources
  try {
    console.log('\n[Example 5: Get Input Sources]');
    const sources = await novastar.sources();
    console.log('Available Sources:', JSON.stringify(sources, null, 2));
  } catch (error) {
    console.error('Error getting sources:', error);
  }

  // Example 6: Set Display Mode to Normal
  try {
    console.log('\n[Example 6: Set Display Mode to Normal]');
    const normalResult = await novastar.normal(); // Use alias
    console.log('Set display mode to Normal result:', normalResult);
  } catch (error) {
    console.error('Error setting display mode to Normal:', error);
  }

  // Example 7: Get Screen List (for Companion dropdowns)
  try {
    console.log('\n[Example 7: Get Screen List]');
    const screenList = await novastar.getScreenList();
    console.log('Available Screens:', JSON.stringify(screenList, null, 2));
    // Output example:
    // [{ index: 0, id: "{8b42c854-...}", name: "New Screen 1", canvasCount: 1 },
    //  { index: 1, id: "{xxxx-...}", name: "New Screen 2", canvasCount: 2 }]
  } catch (error) {
    console.error('Error getting screen list:', error);
  }

  // Example 8: Set Mapping for all screens (auto-detect canvasIDs)
  try {
    console.log('\n[Example 8: Set Mapping for All Screens]');
    const mappingResult = await novastar.setMapping(false);
    console.log('Set mapping result:', mappingResult);
  } catch (error) {
    console.error('Error setting mapping:', error);
  }

  // Example 9: Set Mapping for specific screen by index
  try {
    console.log('\n[Example 9: Set Mapping for Screen Index 0]');
    const mappingResult = await novastar.setMapping(true, { screenIndex: 0 });
    console.log('Set mapping result for screen 0:', mappingResult);
  } catch (error) {
    console.error('Error setting mapping for screen 0:', error);
  }

  // Example 10: Set Brightness for specific screen
  try {
    console.log('\n[Example 10: Set Brightness for Screen Index 0]');
    const brightnessResult = await novastar.screenbrightness(80, { screenIndex: 0 });
    console.log('Set brightness result for screen 0:', brightnessResult);
  } catch (error) {
    console.error('Error setting brightness for screen 0:', error);
  }

  console.log('\n--- Examples finished ---');
}

// Run the examples
runExamples();
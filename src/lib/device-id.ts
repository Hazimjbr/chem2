
'use client';

// A simple function to generate a semi-unique ID for the device/browser.
// It's not foolproof but is a good deterrent for casual users.
// A more robust solution would involve libraries like fingerprintjs2, but this is a good start.
function generateId() {
  const navigatorInfo = window.navigator;
  const screenInfo = window.screen;
  let anId = navigatorInfo.mimeTypes.length.toString();
  anId += navigatorInfo.userAgent.replace(/\D+/g, '');
  anId += screenInfo.height || '';
  anId += screenInfo.width || '';
  anId += screenInfo.pixelDepth || '';
  return anId;
}

export const getOrCreateDeviceId = (): string => {
  try {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = generateId();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  } catch (error) {
    // This can happen in very old browsers or in private mode.
    // We'll return a less stable but still functional ID.
    console.warn("Could not access localStorage. Using a less stable device ID.");
    return generateId();
  }
};

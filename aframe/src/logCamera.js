
// Helper to log something in front of the camera.
export function logCamera(msg) {
  const elLog = document.querySelector('#logDebug2');
  elLog.setAttribute('value', msg);
}

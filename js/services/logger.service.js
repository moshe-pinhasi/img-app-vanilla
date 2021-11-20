

function logInfo(...ars) {
  console.log('[Info]', ...ars)
}

function logError(...ars) {
  console.log('[Error]', ...ars)
}

window.logInfo = logInfo
window.logError = logError
import './services/logger.service.js'
import {initRouter} from './services/router.service.js'
import {initListPage} from './controllers/img-list.controller.js'
import {initEditPage} from './controllers/img-edit.controller.js'

// ---------- main page ----------
function bootstrapApp() {
  initListPage()
  initEditPage()
  initRouter()
  logInfo('App loaded')
}

window.onerror = () => {
  showError('Some error occurred')
}

bootstrapApp()
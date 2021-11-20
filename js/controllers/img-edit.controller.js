import {fileService} from '../services/file.service.js'
import {addListener, removeListener} from '../services/dom.service.js'
import {eventBusService} from '../services/event-bus.service.js'
import {router} from '../services/router.service.js'
import {getElement} from '../services/dom.service.js'
import {imgService} from '../services/img.service.js'
import {showSuccess, showError} from '../services/alert.service.js'

// TODO: if we in edit mode - need to:
// 1. change the action buttons to save and hide the choosing file
// 2. save the existing image

function displayImgPreview(img) {
  const imgEl = getElement(".img-edit-preview img")
  console.log('imgEl');
  imgEl.src = img
}

async function onImgChanged() {
  const file = _getFile();
  if (!file) return

  try {
    const img = await fileService.getBase64(file);
    displayImgPreview(img)
  } catch (err) {
    logError(err)
  }
}

async function onAddImgClicked(ev) {
  const file = _getFile();
  if (!file) return

  try {
    const content = await fileService.getBase64(file); // TODO: need to take the content from the display img
    logInfo('file converted!');
    imgService.save(file.name, content)
    showSuccess('Image saved successfully')
    router.push('/list')
  }
  catch(e) {
    logError(e);
    showError('Image failed to be saved')
  }
}

function _getFile() {
  var files = getElement('#file').files;
  return files[0]
}

function onCreate() {
  addListener('#addImg', 'click', onAddImgClicked);

  const imgId = window.location.hash.split("/")[2]
  const img = imgService.getById(imgId)
  img && displayImgPreview(img.content)

  addListener('#file', 'change', onImgChanged);
}

function onDestroy() {
  removeListener('#addImg', 'click', onAddImgClicked);
  removeListener('#file', 'change', onImgChanged);
}

function initEditPage() {
  eventBusService.on('route-chnaged', (ev) => {
    (ev.name == 'edit') ? onCreate() : onDestroy()
  })
}

export {
  initEditPage
}

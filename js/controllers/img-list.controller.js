import {imgService} from '../services/img.service.js'
import {createElement, getElement, addListener, removeListener} from '../services/dom.service.js'
import {eventBusService} from '../services/event-bus.service.js'

function onImgClicked(ev) {
  logInfo(ev.target.dataset)

  const {action, id: imgId} = ev.target.dataset
  if (!action) return
  

  console.log('imgId', imgId, 'action', action);
  const itemElm = getElement(`li[data-id="${imgId}"]`)
  if (action === 'preview') {
    const img = imgService.getById(imgId)
    displayImgPreview(img)
  } else if (action === 'delete') {
    try {
      imgService.remove(imgId)
      itemElm.remove()
    } catch (e) {
      logError(e)
    }
  }
}

function displayImgPreview(img) {
  const imgEl = getElement(".img-list-preview img")
  imgEl.src = img.content
  const imgElm = getElement(".btn-edit")
  imgElm.href = '#/edit/' + img.id
}

function renderImgItem(img) {
  const listElm = getElement('.img-list')
  const liEl = createElement('li')
  liEl.classList.add('img-preview-item')
  liEl.classList.add('flex-row')
  liEl.classList.add('center-hor')
  liEl.innerHTML = `
    <i class="far fa-image" data-action="preview" data-id="${img.id}"></i> 
    <div class="img-name ellipsis" data-action="preview" data-id="${img.id}">${img.title}</div>
    <i class="fas fa-times delete" data-action="delete" data-id="${img.id}"></i> 
  `
  liEl.setAttribute('id', img.id)
  liEl.setAttribute('data-id', img.id)
  liEl.setAttribute('data-action', 'preview')
  listElm.appendChild(liEl)
}

function renderList() {
  const imgs = imgService.query()
  imgs.forEach(renderImgItem)

  if (imgs.length > 0) {
    displayImgPreview(imgs[0])
  }
}

function onCreate() {
  addListener('.img-list', 'click', onImgClicked)
  const listElm = getElement('.img-list')
  listElm.innerHTML = ""
  renderList()
}

function onDestroy() {
  removeListener('.img-list', 'click', onImgClicked)
}

function initListPage() {
  eventBusService.on('route-chnaged', (ev) => {
    (ev.name === 'list') ? onCreate() : onDestroy()
  })
}

export {
  initListPage
}

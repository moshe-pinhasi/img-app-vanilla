import { getElement} from './dom.service.js'
import {eventBusService} from './event-bus.service.js'

const listener = () => setTimeout(renderPage)

function renderPage() {
  document.querySelectorAll('.router-link')
    .forEach(item => item.removeEventListener('click', listener))

  const pageName = window.location.hash.split("/")[1]
  console.log('pageName', pageName);
  const pagesList = getElement('.pages-content');
  for (let i = 0; i < pagesList.children.length; i++) {
    const pageEl = pagesList.children[i]
    !pageEl.classList.contains('hidden') && pageEl.classList.add('hidden')
  }

  const elm = getElement(`.img-${pageName}-page`)
  // elm.style.display = 'block'
  elm.classList.remove('hidden')
  eventBusService.emit('route-chnaged', {route: `/${pageName}`, name: pageName})

  document.querySelectorAll('.router-link')
    .forEach(item => item.addEventListener('click', listener))
}

export function initRouter() {
  // TODO: when router not defined need to redirect to /list
  renderPage()
}

function push(path) {
  window.location.hash = path;
  renderPage()
}

export const router = {
  initRouter,
  push
}
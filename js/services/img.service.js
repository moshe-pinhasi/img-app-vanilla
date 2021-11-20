import {storageService} from './storage.service.js'
import {makeId, copy} from './util.service.js'

let imgs = storageService.load('imgs') || []

export const imgService = {
  save,
  query,
  remove,
  getById
}

function query() {
  return copy(imgs)
}

function save(title, content) {
  const img = _createImg(title, content)
  imgs.push(img)
  storageService.save('imgs', imgs)
  return img
}

function remove(id) {
  imgs = imgs.filter(img => img.id !== id)
  storageService.save('imgs', imgs)
}

function getById(id) {
  return imgs.filter(img => img.id === id)[0]
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.onerror = function (error) {
      reject(error)
    };
  })
}

function _createImg(title, content) {
  return {
    id: makeId(),
    content,
    title
  }
}

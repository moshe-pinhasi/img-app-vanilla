
export const domService = {
    createElement,
    getElement,
    addListener,
    removeListener,
    getAllElements,
};

export function createElement(el) {
    return document.createElement(el)
  }
  
export function getElement(selector) {
    return document.querySelector(selector)
}

export function getAllElements(selector) {
    return document.querySelectorAll(selector)
}

export function addListener(selector, event, cb) {
    const elm = getElement(selector)
    elm.addEventListener(event, cb);
}

export function removeListener(selector, event, removedFn) {
    const elm = getElement(selector)
    elm.removeEventListener(event, removedFn);
}
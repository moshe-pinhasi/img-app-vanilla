import { makeId } from './util.service.js'

const elAlertContainer = document.createElement('div')
elAlertContainer.classList.add('alert-container')
document.body.appendChild(elAlertContainer)

export {
  showSuccess,
  showError
}

function showSuccess(txt) {
    const msg = { status: 'success', txt }
    _showAlert(msg)
}

function showError(txt) {
    const msg = { status: 'error', txt }
    _showAlert(msg)
}

function _showAlert(msg) {
    const id = makeId()
    const elAlert = createAlert(msg, id)
    elAlertContainer.appendChild(elAlert)
    setTimeout(() => {
        closeAlert(id)
    }, 3000)
}

function closeAlert(id) {
    const elAlert = document.getElementById(id)
    if (elAlert) elAlert.remove()
}

function createAlert(msg, id) {
    const elAlert = document.createElement('div')
    elAlert.className = `alert ${msg.status}`;
    elAlert.id = id;

    var elTxt = document.createElement('p')
    elTxt.innerText = msg.txt;

    elAlert.appendChild(elTxt)
    return elAlert;
}
window.showSuccess = showSuccess
window.showError = showError
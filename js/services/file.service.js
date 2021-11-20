export const fileService = {
  getBase64
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
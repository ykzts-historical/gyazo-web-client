function convertImageFormatToPng(imageFile) {
  let imageUri = URL.createObjectURL(imageFile);
  let imageElement = document.createElement('img');
  let canvasElement = document.createElement('canvas');
  let canvasContext = canvasElement.getContext('2d');
  return new Promise((resolve, reject) => {
    imageElement.addEventListener('load', () => {
      canvasElement.width = imageElement.width;
      canvasElement.height = imageElement.height;
      canvasContext.drawImage(imageElement, 0, 0);
      try {
        let dataUri = canvasElement.toDataURL('image/png');
        let blob = dataUriToBlob(dataUri);
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    });
    imageElement.addEventListener('error', reject);
    imageElement.src = imageUri;
  });
}

function dataUriToBlob(uri) {
  let colonPosition = uri.indexOf(':');
  let protocol = uri.slice(0, colonPosition + 1);
  if (protocol !== 'data:') {
    throw new Error('URI is not data URI.');
  }
  let uriWithoutProtocol = uri.slice(colonPosition + 1);
  let [ mediaType, data ] = uriWithoutProtocol.split(',', 2);
  let [ type, ...parameters ] = mediaType.split(';');
  let isEncodedBase64 = parameters.includes('base64');
  return new Blob([isEncodedBase64 ? decodeBase64(data) : data], { type });
}

function decodeBase64(data) {
  let bytes = atob(data);
  let length = bytes.length;
  let u8a = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    u8a[i] = bytes.charCodeAt(i);
  }
  return u8a;
}

export default convertImageFormatToPng;

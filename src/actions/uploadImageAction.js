import saveUploadedImageAction from './saveUploadedImageAction';

function validateUri(uri) {
  let inputField = document.createElement('input');
  inputField.type = 'url';
  inputField.value = uri;
  let validity = inputField.validity;
  return validity.valid;
}

async function uploadImageAction(context, { uri, gyazoId, imageFile }) {
  let imageUri;
  let formData = new FormData();
  formData.append('id', gyazoId);
  formData.append('imagedata', imageFile);
  let request = new Request(uri, {
    method: 'POST',
    body: formData
  });
  context.dispatch('HANDLE_READY_STATE_CHANGE', {
    readyState: 'opened'
  });
  try {
    let response = await fetch(request);
    context.dispatch('HANDLE_READY_STATE_CHANGE', {
      readyState: 'loading'
    });
    if (response.status !== 200) {
      let error = new Error(response.statusText);
      error.statusCode = response.status;
      throw error;
    }
    imageUri = await response.text();
    if (!validateUri(imageUri)) {
      let error = new Error('Invalid URI.');
      throw error;
    }
    await context.executeAction(saveUploadedImageAction, {
      fileName: imageFile.name,
      uri: imageUri,
      uploadedAt: new Date()
    });
    imageUri = null;
    context.dispatch('SET_IMAGE_FILE', { imageFile: null });
    context.dispatch('SET_ALERT_MESSAGE', {
      type: 'success',
      message: 'Upload image has been completed.'
    })
  } catch (error) {
    context.dispatch('SET_ALERT_MESSAGE', {
      type: 'danger',
      message: 'Failed to upload image.'
    });
  } finally {
    context.dispatch('HANDLE_READY_STATE_CHANGE', {
      readyState: 'done',
      imageUri
    });
  }
}

export default uploadImageAction;

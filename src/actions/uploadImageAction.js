import saveUploadedImageAction from './saveUploadedImageAction';

async function uploadImageAction(context, { uri, gyazoId, imageFile, form }) {
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
    imageUri = await response.text();
    await context.executeAction(saveUploadedImageAction, {
      fileName: imageFile.name,
      uri: imageUri,
      uploadedAt: new Date()
    });
    imageUri = null;
    form.reset();
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

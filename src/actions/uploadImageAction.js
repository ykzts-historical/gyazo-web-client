import saveUploadedImageAction from './saveUploadedImageAction';

async function uploadImageAction(context, { uri, gyazoId, imageFile }) {
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
  let response = await fetch(request);
  context.dispatch('HANDLE_READY_STATE_CHANGE', {
    readyState: 'loading'
  });
  let imageUri = await response.text();
  context.dispatch('HANDLE_READY_STATE_CHANGE', {
    readyState: 'done',
    imageUri: null
  });
  await context.executeAction(saveUploadedImageAction, {
    fileName: imageFile.name,
    uri: imageUri,
    uploadedAt: new Date()
  });
}

export default uploadImageAction;

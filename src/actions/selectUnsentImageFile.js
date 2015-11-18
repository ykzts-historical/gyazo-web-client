async function selectUnsentImageFile(context, { imageFile }) {
  let imageUri = URL.createObjectURL(imageFile);
  context.dispatch('HANDLE_READY_STATE_CHANGE', {
    readyState: 'unsent',
    imageUri
  });
}

export default selectUnsentImageFile;

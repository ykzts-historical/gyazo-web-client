import convertImageFormatToPng from '../utils/convertImageFormatToPng';

async function selectUnsentImageFile(context, { imageFile }) {
  if (imageFile.type !== 'image/png') {
    imageFile = await convertImageFormatToPng(imageFile);
  }
  let imageUri = URL.createObjectURL(imageFile);
  context.dispatch('SET_IMAGE_FILE', { imageFile });
  context.dispatch('HANDLE_READY_STATE_CHANGE', {
    readyState: 'unsent',
    imageUri
  });
}

export default selectUnsentImageFile;

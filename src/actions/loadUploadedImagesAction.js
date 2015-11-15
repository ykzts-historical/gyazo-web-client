import Image from '../models/Image';

let loadUploadedImagesAction = async (context, payload) => {
  let image = new Image();
  await image.ready;
  let images = await image.all();
  context.dispatch('SET_UPLOADED_IMAGES', { images });
};

export default loadUploadedImagesAction;

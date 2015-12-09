import Image from '../models/Image';

async function loadUploadedImagesAction(context, payload) {
  let image = new Image();
  await image.ready;
  let images = await image.all();
  images.sort((previousImage, image) =>
    previousImage.uploadedAt < image.uploadedAt ? 1 : -1
  );
  images = images.slice(0, 24);
  context.dispatch('SET_UPLOADED_IMAGES', { images });
}

export default loadUploadedImagesAction;

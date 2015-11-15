import Image from '../models/Image';

let saveUploadedImageAction = async (context, payload) => {
  let { fileName, uri } = payload;
  let uploadedAt = (payload.uploadedAt instanceof Date ? payload.uploadedAt : new Date()).toJSON();
  let image = new Image();
  await image.ready;
  let images = [await image.save({ fileName, uri, uploadedAt })];
  context.dispatch('SET_UPLOADED_IMAGES', { images });
};

export default saveUploadedImageAction;

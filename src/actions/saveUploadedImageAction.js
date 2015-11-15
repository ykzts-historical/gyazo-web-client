import Image from '../models/Image';

let saveUploadedImageAction = async (context, payload) => {
  let { fileName, uri } = payload;
  let uploaded_at = (payload.uploaded_at instanceof Date ? payload.uploaded_at : new Date()).toJSON();
  let image = new Image();
  await image.ready;
  let images = [await image.save({ fileName, uri, uploaded_at })];
  context.dispatch('SET_UPLOADED_IMAGES', { images });
};

export default saveUploadedImageAction;

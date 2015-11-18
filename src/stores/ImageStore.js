import { BaseStore } from 'fluxible/addons';

class ImageStore extends BaseStore {
  static storeName = 'ImageStore';
  static handlers = {
    PREPEND_UPLOADED_IMAGES: 'prependUploadedImages',
    SET_UPLOADED_IMAGES: 'setUploadedImages'
  }

  constructor(dispacher) {
    super(dispacher);
    this.images = [];
  }

  prependUploadedImages({ images }) {
    this.images = [].concat(images, this.images);
    this.emitChange();
  }

  setUploadedImages({ images }) {
    if (Array.isArray(images) && images.length <= 0) {
      return;
    }
    this.images = [].concat(images);
    this.emitChange();
  }

  getImages() {
    let images = [].concat(this.images);
    images.sort((previousImage, image) =>
      previousImage.uploadedAt < image.uploadedAt ? 1 : -1
    );
    return images;
  }

  dehydrate() {
    return {
      images: this.images
    };
  }

  rehydrate(state) {
    this.images = state.images;
  }
}

export default ImageStore;

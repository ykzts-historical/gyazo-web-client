import { BaseStore } from 'fluxible/addons';

class ImageStore extends BaseStore {
  static storeName = 'ImageStore';
  static handlers = {
    SAVE_UPLOADED_IMAGE: 'saveUploadedImage'
  }

  constructor(dispacher) {
    super(dispacher);
    this.images = [];
  }

  saveUploadedImage({ images }) {
    if (Array.isArray(images) && images.length <= 0) {
      return;
    }
    this.images = this.images.concat(images);
    this.emitChange();
  }

  getImages() {
    return this.images;
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

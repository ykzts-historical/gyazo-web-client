import { BaseStore } from 'fluxible/addons';

class ImageStore extends BaseStore {
  static storeName = 'ImageStore';
  static handlers = {
    SET_UPLOADED_IMAGES: 'setUploadedImages'
  }

  constructor(dispacher) {
    super(dispacher);
    this.images = [];
  }

  setUploadedImages({ images }) {
    if (Array.isArray(images) && images.length <= 0) {
      return;
    }
    this.images = this.images.concat(images);
    this.emitChange();
  }

  getImages() {
    let images = [].concat(this.images);
    images.sort((previousImage, image) =>
      previousImage.uploaded_at < image.uploaded_at
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

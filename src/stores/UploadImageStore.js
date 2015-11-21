import { BaseStore } from 'fluxible/addons';

class UploadImageStore extends BaseStore {
  static storeName = 'UploadImageStore';
  static handlers = {
    HANDLE_READY_STATE_CHANGE: 'handleReadyStateChange',
    SET_IMAGE_FILE: 'setImageFile'
  };

  constructor(dispatcher) {
    super(dispatcher);

    this.readyState = 'unsent';
    this.imageFile = null;
    this.imageUri = null;
  }

  handleReadyStateChange({ imageFile, imageUri, readyState }) {
    if (typeof imageFile !== 'undefined') {
      this.imageFile = imageFile;
    }
    if (typeof imageUri !== 'undefined') {
      this.imageUri = imageUri;
    }
    if (typeof readyState !== 'undefined') {
      this.readyState = readyState;
    }
    this.emitChange();
  }

  setImageFile({ imageFile }) {
    this.imageFile = imageFile;
  }

  getCurrentImageFile() {
    return this.imageFile;
  }

  getCurrentImageUri() {
    return this.imageUri;
  }

  getCurrentReadyState() {
    return this.readyState;
  }

  dehydrate() {
    return {
      imageFile: this.getCurrentImageFile(),
      imageUri: this.getCurrentImageUri(),
      readyState: this.getCurrentReadyState()
    }
  }

  rehydrate(state) {
    this.imageFile = state.imageFile;
    this.imageUri = state.imageUri;
    this.readyState = state.readyState;
  }
}

export default UploadImageStore;

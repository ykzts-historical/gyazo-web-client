import { BaseStore } from 'fluxible/addons';

class UploadImageStore extends BaseStore {
  static storeName = 'UploadImageStore';
  static handlers = {
    HANDLE_READY_STATE_CHANGE: 'handleReadyStateChange'
  };

  constructor(dispatcher) {
    super(dispatcher);

    this.readyState = 'unsent';
    this.imageUri = null;
  }

  handleReadyStateChange({ readyState, imageUri }) {
    if (typeof readyState !== 'undefined') {
      this.readyState = readyState;
    }
    if (typeof imageUri !== 'undefined') {
      this.imageUri = imageUri;
    }
    this.emitChange();
  }

  getCurrentReadyState() {
    return this.readyState;
  }

  getCurrentImageUri() {
    return this.imageUri;
  }

  dehydrate() {
    return {
      readyState: this.getCurrentReadyState(),
      imageUri: this.getCurrentImageUri()
    }
  }

  rehydrate(state) {
    this.readyState = state.readyState;
    this.imageUri = state.imageUri;
  }
}

export default UploadImageStore;

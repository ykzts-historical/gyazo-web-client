import { BaseStore } from 'fluxible/addons';

class ErrorStore extends BaseStore {
  static storeName = 'ErrorStore';
  static handlers = {
    HANDLE_ERROR: 'handleError'
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.error = {};
  }

  handleError({ message }) {
    this.error = { message };
    this.emitChange();
  }

  getError() {
    return this.error;
  }

  dehydrate() {
    return {
      error: this.error
    };
  }

  rehydrate(state) {
    this.error = state.error;
  }
}

export default ErrorStore;

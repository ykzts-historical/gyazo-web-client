import { BaseStore } from 'fluxible/addons';

class AlertStore extends BaseStore {
  static storeName = 'AlertStore';
  static handlers = {
    NAVIGATE_START: 'handleNavigateStart',
    SET_ALERT_MESSAGE: 'setAlertMessage'
  };

  constructor(dispatcher) {
    super(dispatcher);

    this.type = 'info';
    this.message = null;
  }

  handleNavigateStart() {
    this.type = 'info';
    this.message = null;
    this.emitChange();
  }

  setAlertMessage({ type, message }) {
    this.type = type || 'info';
    this.message = message;
    this.emitChange();
  }

  getCurrentType() {
    return this.type;
  }

  getCurrentMessage() {
    return this.message;
  }

  dehydrate() {
    return {
      message: this.getCurrentMessage()
    };
  }

  rehydrate(state) {
    this.message = state.message;
  }
}

export default AlertStore;

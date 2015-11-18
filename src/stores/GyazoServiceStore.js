import { BaseStore } from 'fluxible/addons';

class GyazoServiceStore extends BaseStore {
  static storeName = 'GyazoServiceStore';
  static handlers = {
    SET_GYAZO_SERVICES: 'setGyazoServices'
  };

  constructor(dispacher) {
    super(dispacher);
    this.gyazoServices = [];
  }

  setGyazoServices(payload) {
    if (payload.gyazoServices.length < 1) {
      return;
    }
    this.gyazoServices = payload.gyazoServices;
    this.emitChange();
  }

  getGyazoServices() {
    return this.gyazoServices;
  }

  getGyazoService({ id }) {
    let gyazoServices = this.getGyazoServices();
    for (let gyazoService of gyazoServices) {
      if (gyazoService._id === id) {
        return gyazoService;
      }
    }
    return null;
  }

  dehydrate() {
    return {
      gyazoServices: this.getGyazoServices()
    };
  }

  rehydrate(state) {
    this.gyazoServices = state.GyazoServices;
  }
}

export default GyazoServiceStore;

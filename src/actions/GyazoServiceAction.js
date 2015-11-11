import uuid from 'uuid';
import GyazoService from '../models/GyazoService';

const DEFAULT_GYAZO_SERVICE_PROPERTIES = {
  uri: 'https://gyazo.com/upload.cgi',
  gyazoId: '',
  useProxy: true
};

let GyazoServiceAction = async (context, payload) => {
  let gyazoServices = [];
  let props = payload.gyazoService || {};
  let gyazoService = new GyazoService();
  await gyazoService.ready;
  if (!props._id) {
    gyazoServices = await gyazoService.all();
  }
  if (gyazoServices.length < 1) {
    props._id = props._id || uuid.v4();
    props = Object.assign({}, DEFAULT_GYAZO_SERVICE_PROPERTIES, props);
    gyazoServices = [await gyazoService.save(props)];
  }
  context.dispatch('SET_GYAZO_SERVICES', { gyazoServices });
};

export default GyazoServiceAction;

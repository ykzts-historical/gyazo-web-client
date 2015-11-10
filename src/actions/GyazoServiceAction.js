import uuid from 'uuid';
import GyazoService from '../models/GyazoService';

const DEFAULT_GYAZO_SERVICE_PROPERTIES = {
  uri: 'https://gyazo.com/upload.cgi',
  gyazoId: '',
  useProxy: true
};

let GyazoServiceAction = async (context, payload) => {
  let gyazoService = new GyazoService();
  await gyazoService.ready;
  let gyazoServices = await gyazoService.all();
  if (gyazoServices.length < 1) {
    let _id = uuid.v4();
    let props = Object.assign({}, DEFAULT_GYAZO_SERVICE_PROPERTIES, { _id });
    gyazoServices = [await gyazoService.save(props)];
  }
  context.dispatch('SET_GYAZO_SERVICES', { gyazoServices });
};

export default GyazoServiceAction;

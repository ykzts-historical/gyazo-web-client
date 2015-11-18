import GyazoService from '../models/GyazoService';

const DEFAULT_GYAZO_SERVICE_PROPERTIES = {
  uri: 'https://gyazo.com/upload.cgi',
  gyazoId: '',
  useProxy: true
};

async function loadGyazoServiceAction(context) {
  let gyazoService = new GyazoService();
  await gyazoService.ready;
  let gyazoServices = await gyazoService.all();
  if (gyazoServices.length < 1) {
    let props = Object.assign({}, DEFAULT_GYAZO_SERVICE_PROPERTIES);
    gyazoServices = [props];
  }
  context.dispatch('SET_GYAZO_SERVICES', { gyazoServices });
}

export default loadGyazoServiceAction;

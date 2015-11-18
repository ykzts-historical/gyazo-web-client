import uuid from 'uuid';
import GyazoService from '../models/GyazoService';

async function saveGyazoServiceAction(context, { _id, uri, gyazoId, useProxy }) {
  let gyazoService = new GyazoService();
  await gyazoService.ready;
  _id = _id || uuid.v4();
  let gyazoServices = [await gyazoService.save({ _id, uri, gyazoId, useProxy })];
  context.dispatch('SET_GYAZO_SERVICES', { gyazoServices });
}

export default saveGyazoServiceAction;

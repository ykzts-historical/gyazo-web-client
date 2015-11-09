import UploaderHandler from '../src/handlers/UploaderHandler';
import SettingsHandler from '../src/handlers/SettingsHandler';
import ApplicationAction from '../src/actions/ApplicationAction';

export default {
  uploader: {
    path: '/',
    method: 'get',
    handler: UploaderHandler,
    label: 'Uploader',
    action: (context, payload) => Promise.all([
      context.executeAction(ApplicationAction, payload)
    ])
  },
  settings: {
    path: '/settings',
    method: 'get',
    handler: SettingsHandler,
    label: 'Settings',
    action: (context, payload) => Promise.all([
      context.executeAction(ApplicationAction, payload)
    ])
  }
};

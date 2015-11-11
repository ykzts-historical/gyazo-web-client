import { RouteStore } from 'fluxible-router';
import UploaderHandler from '../handlers/UploaderHandler';
import SettingsHandler from '../handlers/SettingsHandler';
import ApplicationAction from '../actions/ApplicationAction';

export default RouteStore.withStaticRoutes({
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
});

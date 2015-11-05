import RootHandler from '../src/handlers/RootHandler';
import AboutHandler from '../src/handlers/AboutHandler';
import ImagesHandler from '../src/handlers/ImagesHandler';
import SettingsHandler from '../src/handlers/SettingsHandler';
import ApplicationAction from '../src/actions/ApplicationAction';

export default {
  root: {
    path: '/',
    method: 'get',
    handler: RootHandler,
    label: 'Root',
    action: (context, payload) => Promise.all([
      context.executeAction(ApplicationAction, payload)
    ])
  },
  about: {
    path: '/about',
    method: 'get',
    handler: AboutHandler,
    label: 'About',
    action: (context, payload) => Promise.all([
      context.executeAction(ApplicationAction, payload)
    ])
  },
  images: {
    path: '/images',
    method: 'get',
    handler: ImagesHandler,
    label: 'Images',
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

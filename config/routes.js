import RootHandler from '../src/handlers/RootHandler';
import AboutHandler from '../src/handlers/AboutHandler';
import ImagesHandler from '../src/handlers/ImagesHandler';
import SettingsHandler from '../src/handlers/SettingsHandler';

export default {
  root: {
    path: '/',
    method: 'get',
    handler: RootHandler,
    label: 'Root'
  },
  about: {
    path: '/about',
    method: 'get',
    handler: AboutHandler,
    label: 'About'
  },
  images: {
    path: '/images',
    method: 'get',
    handler: ImagesHandler,
    label: 'Images'
  },
  settings: {
    path: '/settings',
    method: 'get',
    handler: SettingsHandler,
    label: 'Settings'
  }
};

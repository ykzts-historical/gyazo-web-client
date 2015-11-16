import Fluxible from 'fluxible';
import ApplicationComponent from './components/ApplicationComponent';
import RouteStore from './stores/RouteStore';
import ErrorStore from './stores/ErrorStore';
import GyazoServiceStore from './stores/GyazoServiceStore';
import ImageStore from './stores/ImageStore';

let application = new Fluxible({
  component: ApplicationComponent,
  stores: [
    RouteStore,
    ErrorStore,
    GyazoServiceStore,
    ImageStore
  ]
});

export default application;

import Fluxible from 'fluxible';
import ApplicationComponent from './components/ApplicationComponent';
import RouteStore from './stores/RouteStore';
import GyazoServiceStore from './stores/GyazoServiceStore';

let application = new Fluxible({
  component: ApplicationComponent,
  stores: [
    RouteStore,
    GyazoServiceStore
  ]
});

export default application;

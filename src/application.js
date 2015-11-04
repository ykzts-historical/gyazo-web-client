import Fluxible from 'fluxible';
import ApplicationComponent from './components/ApplicationComponent';
import RouteStore from './stores/RouteStore';

let application = new Fluxible({
  component: ApplicationComponent,
  stores: [
    RouteStore
  ]
});

export default application;

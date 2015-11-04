import React from 'react';
import { provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import NavigationComponent from './NavigationComponent';

class ApplicationComponent extends React.Component {
  render() {
    let Handler = this.props.currentRoute.get('handler');

    return (
      <div className="container">
        <NavigationComponent/>
        <Handler/>
      </div>
    );
  }
}

export default handleHistory(provideContext(ApplicationComponent));

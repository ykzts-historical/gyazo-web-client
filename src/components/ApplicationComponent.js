import React from 'react';
import { provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import NavigationComponent from './NavigationComponent';

class ApplicationComponent extends React.Component {
  render() {
    let Handler = this.props.currentRoute.get('handler');

    return (
      <div id='ApplicationComponent'>
        <NavigationComponent/>
        <div className='container'>
          <Handler/>
        </div>
      </div>
    );
  }
}

export default handleHistory(provideContext(ApplicationComponent));

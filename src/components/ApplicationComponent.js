import React from 'react';
import { provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import NavigationComponent from './NavigationComponent';

//@handleHistory
//@provideContext
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

ApplicationComponent = handleHistory(ApplicationComponent);
ApplicationComponent = provideContext(ApplicationComponent);
export default ApplicationComponent;

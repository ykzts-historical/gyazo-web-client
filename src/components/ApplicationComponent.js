import React from 'react';
import { provideContext, connectToStores } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import ErrorHandler from '../handlers/ErrorHandler';
import NavigationComponent from './NavigationComponent';
import AlertComponent from './AlertComponent';
import ErrorStore from '../stores/ErrorStore';

//@handleHistory
//@provideContext
class ApplicationComponent extends React.Component {
  getHandler() {
    let Handler = this.props.currentRoute && this.props.currentRoute.get('handler');
    if (!Handler) {
      Handler = ErrorHandler;
    }
    return <Handler/>;
  }

  render() {
    return (
      <div id='ApplicationComponent'>
        <NavigationComponent/>
        <div className='container'>
          <AlertComponent/>
          {this.getHandler()}
        </div>
      </div>
    );
  }
}

ApplicationComponent = connectToStores(ApplicationComponent, [ErrorStore], (context) => ({
  error: context.getStore(ErrorStore).getError()
}));
ApplicationComponent = handleHistory(ApplicationComponent);
ApplicationComponent = provideContext(ApplicationComponent);
export default ApplicationComponent;

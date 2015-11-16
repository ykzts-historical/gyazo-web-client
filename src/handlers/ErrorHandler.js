import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import ErrorStore from '../stores/ErrorStore';

class ErrorHandler extends React.Component {
  render() {
    return (
      <div id='ErrorHandler'>
        <p>{this.props.error.message}</p>
      </div>
    );
  }
}

ErrorHandler = connectToStores(ErrorHandler, [ErrorStore], (context) => ({
  error: context.getStore(ErrorStore).getError() || { message: '' }
}));
export default ErrorHandler;

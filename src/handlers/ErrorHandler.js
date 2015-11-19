import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import ErrorStore from '../stores/ErrorStore';

@connectToStores([ErrorStore], (context) => ({
  error: context.getStore(ErrorStore).getError() || { message: '' }
}))
class ErrorHandler extends React.Component {
  render() {
    return (
      <div id='ErrorHandler'>
        <p>{this.props.error.message}</p>
      </div>
    );
  }
}

export default ErrorHandler;

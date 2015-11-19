import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import AlertStore from '../stores/AlertStore';
import showAlertAction from '../actions/showAlertAction';

class AlertComponent extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  static propTypes = {
    type: React.PropTypes.string,
    message: React.PropTypes.string
  };

  static defaultProps = {
    type: 'info',
    message: null
  };

  handleClick() {
    this.context.executeAction(showAlertAction, {
      type: 'info',
      message: null
    });
  }

  render() {
    return (
      <div className='AlertComponent'>
        <div className={`alert alert-${this.props.type}`} role='alert' style={{ display: this.props.message ? 'block' : 'none' }}>
          <button className='close' data-dissmiss='alert' data-label='Close' onClick={::this.handleClick} type='button'>
            <span aria-hidden='true'>&times;</span>
            <span className='sr-only'>Close</span>
          </button>
          <span>{this.props.message}</span>
        </div>
      </div>
    );
  }
}

AlertComponent = connectToStores(AlertComponent, [AlertStore], (context) => {
  let alertStore = context.getStore(AlertStore);
  return {
    type: alertStore.getCurrentType(),
    message: alertStore.getCurrentMessage()
  };
});
export default AlertComponent;

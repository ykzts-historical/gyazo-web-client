import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import AlertStore from '../stores/AlertStore';
import showAlertAction from '../actions/showAlertAction';

@connectToStores([AlertStore], (context) => {
  let alertStore = context.getStore(AlertStore);
  return {
    type: alertStore.getCurrentType(),
    message: alertStore.getCurrentMessage()
  };
})
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

  constructor(props) {
    super(props);

    this.state = {
      visible: !!props.message
    };
    this.timer = undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({ visible: true }, () => {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({ visible: false });
          clearTimeout(this.timer);
          this.timer = undefined;
        }, 3000);
      });
    } else {
      this.setState({ visible: false });
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleClick() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className='AlertComponent'>
        <div className={`alert alert-${this.props.type}`} role='alert' style={{ display: this.state.visible ? 'block' : 'none' }}>
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

export default AlertComponent;

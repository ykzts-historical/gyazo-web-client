import uuid from 'uuid';
import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import GyazoServiceAction from '../actions/GyazoServiceAction';
import RegisterGyazoServiceFormComponent from '../components/RegisterGyazoServiceFormComponent';

class SettingsHandler extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  static propTypes = {
    gyazoServices: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    gyazoServices: []
  };

  componentDidMount() {
    this.context.executeAction(GyazoServiceAction);
  }

  render() {
    return (
      <div id='SettingsHandler'>
        {this.props.gyazoServices.map((gyazoService) => (
          <RegisterGyazoServiceFormComponent key={gyazoService._id} _id={gyazoService._id}/>
        ))}
      </div>
    );
  }
}

SettingsHandler = connectToStores(SettingsHandler, [GyazoServiceStore], (context) => ({
  gyazoServices: context.getStore(GyazoServiceStore).getGyazoServices()
}));
export default SettingsHandler;

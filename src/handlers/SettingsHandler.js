import uuid from 'uuid';
import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import loadGyazoServiceAction from '../actions/loadGyazoServiceAction';
import RegisterGyazoServiceFormComponent from '../components/RegisterGyazoServiceFormComponent';

@connectToStores([GyazoServiceStore], (context) => ({
  gyazoServices: context.getStore(GyazoServiceStore).getGyazoServices()
}))
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
    setImmediate(() => {
      this.context.executeAction(loadGyazoServiceAction);
    });
  }

  render() {
    return (
      <div id='SettingsHandler'>
        {((gyazoService) => gyazoService && (
          <RegisterGyazoServiceFormComponent _id={gyazoService._id}/>
        ))(this.props.gyazoServices[0])}
      </div>
    );
  }
}

export default SettingsHandler;

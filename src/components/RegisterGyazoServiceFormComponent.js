import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import GyazoServiceAction from '../actions/GyazoServiceAction';
import FormGroupHasFeedbackComponent from './FormGroupHasFeedbackComponent';

class RegisterGyazoServiceFormComponent extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  static propTypes = {
    _id: React.PropTypes.string.isRequired,
    currentGyazoService: React.PropTypes.object
  };

  async handleSubmit(event) {
    event.preventDefault();
    let gyazoService = {
      _id: this.props._id,
      uri: this.refs.uri.getCurrentValue(),
      gyazoId: this.refs.gyazoId.getCurrentValue(),
      useProxy: this.refs.useProxy.checked
    };
    await this.context.executeAction(GyazoServiceAction, { gyazoService });
    return false;
  }

  getCurrentUri() {
    let gyazoService = this.props.currentGyazoService;
    return (gyazoService || {}).uri;
  }

  getCurrentGyazoId() {
    let gyazoService = this.props.currentGyazoService;
    return (gyazoService || {}).gyazoId;
  }

  getUseProxy() {
    let gyazoService = this.props.currentGyazoService;
    return (gyazoService || {}).useProxy;
  }

  render() {
    return (
      <div className='RegisterGyazoServiceFormComponent'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <FormGroupHasFeedbackComponent id='gyazo-uri' label='Gyazo URI' name='uri' placeholder='https://' ref='uri' required={true} type='url' value={this.getCurrentUri()}/>
            <FormGroupHasFeedbackComponent id='gyazo-id' label='Gyazo ID' name='gyazo-id' ref='gyazoId' type='text' value={this.getCurrentGyazoId()}/>
            <fieldset className='form-group row'>
              <label className='sr-only'>use Proxy</label>
              <div className='col-sm-offset-2 col-sm-10'>
                <div className='checkbox'>
                  <label>
                    <input defaultChecked={this.getUseProxy()} id='gyazo-use-proxy' name='use-proxy' ref='useProxy' type='checkbox'/>
                    <span>&nbsp;use Proxy</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className='form-group row'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

RegisterGyazoServiceFormComponent = connectToStores(RegisterGyazoServiceFormComponent, [GyazoServiceStore], (context, props) => ({
  currentGyazoService: context.getStore(GyazoServiceStore).getGyazoService({ id: props._id })
}));
export default RegisterGyazoServiceFormComponent;

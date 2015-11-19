import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import saveGyazoServiceAction from '../actions/saveGyazoServiceAction';
import FormGroupHasFeedbackComponent from './FormGroupHasFeedbackComponent';

class RegisterGyazoServiceFormComponent extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  static propTypes = {
    _id: React.PropTypes.string,
    currentGyazoService: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      hasChanged: false
    };
  }

  handleChange(event) {
    this.setState({
      hasChanged: this.hasChanged()
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.context.executeAction(saveGyazoServiceAction, {
      _id: this.props._id,
      uri: this.refs.uri.getCurrentValue(),
      gyazoId: this.refs.gyazoId.getCurrentValue(),
      useProxy: this.refs.useProxy.checked
    });
    this.setState({ hasChanged: false });
    return false;
  }

  hasChanged() {
    return this.refs.uri.hasChanged() || this.refs.gyazoId.hasChanged() || this.refs.useProxy.defaultChecked !== this.refs.useProxy.checked;
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
            <FormGroupHasFeedbackComponent id='gyazo-uri' label='Gyazo URI' name='uri' onChange={this.handleChange.bind(this)} placeholder='https://' ref='uri' required={true} type='url' value={this.getCurrentUri()}/>
            <FormGroupHasFeedbackComponent id='gyazo-id' label='Gyazo ID' name='gyazo-id' onChange={this.handleChange.bind(this)} ref='gyazoId' type='text' value={this.getCurrentGyazoId()}/>
            <fieldset className='form-group row'>
              <label className='sr-only'>use Proxy</label>
              <div className='col-sm-offset-2 col-sm-10'>
                <div className='checkbox'>
                  <label>
                    <input defaultChecked={this.getUseProxy()} id='gyazo-use-proxy' name='use-proxy' onChange={this.handleChange.bind(this)} ref='useProxy' type='checkbox'/>
                    <span>&nbsp;use Proxy</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className='form-group row'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button type='submit' className='btn btn-primary' disabled={!this.state.hasChanged}>Save</button>
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

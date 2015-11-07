import React from 'react';
import camelcase from 'camelcase';
import FormGroupHasFeedbackComponent from './FormGroupHasFeedbackComponent';
import GyazoServiceStore from '../stores/GyazoServiceStore';

class RegisterGyazoServiceFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: 'https://gyazo.com/upload.cgi',
      gyazoId: null,
      useProxy: false
    };
  }

  componentDidMount() {
    let _id = this.props._id;
    let gyazoServiceStore = new GyazoServiceStore;
    (async () => {
      await gyazoServiceStore.ready;
      let gyazoService = await gyazoServiceStore.find(_id);
      this.setState(gyazoService);
    })();
  }

  handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let gyazoServiceStore = new GyazoServiceStore();
    (async () => {
      await gyazoServiceStore.ready;
      let gyazoService = await gyazoServiceStore.save({
        uri: this.refs.uri.getCurrentValue(),
        gyazoId: this.refs.gyazoId.getCurrentValue(),
        useProxy: this.refs.useProxy.checked,
        _id: this.props._id
      });
      this.setState(gyazoService);
    })();
    return false;
  }

  handleChangeUseProxy({ target }) {
    let useProxy = target.checked;
    this.setState({ useProxy });
  }

  render() {
    return (
      <div className='RegisterGyazoServiceFormComponent'>
        <form className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <FormGroupHasFeedbackComponent id='gyazo-uri' label='Gyazo URI' name='uri' placeholder='https://' ref='uri' type='url' value={this.state.uri}/>
            <FormGroupHasFeedbackComponent id='gyazo-id' label='Gyazo ID' name='gyazo-id' ref='gyazoId' type='text' value={this.state.gyazoId}/>
            <fieldset className='form-group'>
              <label className='sr-only'>use Proxy</label>
              <div className='col-sm-offset-2 col-sm-10'>
                <div className='checkbox'>
                  <label>
                    <input checked={this.state.useProxy} id='gyazo-use-proxy' name='use-proxy' onChange={this.handleChangeUseProxy.bind(this)} ref='useProxy' type='checkbox'/>
                    <span>&nbsp;use Proxy</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button type='submit' className='btn btn-default'>Save</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default RegisterGyazoServiceFormComponent;

import React from 'react';
import FormGroupHasFeedbackComponent from './FormGroupHasFeedbackComponent';
import GyazoService from '../models/GyazoService';

class RegisterGyazoServiceFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: 'https://gyazo.com/upload.cgi',
      gyazoId: '',
      useProxy: false
    };
  }

  componentDidMount() {
    let _id = this.props._id;
    let model = new GyazoService();
    (async () => {
      await model.ready;
      let gyazoService = await model.find(_id);
      if (!gyazoService) {
        return;
      }
      this.setState(gyazoService);
    })();
  }

  handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let model = new GyazoService();
    (async () => {
      await model.ready;
      let gyazoService = await model.save({
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <FormGroupHasFeedbackComponent id='gyazo-uri' label='Gyazo URI' name='uri' placeholder='https://' ref='uri' required={true} type='url' value={this.state.uri}/>
            <FormGroupHasFeedbackComponent id='gyazo-id' label='Gyazo ID' name='gyazo-id' ref='gyazoId' type='text' value={this.state.gyazoId}/>
            <fieldset className='form-group row'>
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

export default RegisterGyazoServiceFormComponent;

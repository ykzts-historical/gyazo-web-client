import React from 'react';
import camelcase from 'camelcase';

class SettingsHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyazoUri: 'https://gyazo.com/upload.cgi'
    };
  }

  componentDidMount() {
    let inputFields = document.querySelectorAll('.has-feedback .form-control');
    [].map.call(inputFields, this._validation.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    // todo...
    return false;
  }

  handleChange(event) {
    let state = {};
    let inputField = event.target;
    state[camelcase(inputField.id)] = inputField.value;
    this.setState(state);
    this._validation(inputField);
  }

  _validation(inputField) {
    let validity = inputField.validity;
    let formGroup = (target => {
      while ((target = (target || {}).parentNode) !== null) {
        if (target.classList.contains('form-group')) {
          return target;
        }
      }
      return null;
    })(inputField);
    let formControlFeedback = formGroup ? formGroup.querySelector('.form-control-feedback') : null;
    if (formGroup) {
      formGroup.classList[validity.valid ? 'add' : 'remove']('has-success');
      formGroup.classList[validity.valid ? 'remove' : 'add']('has-error');
    }
    if (formControlFeedback) {
      formControlFeedback.classList[validity.valid ? 'add' : 'remove']('glyphicon-ok');
      formControlFeedback.classList[validity.valid ? 'remove' : 'add']('glyphicon-remove');
    }
    return validity.valid;
  }

  render() {
    return (
      <div className='container'>
        <form className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <fieldset className='form-group has-feedback'>
              <label htmlFor='gyazo-uri' className='col-sm-2 control-label'>Gyazo URI</label>
              <div className='col-sm-10'>
                <input type='url' value={this.state.gyazoUri} placeholder='https://' required='required' onChange={this.handleChange.bind(this)} className='form-control' id='gyazo-uri'/>
                <span className='glyphicon form-control-feedback' aria-hidden='true'/>
              </div>
            </fieldset>
            <fieldset className='form-group has-feedback'>
              <label htmlFor='gyazo-id' className='col-sm-2 control-label'>Gyazo ID</label>
              <div className='col-sm-10'>
                <input type='text' value={this.state.gyazoId} onChange={this.handleChange.bind(this)} className='form-control' id='gyazo-id'/>
                <span className='glyphicon form-control-feedback' aria-hidden='true'/>
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

export default SettingsHandler;

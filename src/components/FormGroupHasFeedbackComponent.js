import React from 'react';

class FormGroupHasFeedbackComponent extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    required: false,
    type: 'text',
    value: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      valid: false
    };
  }

  componentDidMount() {
    let formControl = this.refs.formControl;
    let valid = this._validate(formControl);
    this.setState({ valid });
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let valid = this._validate(target);
    this.setState({ value, valid }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange.call(this, event);
      }
    });
    return false;
  }

  getCurrentValue() {
    return this.state.value;
  }

  getValidationMessage() {
    let formControl = this.refs.formControl || {};
    return formControl.validationMessage || '';
  }

  hasChanged() {
    return this.props.value !== this.state.value;
  }

  _validate(target) {
    let validity = target.validity;
    let valid = validity.valid;
    return valid;
  }

  render() {
    return (
      <div className='FormGroupHasFeedbackComponent'>
        <fieldset className={`form-group has-${this.state.valid ? 'success' : 'error'} row`}>
          <label className='col-sm-2 control-label' htmlFor={this.props.id}>{this.props.label}</label>
          <div className='col-sm-10'>
            <input className={`form-control form-control-${this.state.valid ? 'success' : 'error'}`} id={this.props.id} name={this.props.name} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder} ref='formControl' required={this.props.required} type={this.props.type} value={this.getCurrentValue()}/>
            {((validationMessage) => (
              <span className='small text-danger' style={{ display: validationMessage ? 'inline' : 'none'}}>{validationMessage}</span>
            ))(this.getValidationMessage())}
          </div>
        </fieldset>
      </div>
    );
  }
}

export default FormGroupHasFeedbackComponent;

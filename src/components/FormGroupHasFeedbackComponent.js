import React from 'react';

class FormGroupHasFeedbackComponent extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'text',
    required: false,
    value: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      valid: false
    };
  }

  componentDidMount() {
    let target = this.refs.formControl;
    let valid = this._validate(target);
    this.setState({ valid });
  }

  handleChange({ target }) {
    let value = target.value;
    let valid = this._validate(target);
    this.setState({ value, valid });
    return false;
  }

  getCurrentValue() {
    if (this.state.value === null || typeof(this.state.value) === 'undefined') {
      return this.props.value;
    }
    return this.state.value;
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
          </div>
        </fieldset>
      </div>
    );
  }
}

export default FormGroupHasFeedbackComponent;

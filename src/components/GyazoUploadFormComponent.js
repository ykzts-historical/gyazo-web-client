import uuid from 'uuid';
import React from 'react';
import GyazoServiceStore from '../stores/GyazoServiceStore';

const EXTERNAL_URI_PATTERN = /^https?:\/\//;

class GyazoUploadFormComponent extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    uri: React.PropTypes.string.isRequired,
    gyazoId: React.PropTypes.string.isRequired,
    useProxy: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    uri: 'https://gyazo.com/upload.cgi',
    gyazoId: '',
    useProxy: true
  }

  constructor(props) {
    super(props);

    this.state = {
      readyState: 'unsent',
      imageUri: null
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let image = (this.refs.gyazoImageData.files || [])[0];
    if (!image) {
      return false;
    }
    let formData = new FormData();
    formData.append('id', this.props.gyazoId);
    formData.append('imagedata', image);
    let request = new Request(this.props.uri, {
      method: event.target.method,
      body: formData
    });
    (async () => {
      this.setState({ readyState: 'opened' });
      let response = await fetch(request);
      this.setState({ readyState: 'loading' });
      let imageUri = await response.text();
      this.setState({ readyState: 'done', imageUri });
    })();
    return false;
  }

  handleChange(event) {
    event.preventDefault();
    let { target: { files: [file, ..._] } } = event;
    if (typeof file === 'undefined') {
      return false;
    }
    let imageUri = URL.createObjectURL(file);
    this.setState({ imageUri });
    return false;
  }

  render() {
    return (
      <div className='GyazoUploadFormComponent'>
        <form className='form-horizontal' method='post' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset className='card'>
            <img className='card-img-top img-responsive' ref='image' src={this.state.imageUri || ''} style={{display: this.state.imageUri ? 'inline-block' : 'none'}}/>
            <div className='card-block'>
              <label className='file' htmlFor='gyazo-image' style={{display: this.state.imageUri ? 'none' : 'inline-block', maxWidth: '100%'}}>
                <input className='file' id='gyazo-image' name='imagedata' onChange={this.handleChange.bind(this)} ref='gyazoImageData' required={true} style={{maxWidth: '100%'}} type='file'/>
                <span className='file-custom'/>
              </label>
              {((imageUri) => {
                if (!imageUri) {
                  return;
                } else if (EXTERNAL_URI_PATTERN.test(imageUri)) {
                  return (
                    <a href={imageUri} style={{wordBreak: 'break-all', wordWrap: 'break-word'}}>{imageUri}</a>
                  );
                } else {
                  return (
                    <button className='btn btn-primary' disabled={this.state.readyState !== 'unsent'} type='submit'>
                      {((readyState) => readyState !== 'unsent' && (
                        <i className='fa fa-spin fa-spinner'/>
                      ))(this.state.readyState)}
                      <span className='label'>{this.state.readyState === 'unsent' ? 'Upload' : 'Uploading...'}</span>
                    </button>
                  );
                }
              })(this.state.imageUri)}
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default GyazoUploadFormComponent;

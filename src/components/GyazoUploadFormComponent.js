import uuid from 'uuid';
import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import UploadImageStore from '../stores/UploadImageStore';
import ImageStore from '../stores/ImageStore';
import selectUnsentImageFile from '../actions/selectUnsentImageFile';
import uploadImageAction from '../actions/uploadImageAction';

class GyazoUploadFormComponent extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  static propTypes = {
    gyazoId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    imageFile: React.PropTypes.object,
    imageUri: React.PropTypes.string,
    readyState: React.PropTypes.string.isRequired,
    uri: React.PropTypes.string.isRequired,
    useProxy: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    gyazoId: '',
    imageFile: null,
    imageUri: null,
    readyState: 'unsent',
    uri: 'https://gyazo.com/upload.cgi',
    useProxy: true
  };

  handleSubmit(event) {
    event.preventDefault();
    let imageFile = this.props.imageFile;
    if (!(imageFile instanceof File)) {
      return false;
    }
    this.context.executeAction(uploadImageAction, {
      uri: this.props.uri,
      gyazoId: this.props.gyazoId,
      imageFile
    });
    return false;
  }

  handleChange(event) {
    event.preventDefault();
    let imageFile = (this.refs.gyazoImageData.files || [])[0];
    if (!(imageFile instanceof File)) {
      return false;
    }
    this.context.executeAction(selectUnsentImageFile, { imageFile });
    return false;
  }

  canSubmit() {
    return ['unsent', 'done'].includes(this.props.readyState);
  }

  render() {
    return (
      <div className='GyazoUploadFormComponent'>
        <form className='form-horizontal' method='post' onSubmit={::this.handleSubmit}>
          <fieldset className='card'>
            <img className='card-img-top img-responsive' ref='image' src={this.props.imageUri || ''} style={{display: this.props.imageUri ? 'inline-block' : 'none'}}/>
            <div className='card-block'>
              <label className='file' htmlFor='gyazo-image' style={{display: this.props.imageUri ? 'none' : 'inline-block', maxWidth: '100%'}}>
                <input accept='image/png' className='file' id='gyazo-image' name='imagedata' onChange={::this.handleChange} ref='gyazoImageData' style={{maxWidth: '100%'}} type='file'/>
                <span className='file-custom'/>
              </label>
              {((imageUri) => imageUri && (
                <button className='btn btn-primary' disabled={!this.canSubmit()} type='submit'>
                  {((readyState) => !this.canSubmit() && (
                    <i className='fa fa-spin fa-spinner'/>
                  ))(this.props.readyState)}
                  <span className='label'>{this.canSubmit() ? 'Upload' : 'Uploading...'}</span>
                  </button>
              ))(this.props.imageUri)}
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

GyazoUploadFormComponent = connectToStores(GyazoUploadFormComponent, [UploadImageStore], (context) => {
  let uploadImageStore = context.getStore(UploadImageStore);
  return {
    imageFile: uploadImageStore.getCurrentImageFile(),
    imageUri: uploadImageStore.getCurrentImageUri(),
    readyState: uploadImageStore.getCurrentReadyState()
  };
});
export default GyazoUploadFormComponent;

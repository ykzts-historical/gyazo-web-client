import uuid from 'uuid';
import React from 'react';
import GyazoServiceStore from '../stores/GyazoServiceStore';

const EXTERNAL_URI_PATTERN = /^https?:\/\//;

class GyazoUploadFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyazoServices: [],
      imageUri: null
    };
  }

  componentDidMount() {
    let gyazoServiceStore = new GyazoServiceStore();
    (async () => {
      await gyazoServiceStore.ready;
      let gyazoService = await gyazoServiceStore.first((gyazoService) => typeof gyazoService._id !== 'undefined');
      if (typeof gyazoService === 'undefined') {
        gyazoService = await gyazoServiceStore.save({
          _id: uuid.v4(),
          uri: 'https://gyazo.com/upload.cgi',
          gyazoId: '',
          useProxy: true
        });
      }
      this.setState({ gyazoService });
    })();
  }

  handleSubmit(event) {
    event.preventDefault();
    let _id = this.refs.gyazoServiceId.value;
    let image = (this.refs.gyazoImageData.files || [])[0];
    let method = event.target.method;
    let gyazoServiceStore = new GyazoServiceStore();
    (async () => {
      await gyazoServiceStore.ready;
      let gyazoService = await gyazoServiceStore.find(_id);
      let uri = gyazoService.uri;
      let formData = new FormData();
      formData.append('id', gyazoService.gyazoId);
      formData.append('imagedata', image);
      let response = await fetch(uri, {
        method: method,
        body: formData,
        credentials: 'cors'
      });
      let headers = response.headers;
      let imageUri = await response.text();
      let newGyazoId = headers.get('x-gyazo-id');
      if (newGyazoId) {
        gyazoService.gyazoId = newGyazoId;
        await gyazoServiceStore.save(gyazoService);
      }
      this.setState({ imageUri });
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
            <label htmlFor='gyazo-image'>
              <input className='sr-only' id='gyazo-image' name='imagedata' onChange={this.handleChange.bind(this)} ref='gyazoImageData' required={true} type='file'/>
              <img className='card-img-top img-responsive' data-src='holder.js/512x512?auto=yes' ref='image' src={this.state.imageUri || null}/>
            </label>
            {((imageUri) => {
              if (!imageUri) {
                return;
              }
              if (EXTERNAL_URI_PATTERN.test(imageUri)) {
                return (
                  <footer className='card-footer'>
                    <a href={this.state.imageUri} style={{wordBreak: 'break-all', wordWrap: 'break-word'}}>{this.state.imageUri}</a>
                  </footer>
                );
              } else {
                return (
                  <div className='card-block'>
                    <button type='submit' className='btn btn-primary'>Upload</button>
                  </div>
                )
              }
            })(this.state.imageUri)}
            {((gyazoService) => gyazoService && (
              <input ref='gyazoServiceId' type='hidden' value={gyazoService._id}/>
            ))(this.state.gyazoService)}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default GyazoUploadFormComponent;

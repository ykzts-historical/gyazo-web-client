import uuid from 'uuid';
import React from 'react';
import GyazoServiceStore from '../stores/GyazoServiceStore';

class GyazoUploadFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyazoServices: []
    };
  }

  componentDidMount() {
    let gyazoServiceStore = new GyazoServiceStore();
    (async () => {
      await gyazoServiceStore.ready;
      let gyazoServices = await gyazoServiceStore.all();
      if (gyazoServices.length < 1) {
        let gyazoService = await gyazoServiceStore.save({
          _id: uuid.v4(),
          uri: 'https://gyazo.com/upload.cgi',
          gyazoId: '',
          useProxy: true
        });
        gyazoServices = [ gyazoService ];
      }
      this.setState({ gyazoServices });
    })();
  }

  handleSubmit(event) {
    event.preventDefault();
    let _id = this.refs.gyazoServiceId.value;
    let image = (this.refs.gyazoImageData.files || [])[0];
    (async (gyazoServiceStore) => {
      await gyazoServiceStore.ready;
      let gyazoService = await gyazoServiceStore.find(_id);
      let uri = gyazoService.uri;
      let formData = new FormData();
      formData.append('id', gyazoService.gyazoId);
      formData.append('imagedata', image);
      let response = await fetch(uri, {
        method: 'post',
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
      console.log(imageUri);
    })(new GyazoServiceStore());
    return false;
  }

  render() {
    return (
      <div className='GyazoUploadFormComponent'>
        <form method='post' className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div className='form-group'>
              <label htmlFor='gyazo-image' required={true} className='col-sm-2 control-label'>Image</label>
              <div className='col-sm-10'>
                <input id='gyazo-image' name='imagedata' ref='gyazoImageData' type='file'/>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='gyazo-service' className='col-sm-2 control-label'>Gyazo Service</label>
              <div className='col-sm-10'>
                <select className='form-control' id='gyazo-service' name='gyazo-service' ref='gyazoServiceId'>
                  {this.state.gyazoServices.map((gyazoService) => (
                    <option value={gyazoService._id} label={gyazoService.name || gyazoService.uri} key={gyazoService._id}/>
                  ))}
                </select>
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button type='submit' className='btn btn-primary'>Upload</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default GyazoUploadFormComponent;

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
    // todo...
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
                <input type='file' id='gyazo-image' name='imagedata'/>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='gyazo-service' className='col-sm-2 control-label'>Gyazo Service</label>
              <div className='col-sm-10'>
                <select className='form-control' id='gyazo-service' name='gyazo-service'>
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

import uuid from 'uuid';
import React from 'react';
import GyazoUploadFormComponent from '../components/GyazoUploadFormComponent';
import GyazoService from '../models/GyazoService';

class UploaderHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gyazoServices: []
    };
  }

  componentDidMount() {
    let model = new GyazoService();
    (async () => {
      await model.ready;
      let gyazoServices = await model.all();
      if (gyazoServices.length < 1) {
        gyazoServices = [await model.save({
          _id: uuid.v4(),
          uri: 'https://gyazo.com/upload.cgi',
          gyazoId: '',
          useProxy: true
        })];
      }
      this.setState({ gyazoServices });
    })();
  }

  render() {
    return (
      <div id='UploaderHandler'>
        {((gyazoService) => gyazoService && (
          <GyazoUploadFormComponent gyazoId={gyazoService.gyazoId} id={gyazoService._id} uri={gyazoService.uri} useProxy={gyazoService.useProxy}/>
        ))(this.state.gyazoServices[0])}
      </div>
    );
  }
}

export default UploaderHandler;

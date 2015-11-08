import uuid from 'uuid';
import React from 'react';
import GyazoUploadFormComponent from '../components/GyazoUploadFormComponent';
import GyazoServiceStore from '../stores/GyazoServiceStore';

class UploaderHandler extends React.Component {
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
        gyazoServices = [await gyazoServiceStore.save({
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

import uuid from 'uuid';
import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import GyazoServiceAction from '../actions/GyazoServiceAction';
import GyazoUploadFormComponent from '../components/GyazoUploadFormComponent';
import UploadedImagesComponent from '../components/UploadedImagesComponent';

class UploaderHandler extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    setImmediate(() => {
      this.context.executeAction(GyazoServiceAction);
    });
  }

  render() {
    return (
      <div id='UploaderHandler'>
        {((gyazoService) => gyazoService && (
          <GyazoUploadFormComponent gyazoId={gyazoService.gyazoId} id={gyazoService._id} uri={gyazoService.uri} useProxy={gyazoService.useProxy}/>
        ))(this.props.gyazoServices[0])}
        <UploadedImagesComponent/>
      </div>
    );
  }
}

UploaderHandler = connectToStores(UploaderHandler, [GyazoServiceStore], (context) => ({
  gyazoServices: context.getStore(GyazoServiceStore).getGyazoServices()
}));
export default UploaderHandler;

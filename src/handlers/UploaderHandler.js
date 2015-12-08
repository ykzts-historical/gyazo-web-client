import uuid from 'uuid';
import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import GyazoServiceStore from '../stores/GyazoServiceStore';
import loadGyazoServiceAction from '../actions/loadGyazoServiceAction';
import GyazoUploadFormComponent from '../components/GyazoUploadFormComponent';
import UploadedImagesComponent from '../components/UploadedImagesComponent';

@connectToStores([GyazoServiceStore], (context) => ({
  gyazoServices: context.getStore(GyazoServiceStore).getGyazoServices()
}))
class UploaderHandler extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    setImmediate(() => {
      this.context.executeAction(loadGyazoServiceAction);
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

export default UploaderHandler;

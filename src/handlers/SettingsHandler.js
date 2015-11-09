import uuid from 'uuid';
import React from 'react';
import RegisterGyazoServiceFormComponent from '../components/RegisterGyazoServiceFormComponent';
import GyazoService from '../models/GyazoService';

class SettingsHandler extends React.Component {
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
        gyazoServices = [{
          _id: uuid.v4()
        }];
      }
      this.setState({
        gyazoServices: gyazoServices
      });
    })();
  }

  render() {
    return (
      <div id='SettingsHandler'>
        {this.state.gyazoServices.map((gyazoService) => (
          <RegisterGyazoServiceFormComponent key={gyazoService._id} _id={gyazoService._id}/>
        ))}
      </div>
    );
  }
}

export default SettingsHandler;

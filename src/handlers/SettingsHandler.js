import uuid from 'uuid';
import React from 'react';
import RegisterGyazoServiceFormComponent from '../components/RegisterGyazoServiceFormComponent';
import GyazoServiceStore from '../stores/GyazoServiceStore';

class SettingsHandler extends React.Component {
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

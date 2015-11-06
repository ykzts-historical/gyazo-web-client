import React from 'react';
import RegisterGyazoServiceFormComponent from '../components/RegisterGyazoServiceFormComponent';
import GyazoServiceStore from '../stores/GyazoServiceStore';

class SettingsHandler extends React.Component {
  render() {
    return (
      <div id='SettingsHandler'>
        <RegisterGyazoServiceFormComponent primaryKey='pduDrEHE7L7nSiVKF8'/>
      </div>
    );
  }
}

export default SettingsHandler;

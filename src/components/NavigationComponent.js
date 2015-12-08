import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { NavLink } from 'fluxible-router';
import RouteStore from '../stores/RouteStore';

@connectToStores([RouteStore], (context) => ({
  currentRoute: context.getStore(RouteStore).getCurrentRoute()
}))
class NavigationComponent extends React.Component {
  static contentTypes = {
    getStore: React.PropTypes.func.isRequired
  };

  static propTypes = {
    currentRoute: React.PropTypes.object
  };

  render() {
    return (
      <div id='NavigationComponent'>
        <nav className='bg-faded navbar navbar-fixed-top navbar-light'>
          <NavLink className='navbar-brand' routeName='uploader'>Gy</NavLink>
          <ul className='nav navbar-nav pull-right' style={{ display: this.props.currentRoute && this.props.currentRoute.get('name') === 'settings' ? 'none' : 'block' }}>
            <li className='nav-item'>
              <NavLink className='nav-link' routeName='settings'>
                <i className='fa fa-cog fa-lg'/>
                <span className='hidden-xs-down'>&nbsp;Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;

import React from 'react';
import { NavLink } from 'fluxible-router';

class NavigationComponent extends React.Component {
  render() {
    return (
      <div id='NavigationComponent'>
        <nav className='bg-faded navbar navbar-fixed-top navbar-light'>
          <NavLink className='navbar-brand' routeName='uploader'>Gy</NavLink>
          <ul className='nav navbar-nav pull-right'>
            <li className='nav-item'>
              <NavLink activeClass='active' className='nav-link' routeName='settings'>
                <i className='fa fa-cog fa-lg'/>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;

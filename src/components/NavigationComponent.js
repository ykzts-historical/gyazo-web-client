import React from 'react';
import { NavLink } from 'fluxible-router';

class NavigationComponent extends React.Component {
  render() {
    return (
      <div id='NavigationComponent'>
        <nav className='bg-faded navbar navbar-light'>
          <NavLink className='navbar-brand' routeName='root'>Gy</NavLink>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <NavLink activeClass='active' className='nav-link' routeName='about'>About</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClass='active' className='nav-link' routeName='images'>Images</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClass='active' className='nav-link' routeName='settings'>Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;

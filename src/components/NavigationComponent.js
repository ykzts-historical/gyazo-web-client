import React from 'react';
import { NavLink } from 'fluxible-router';

class NavigationComponent extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <header className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#global-navbar' aria-expanded='false'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <NavLink routeName='root' className='navbar-brand'>Gy</NavLink>
        </header>
        <div className='collapse navbar-collapse' id='global-navbar'>
          <ul className='nav navbar-nav'>
            <li>
              <NavLink routeName='about' activeClass='active'>About</NavLink>
            </li>
            <li>
              <NavLink routeName='images' activeClass='active'>Images</NavLink>
            </li>
            <li>
              <NavLink routeName='settings' activeClass='active'>Settings</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationComponent;

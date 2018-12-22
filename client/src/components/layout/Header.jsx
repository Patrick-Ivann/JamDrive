import React, { Component } from 'react';
import logo from '../../static/image/jp_logo.png'
class Header extends Component {


render() {
  return (
    <header>
    <h1 id="Title">JamDrive</h1>
    <img id="logo" src={logo} alt="Jampops logo"/>
      <nav>
        <ul>
          <li>Rechercher un fichier</li>
        </ul>
      </nav>
    </header>
    );
  }
}

export default Header;

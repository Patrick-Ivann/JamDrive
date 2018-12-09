import React, { Component } from 'react';

class Header extends Component {
  constructor(props){
    super(props);

  }


render() {
  return (
    <header>
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

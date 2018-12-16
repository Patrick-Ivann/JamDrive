import React, { Component } from 'react';

import Header from './components/Header';
import UE_container from './components/UE_container';

class App extends Component {


  render() {
    return (
      <div>
        <Header/>
        <UE_container UE_name="Web"/>
      </div>
    );
  }
}

export default App;

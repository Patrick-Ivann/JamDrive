import React, { Component } from 'react';

import Header from './components/Header';
import UE_container from './components/UE_container';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {date : new Date()};
  }

  Greeting() {
    if (this.props.comin == 1) {
      return <p>Welcome</p>;
    }
    else {
      return <p>Goodbye</p>;
    }
  }
  render() {
    return (
      <div>
        <Header/>
        <UE_container UE_name="Sciences"/>
      </div>
    );
  }
}

export default App;

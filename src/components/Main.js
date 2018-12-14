import React, { Component } from 'react';
import addFile from '../image/addFile.png'
import UE_container from './UE_container';

class Main extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.addFileClick = this.addFileClick.bind(this);
  }



render() {
  return (
        <main>
            <img className='addFile' src={addFile} alt="Add a file here" />
            <UE_container UE_name="Web"/>
            <UE_container UE_name="Yikes"/>
        </main>
    );
  }
}

export default Main;

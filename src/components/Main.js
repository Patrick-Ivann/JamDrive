import React, { Component } from 'react';
import addFile from '../image/addFile.png'
import UE_container from './UE_container';
import FormFile from './FormFile';

class Main extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.addFileClick = this.addFileClick.bind(this);

    this.state={
      isAddFileClicked : false
    }
  }
    addFileClick(){
      this.setState(prevState => ({
        isAddFileClicked: !prevState.isAddFileClicked
      }))
    }


render() {
  return (
        <main>
            <img className='addFile' onClick={this.addFileClick} src={addFile} alt="Add a file here" />
            {this.state.isAddFileClicked? <FormFile onClick={this.addFileClick.bind(this)} /> : null}
            <UE_container UE_name="Web"/>
            <UE_container UE_name="Yikes"/>
        </main>
    );
  }
}

export default Main;

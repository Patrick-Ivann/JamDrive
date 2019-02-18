import React, { Component } from 'react';

import FormFile from './FormFile';
import Unites from './ue/Unites';

class Main extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.addFileClick = this.addFileClick.bind(this);
    this.addFileClickRessources = this.addFileClickRessources.bind(this)
    this.state={
      isAddFileClicked : false,
      isAddFileRessourceClicked :false
    }
  }
    addFileClick(){
      this.setState(prevState => ({
        isAddFileClicked: !prevState.isAddFileClicked
      }))
    }

  addFileClickRessources() {
    this.setState(prevState => ({
      isAddFileRessourceClicked: !prevState.isAddFileRessourceClicked
    }))
  }
   


render() {
  return (
        <main>

            <FormFile function={this.addFileClick.bind(this)} />

            {/*this.state.isAddFileClicked? <FormFile function={this.addFileClick.bind(this)} /> : null*/}

            {/* <UniteListe></UniteListe> */}



      {this.props.estConnectee ? <Unites estConnectee={this.props.estConnectee}></Unites> : <Unites></Unites> }

        </main>
    );
  }
}


export default Main;

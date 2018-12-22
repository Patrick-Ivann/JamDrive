import React, { Component } from 'react';
import addFile from '../static/image/addFileHere.png'
import UE_container from './ue/UE_container';
import UniteListe from "./ue/UniteListe";
import FormFile from './FormFile';
import Unites from './ue/Unites';

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
            {this.state.isAddFileClicked? <FormFile function={this.addFileClick.bind(this)} /> : null}

            {/* <UniteListe></UniteListe> */}

            <Unites></Unites>

{/* //Données du HOC pour décider quel prosit est envoyé dans quel conteneur dans quel tableau
            <UE_container UE_name="Web" dataUE={this.dataWeb[]} />
            <UE_container UE_name="Thermodynamique" dataUE={this.dataThermo[]} />
            <UE_container UE_name="Sciences Humaine" dataUE={this.dataHumain[]} />
            <UE_container UE_name="Mécanique" dataUE={this.dataMeca[]} />
            <UE_container UE_name="Architectures Réseaux" dataUE={this.dataReseau[]} /> */}
        </main>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import cross from '../image/cross.png'


class FormFile extends Component {



render() {
  return (
    <div id="opacity">
      <div id="formulaire">
      <img id="closeButton" src={cross} onClick={this.props.onClick} alt="close button"/>
      <h1>Nouveau Fichier</h1>

      <form>
        <label id="formUE">  UE
            <input type="checkbox" name="UE" value="Science"/> Sciences de base
            <input type="checkbox" name="UE" value="Wen"/> Développement Web
            <input type="checkbox" name="UE" value="Humain"/> Sciences humaines <br/>
            <input type="checkbox" name="UE" value="Meca"/> Mécanique
            <input type="checkbox" name="UE" value="Reseaux"/> Architectures réseaux<br/> </label>
        <label id="formProsit">  Nom du prosit
          <input type="text" name="Nom" /> </label>
        <br/>
        <label>  Allez <input type="radio" name="fileType" value="Allez" /><br/> </label>
        <label>  Retour <input type="radio" name="fileType" value="Retour" /><br/> </label>

        <label>  Validé par la classe
            <input type="checkbox" name="checkType" value="Classe"/><br/> </label>
        <label>  Validé par le tuteur
            <input type="checkbox" name="checkType" value="Tuteur"/> </label>
      </form>
      </div>
    </div>
    );
  }
}

export default FormFile;

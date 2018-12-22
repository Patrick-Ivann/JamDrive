import React, { Component } from 'react';
import cross from '../static/image/cross.png'
import addFileHere from '../static/image/addFileHere.png'


import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class FormFile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fileName: "ok"
        }

        this.getFileName = this.getFileName.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.errors)

        const prositData = {

           



        }

        this.props.ajouterProsit(prositData)

    }

    componentDidUpdate(prevProps, prevState) {


        if (prevProps.export && (typeof this.props.export !== 'object')) {


           

        }


    }


    

    getFileName() {
        this.setState({ fileName: this.getFile.value() });
    }

    render() {
        return (
            <div id="opacity">
                <div id="formulaire">

                    <img id="closeButton" src={cross} onClick={this.props.function} alt="close button" />
                    <h1>Nouveau Fichier</h1>
                    <hr />
                    <form>
                        <label id="formUE">  UE
            <input type="radio" name="UE" value="Science" /> Sciences de base
            <input type="radio" name="UE" value="Wen" /> Développement Web
            <input type="radio" name="UE" value="Humain" /> Sciences humaines <br />
                            <input type="radio" name="UE" value="Meca" /> Mécanique
            <input type="radio" name="UE" value="Reseaux" /> Architectures réseaux<br /> </label>
                        <label id="formProsit">  Nom du prosit
          <input type="text" name="Nom" /> </label>
                        <br />
                        <label>  Allez <input type="radio" name="fileType" value="Allez" /><br /> </label>
                        <label>  Retour <input type="radio" name="fileType" value="Retour" /><br /> </label>

                        <label>  Validé par la classe
            <input type="checkbox" name="checkType" value="Classe" /><br /> </label>
                        <label>  Validé par le tuteur
            <input type="checkbox" name="checkType" value="Tuteur" /> </label>
                        <label id="lblFile" htmlFor="file"> Ajouter le fichier <br /> <img id="addFileHere" src={addFileHere} alt="add file here !" /> </label>
                        <input type="file" onChange={this.getFileName} name="file" ref="getFile" id="file" accept=".doc,.docx" />

                    </form>
                </div>
            </div>
        );
    }
}

FormFile.propTypes = {
    ajouterProsit: PropTypes.func.isRequired,
    prosit: PropTypes.object.isRequired,
    ressource: PropTypes.object.isRequired


}

const mapStateToProps = state => ({

    prosit: state.prosit,
    ressource: state.ressource,
    errors: state.errors

})


export default connect(mapStateToProps,{})(FormFile);

import React, { Component } from 'react';
import cross from '../static/image/cross.png'
import CreatableSelect from 'react-select/lib/Creatable';

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { ajouterProsit } from "../actions/prositActions";
import FormulaireFichier from './ue/FormulaireFichier';
import InputAutoSuggest from './common/InputAutoSuggest';

class FormFile extends Component {

    constructor(props) {
        super(props)




        this.state = {
            unite: "",
            nomProsit: "",
            nomScribe: "",
            validation: "",
            retourAjoutProsit: "",
            motsClef: ""
            // errors : null

        }
        this.input = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });




    }



    handleSubmit(event) {
        event.preventDefault();




        const prositData = {}


        Object.keys(this.state).forEach(element => {
            prositData[element] = this.state[element]
        });

       /* if (this.input) {


            if (this.input.current.inputSugg.current.state.value) {
                this.setState({
                    unite: this.input.current.inputSugg.current.state.value
                })

                prositData["unite"] = this.state["unite"]


            }
        }*/





        console.error(prositData)

        this.props.ajouterProsit(prositData)

        Object.keys(this.state).forEach(element => {

            this.setState({
                [element]: ""
            })
        });

    }





    componentDidUpdate(prevProps, prevState) {



        if (prevProps.prosit !== this.props.prosit) {

            console.log(this.props.prosit.prosit._id)

            let id = this.props.prosit.prosit._id

            this.setState({
                retourAjoutProsit: this.props.prosit.prosit
            }, console.log(this.state.retourAjoutProsit))

        }


    }





    render() {





        return (
            <div id="opacity">
                <div id="formulaire">

                    <img id="closeButton" src={cross} onClick={this.props.function} alt="close button" />
                    <h1>Nouveau Fichier</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <label id="formUE">  UE</label>
                        {/* <input type="radio" name="UE" value="Science" /> Sciences de base
            <input type="radio" name="UE" value="Wen" /> Développement Web
            <input type="radio" name="UE" value="Humain" /> Sciences humaines <br />
                            <input type="radio" name="UE" value="Meca" /> Mécanique
            <input type="radio" name="UE" value="Reseaux" /> Architectures réseaux<br /> </label> */}

                        {/*  <select name="unite" onChange={this.handleChange}  id="unite">
                        {this.props.selectOption.map((option) =>{
                            return(
                                <option value={option}>{option}</option>
                            )
                        })}
                        </select>  */}

                        {(this.props.selectOption) ? <InputAutoSuggest
                            handleChange={this.handleChange}
                            ref={this.input}
                            value={this.state.unite}
                            name="unite"
                            array={this.props.selectOption}
                            placeholder={"selectionner ue"} /> : (
                                <select
                                    value={this.state.unite}
                                    name="unite"
                                    onChange={this.handleChange}
                                >
                                    <option value="1-Science" defaultValue>Sciences de base</option>
                                    <option value="2-Mécanique">Mécanique</option>
                                    <option value="3-Web">Web</option>
                                    <option value="4-Humain">Humain</option>
                                    <option value="5-Reseau">Reseau</option>
                                </select>
                            )}
                        {/* <CreatableSelect
                            isClearable
                            onChange={this.handleChange}
                            onInputChange={this.handleInputChange}
                            options={this.props.selectOption}
                        /> */}


                        {/* <select
                            value={this.state.unite}
                            name="unite"
                            onChange={this.handleChange}
                        >
                            <option value="1-Science" defaultValue>Sciences de base</option>
                            <option value="2-Mécanique">Mécanique</option>
                            <option value="3-Web">Web</option>
                            <option value="4-Humain">Humain</option>
                            <option value="5-Reseau">Reseau</option>
                        </select> */}







                        <label id="formProsit">  Nom du prosit
                            <input type="text" name="nomProsit" onChange={this.handleChange} value={this.state.nomProsit} /> </label>
                        <br />
                        <label id="formProsit">  Nom du scribe
                            <input type="text" name="nomScribe" onChange={this.handleChange} value={this.state.nomScribe} /> </label>
                        <br />

                        <label id="formProsit">  Liste de mot clef
                            <input type="text" name="motsClef" onChange={this.handleChange} value={this.state.motsClef} /> </label>
                        <br />

                        {/* <label>  Allez <input  type="radio" name="fileType" checked={this.state.type} value="Aller" /><br /> </label>
                            <label>  Retour <input type="radio" name="fileType" value="Retour" /><br /> </label> 

                        <label>  Validé par la classe
            <input type="checkbox" name="checkType" value="Classe" /><br /> </label>
                        <label>  Validé par le tuteur
            <input type="checkbox" name="checkType" value="Tuteur" /> </label>
*/}

                        <input
                            type="radio"
                            name="validation"
                            onChange={this.handleChange}
                            value="1    "
                            checked={this.state.validation === "1"}
                        />
                        Classe
                        <input
                            type="radio"
                            name="validation"
                            onChange={this.handleChange}
                            value="2"
                            checked={this.state.validation === "2"}
                        />
                        Tuteur

                        {
                            (this.state.retourAjoutProsit === "") && <button type="submit" onSubmit={this.handleSubmit}>gsdg</button>

                        }


                        {/* {
                            (this.state.retourAjoutProsit !== "") ?  <FormulaireFichier></FormulaireFichier> : <button type="submit" onSubmit={this.handleSubmit}>gsdg</button> 
                        } */}




                        {/* {(this.state.retourAjoutProsit !== "dddd") ? <button type="submit" onSubmit={this.handleSubmit}>gsdg</button> : <FormulaireFichier></FormulaireFichier> } */}



                    </form>
                    {

                        (this.state.retourAjoutProsit !== "") && <FormulaireFichier></FormulaireFichier>
                        // <label id="lblFile" htmlFor="file"> Ajouter le fichier <br /> <img id="addFileHere" src={addFileHere} alt="add file here !" /> </label>
                        // <input type="file" onChange={this.getFileName} name="file" ref="getFile" id="file" accept=".doc,.docx" />
                    }


                </div>
            </div>
        );
    }
}

FormFile.propTypes = {
    ajouterProsit: PropTypes.func.isRequired,
    prosit: PropTypes.object.isRequired,


}

const mapStateToProps = state => ({

    prosit: state.prosit,
    selectOption: state.prosit.uniteSansDoublon
    // errors: state.errors

})


export default connect(mapStateToProps, { ajouterProsit })(FormFile);

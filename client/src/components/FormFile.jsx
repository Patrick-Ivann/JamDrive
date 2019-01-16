import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

import PropTypes from 'prop-types';
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
            motsClef: "",
            selectOption: []
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

        /*if (this.input.current.inputSugg.current.state.value) {
            this.setState({
                unite: this.input.current.inputSugg.current.state.value
            })

            prositData["unite"] = this.state["unite"]
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

        if (this.props.prosit.prosit !== prevProps.prosit.prosit) {
            this.setState({
                retourAjoutProsit: this.props.prosit.prosit
            },console.log(this.state.retourAjoutProsit))
        }
        if (prevProps.prosit !== this.props.prosit) {
            console.log(this.props.prosit.prosit._id)

            let id = this.props.prosit.prosit._id

            if (prevProps.selectedOption != this.props.selectOption) {
                this.setState({
                    selectOption: this.props.selectOption
                })
                //alert(this.props.selectOption)
            }
        }


    }

    render() {
        return (
            <div className="modal fade" id="fileModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajouter un nouveau fichier</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <label>Unité d'enseignement</label>
                                <div className="input-group mb-3">
                                    {(this.props.prosit == null) ? <select name="unite" className="custom-select" id="unite" onChange={this.handleChange}>
                                        {this.state.selectOption.map((option) =>{
                                            return(
                                                <option value={option}>{option}</option>
                                            )
                                        })}
                                    </select> : <select name="unite" className="custom-select" id="unite" onChange={this.handleChange}>
                                        <option>Bancal</option>
                                    </select>}

                                </div>

                                <label>Nom du prosit</label>
                                <div className="input-group mb-3">
                                    <input type="text" name="nomProsit" className="form-control" placeholder=""
                                           aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.nomProsit} />
                                </div>

                                <label>Nom du scribe</label>
                                <div className="input-group mb-3">
                                    <input type="text" name="nomScribe" className="form-control" placeholder=""
                                           aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.nomScribe} />
                                </div>

                                <label>Mot(s)-clé(s)</label>
                                <div className="input-group">
                                    <textarea name="motsClef" className="form-control" aria-label="With textarea" onChange={this.handleChange} value={this.state.motsClef}></textarea>
                                </div>

                                <label class="mt-2">Document validé par :</label><br />
                                <input
                                    type="radio"
                                    name="validation"
                                    onChange={this.handleChange}
                                    value="1    "
                                    checked={this.state.validation === "1"}
                                /> La classe<br />
                                <input
                                    type="radio"
                                    name="validation"
                                    onChange={this.handleChange}
                                    value="2"
                                    checked={this.state.validation === "2"}
                                /> Le tuteur

                                {/*
                                    (this.state.retourAjoutProsit === "") && <button type="submit" onSubmit={this.handleSubmit}>gsdg</button>
                                */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                <button type="submit" onSubmit={this.handleSubmit} className="btn btn-primary">Ajouter</button>
                            </div>
                        </form>
                        {(this.state.retourAjoutProsit !== "") && <FormulaireFichier></FormulaireFichier>}
                    </div>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { televerserProsit } from "../../actions/prositActions";
import { televerserRessource } from '../../actions/ressourceActions';



class FormulaireFichier extends Component {


  constructor(props) {
    super(props)



    this.state = {
      file: "",
      id: Math.random().toString(36).substring(7)
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFileName = this.getFileName.bind(this)
  }

  handleSubmit(event) {


    event.preventDefault();

    if (this.props.prositID) {

      this.props.televerserRessource(this.state.file)


    } else {


      this.props.televerserProsit(this.state.file)
    }

  }

  getFileName(event) {
    this.setState({ file: event.target.files[0] });
  }



  render() {



    return (
      <div>
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          {(this.state.file !== "") ? (
            <div className="row mb-2">
              <div className="col col-lg-9  ">
                <label as="label" id={`lblFile${this.state.id}`} htmlFor={`fileInput${this.state.id}`} className=" btn btn-primary my-2  btn-block text-truncate " >Ajouter  {(this.props.prositID) ? "une nouvelle ressource" : " un fichier de prosit " + this.props.prositType} </label>
                <input type="file" style={{ display: "none" }} onChange={(event) => this.getFileName(event)} name="file" ref="getFile" id={`fileInput${this.state.id}`} accept=".doc,.docx,.txt,.pdf" />
              </div>
              <div className="col-md-auto">

                <input className="btn bg-dark text-white my-2 text-truncate" type="submit" />

              </div>
            </div>) :

            (<div className="row mb-2">
              <div className="col col-lg-9  ">
                <label as="label" id={`lblFile${this.state.id}`} htmlFor={`fileInput${this.state.id}`} className=" btn btn-primary my-2  btn-block text-truncate " >Ajouter  {(this.props.prositID) ? "une nouvelle ressource" : " un fichier de prosit " + this.props.prositType} </label>
                <input type="file" style={{ display: "none" }} onChange={(event) => this.getFileName(event)} name="file" ref="getFile" id={`fileInput${this.state.id}`} accept=".doc,.docx,.txt,.pdf" />
              </div>
            </div>)}

        </form>

      </div>
    )
  }
}


FormulaireFichier.propTypes = {
  televerserProsit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

  prosit: state.prosit,
  // errors: state.errors

})



export default connect(mapStateToProps, { televerserProsit, televerserRessource })(FormulaireFichier)   
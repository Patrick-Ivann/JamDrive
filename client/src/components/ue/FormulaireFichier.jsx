import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { televerserProsit } from "../../actions/prositActions";


import addFileHereImg from '../../static/image/addFileHere.png'

class FormulaireFichier extends Component {


  constructor(props) {
    super(props)

    this.state = {
      file: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFileName = this.getFileName.bind(this)
  }

  handleSubmit(event) {


    event.preventDefault();

    this.props.televerserProsit(this.state.file)
  }

  getFileName(event) {
    this.setState({ file: event.target.files[0] });
  }



  render() {
    return (
      <div>
        <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
          <label id="lblFile" htmlFor="file"> Ajouter le fichier <br /> <img id="addFileHere" src={addFileHereImg} alt="add file here !" /> </label>
          <input type="file"  onChange={this.getFileName} name="file" ref="getFile" id="file" accept=".doc,.docx,.txt,.pdf" />
          <input type="submit" />
        </form>

      </div> 
    )
  }
}


FormulaireFichier.propTypes = {
  televerserProsit : PropTypes.func.isRequired
}

const mapStateToProps = state => ({

  prosit: state.prosit,
  // errors: state.errors

})



export default connect(mapStateToProps,{televerserProsit})(FormulaireFichier)   
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

  handleSubmit() {



    this.props.televerserProsit(this.state.file,this.props.history)
  }

  getFileName(file) {
    this.setState({ file: file });
  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label id="lblFile" htmlFor="file"> Ajouter le fichier <br /> <img id="addFileHere" src={addFileHereImg} alt="add file here !" /> </label>
          <input type="file" onChange={e => this.getFileName(e.target.files[0])} name="file" ref="getFile" id="file" accept=".doc,.docx,.txt,.pdf" />
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
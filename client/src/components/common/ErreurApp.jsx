import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { concatValeurObjet, concatValeurObjetAlt } from "../../utils/functionSheet";

class ErreurApp extends Component {
 


  constructor(props){
      super(props)

      this.state = {
          errors : null
      }
  }


  componentDidUpdate = (prevProps, prevState) => {
    

    if (prevProps.errors !== this.props.errors) {
        

       alert( concatValeurObjet(this.props.errors))
       alert(concatValeurObjetAlt(this.props.errors))

        
    }
  }
  

  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  
    errors : state.errors
})



export default connect(mapStateToProps)(ErreurApp)

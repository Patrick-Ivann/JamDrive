import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { godModeActivation } from '../../actions/authAction';




 class Login extends Component {


    constructor(props) {
        super(props)

        this.state = {
            loginText : ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    
 
     handleSubmit = (event) => {
      
         event.preventDefault();

         console.log(this);

        this.props.godModeActivation(this.state.loginText)
    }
    

     handleUpdate = (event) => {

         const target = event.target;
         const value = target.type === "checkbox" ? target.checked : target.value;
         const name = target.name;

         this.setState({
             [name]: value
         });


    }


    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.auth !== this.props.auth) {
            

            if (this.props.auth.godMode) {
                this.props.history.push('/prositsGod')
            }else{
                
                this.props.history.push("/prosits")
            }


            
            
        }
        

        
    }
    


    componentDidMount() {
        
        if (this.props.auth.godMode) {
            this.props.history.push('/prositsGod')
        }
    }


    
    

  render() {
    return (
        <div>
        
            <h1>formulaire</h1>
            <form onSubmit={this.handleSubmit}>
            
            <input autoFocus autoComplete="false" value={this.state.loginText} name="loginText" onChange={this.handleUpdate} type="text" />
            
            </form>
        </div>
    )
}
}

Login.propTypes = {
    godModeActivation: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({

    auth: state.auth,
})



export default connect(mapStateToProps, { godModeActivation })(Login)

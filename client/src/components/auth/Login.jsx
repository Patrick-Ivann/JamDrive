import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { godModeActivation,ping } from '../../actions/authAction';
import { changementDePage } from "../../actions/navigationAction";




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


      this.props.ping(()=>  this.props.godModeActivation(this.state.loginText))
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
                this.props.changementDePage(this.props.location.pathname)
                this.props.history.push({
                    pathname: '/prositsGod',
                    state: {
                        from: this.props.location.pathname
                    }
                })
                
            }else{
                this.props.changementDePage(this.props.location.pathname)

                this.props.history.push({
                    
                    pathname: '/prosits',
                    state: {
                        from: this.props.location.pathname
                    }
                })
            }


            
            
        }
        

        
    }
    


    componentDidMount() {

        
        
        if (this.props.auth.godMode === true) {
            this.props.history.push({
                pathname: '/prositsGod',
                state: {
                    from: this.props.location.pathname
                }
            })
        }

        if(localStorage.getItem("godMode") === false){
            this.props.history.push({
                pathname: '/prosits',
                state: {
                    from: this.props.location.pathname
                }
            })
        }

        if (localStorage.getItem("godMode") === true) {

            this.props.history.push({
                pathname: '/prositsGod',
                state: {
                    from: this.props.location.pathname
                }
            })
        }
    }


    
    

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mt-4">
                            <h1>Connexion</h1>
                            <input className="form-control" id="connexion" autoFocus placeholder="Entrez le mot de passe" autoComplete="false" value={this.state.loginText} name="loginText" onChange={this.handleUpdate} type="password" />
                            <small id="emailHelp" className="form-text text-muted">Merci de ne pas partager le mot de passe dans un cadre autre que professionnel.
                            </small>
                            <label aria-label="connexion" id="lblConnexion"htmlFor="connexion"> &nbsp;</label>
                            {(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) ||navigator.userAgent.match(/iPad/i)) ? (<button className="btn btn-primary my-8 my-sm-7 btn-block" onClick={this.handleSubmit}> Connexion </button>) :null}
                        </div>
                    </form>
                </div>
            </div>
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
    navigation:state.navigation
})



export default connect(mapStateToProps, { godModeActivation, changementDePage,ping })(Login)

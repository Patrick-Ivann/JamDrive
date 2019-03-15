import React, { Component } from 'react'
import { connect } from 'react-redux'

import {concatValeurObjet, concatValeurObjetToHTML} from "../../utils/functionSheet";

import {AlertFixed} from '../../styles/ModalStyled';

class ErreurApp extends Component {

    constructor(props){
        super(props)

        this.state = {
            errors : null
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.errors !== this.props.errors) {
            

            this.setState({
                errors : this.props.errors
            })


            setTimeout(() => {
                this.setState({
                    errors: null
                })
            }, 5000);
            /*alert( concatValeurObjet(this.props.errors))
            alert(concatValeurObjetAlt(this.props.errors))*/


        }
    }

    componentDidMount() {
        /*if (concatValeurObjet(this.props.errors) == "") {
            alert('vide')
        }*/
    }

    render() {
        return (
            (concatValeurObjet(this.state.errors) !== "") ? <div className={"container float-right"}>
                <div className={"row"}>
                    <AlertFixed className="alert alert-danger alert-dismissible fade show col-sm-3" role="alert">
                        <h4 className="alert-heading">Erreur !</h4>
                        <p>{concatValeurObjetToHTML(this.state.errors)}</p>
                        <hr />
                        <p className="mb-0">Aïe aïe aïe c'est mal de provoquer des erreurs !</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </AlertFixed>
                </div>
            </div> : <div></div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors : state.errors
})

export default connect(mapStateToProps)(ErreurApp)



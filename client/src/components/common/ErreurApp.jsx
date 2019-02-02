import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {concatValeurObjet, concatValeurObjetAlt, concatValeurObjetToHTML} from "../../utils/functionSheet";

class ErreurApp extends Component {

    constructor(props){
        super(props)

        this.state = {
            errors : null
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.errors !== this.props.errors) {

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
            (concatValeurObjet(this.props.errors) !== "") ? <div className={"container float-right"}>
                <div className={"row"}>
                    <div className="alert alert-danger alert-fixed alert-dismissible fade show col-sm-3" role="alert">
                        <h4 className="alert-heading">Erreur !</h4>
                        <p>{concatValeurObjetToHTML(this.props.errors)}</p>
                        <hr />
                        <p className="mb-0">Aïe aïe aïe c'est mal de provoquer des erreurs !</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div> : <div></div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors : state.errors
})

export default connect(mapStateToProps)(ErreurApp)

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { supprimerProsit } from "../../actions/prositActions";

class PrositItemGODMODE extends Component {
    constructor(props) {
        super(props)

        this.Check = this.Check.bind(this)
    }
    Check() {
        if (this.props.prosit.certification === 1) {
            return <span className="classmate">✔</span>
        }
        else if (this.props.prosit.certification === 2) {
            return <span className="validated">✔</span>
        }
    }

    handleSuppr = id =>event =>{
        event.preventDefault();
        this.props.supprimerProsit(id)
    }
    render() {
        const { prosit } = this.props
        return (
            <article className="prosit" >
                <h2>Prosit - {this.props.prosit.nomProsit}  GOD MODE <button onClick={this.handleSuppr(prosit._id)}> surpppp</button></h2>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                    Aller </a>
                </div>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                    Retour {this.Check()} </a>
                </div>
            </article>
        );
    }


}

PrositItemGODMODE.propTypes = {

    prosit: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    ressource: state.ressources
})
export default connect(mapStateToProps,{supprimerProsit}) (PrositItemGODMODE) 
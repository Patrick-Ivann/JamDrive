import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { supprimerProsit } from "../../actions/prositActions";


import PrositStyled from '../../styles/PrositStyled';


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
            <div className="card mt-2">
                <PrositStyled className="card-body ">
                    <button className="btn btn-outline-danger float-right" onClick={this.handleSuppr(prosit._id)}>Supprimer</button>
                    <h2>Prosit - {this.props.prosit.nomProsit}</h2>
                    <ul className="list__item" >
                        {prosit.motsClef.slice(0,4).map((motsClef, index) => (<li key={index} className="">{motsClef}</li>))}
                    </ul>
                    {(prosit.aller) ? <a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block mb-2 mt-2 text-left">Aller</button></a> : null}
                    {(prosit.retour) ? <a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block text-left">Retour</button></a> : null}
                </PrositStyled>
            </div>
        );
    }
/*
<article className="prosit" >


                 <ul className="list__item" >

        {prosit.motsClef.slice(0,4).map((motsClef, index) => (<li key={index} className="">{motsClef}</li>))}

    </ul>

                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                    Aller </a>
                </div>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                    Retour {this.Check()} </a>
                </div>
            </article>
 */

}

PrositItemGODMODE.propTypes = {

    prosit: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    ressource: state.ressources
})
export default connect(mapStateToProps,{supprimerProsit}) (PrositItemGODMODE) 
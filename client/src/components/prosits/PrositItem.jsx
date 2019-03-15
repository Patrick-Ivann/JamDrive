import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { checkerProsit } from "../../actions/prositActions";
import { connect } from 'react-redux'

import PrositStyled from '../../styles/PrositStyled';
import FormulaireFichier from '../ue/FormulaireFichier';


/**
 * TODO il faut trouver un moyen(un bouton) pour lancer la fonction de check et lui passer l'id à la fonction check
 * ! mettre un ternary operator pour qui vérifie la validation du prosit (1,0,2) la valeur est this.props.prosit.validation
 */
class PrositItem extends Component {
    constructor(props) {
        super(props)

        this.Check = this.Check.bind(this)
    }

    componentDidUpdate = (prevProps, prevState) => {
      
        if(prevProps.prosit !== this.props.prosit){

        }
    }
    



    Check(event) {
        /*if (this.props.prosit.certification === 1) {
            return <span className="classmate">✔</span>
        }
        else if (this.props.prosit.certification === 2) {
            return <span className="validated">✔</span>
        }*/
        event.preventDefault()
        this.props.checkerProsit(this.props.prosit.id)


    }

    render() {
        const {prosit} = this.props
        return (
            <div className="card mt-2">
                <PrositStyled className="card-body ">
                    <h4>Prosit - {this.props.prosit.nomProsit}</h4>
                    <FormulaireFichier prositID={this.props.prosit.nomProsit} ></FormulaireFichier>

                    <ul className="list__item" >
                        {prosit.motsClef.slice(0,4).map((motsClef, index) => (<li key={index} className="">{motsClef}</li>))}
                    </ul>
                   {(prosit.aller) ? <a href={`https://api.jampops.online/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block mb-2 mt-2 text-left">Aller</button></a> : <FormulaireFichier prositType="aller" ></FormulaireFichier>}
                    {(prosit.retour) ? <a href={`https://api.jampops.online/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block text-left">Retour</button></a> : <FormulaireFichier prositType="retour" ></FormulaireFichier>}
                </PrositStyled>
            </div>
        );
    }


}

PrositItem.propTypes = {

    prosit: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    prositRedux: state.prosit
})

export default connect(mapStateToProps,{checkerProsit})(PrositItem)
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { checkerProsit } from "../../actions/prositActions";
import { connect } from 'react-redux'


/**
 * TODO il faut trouver un moyen(un bouton) pour lancer la fonction de check et lui passer l'id à la fonction check
 * ! mettre un ternary operator pour qui vérifie la validation du prosit (1,0,2) la valeur est this.props.prosit.validation
 */
class PrositItem extends Component {
    constructor(props) {
        super(props)

        this.Check = this.Check.bind(this)
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
            <article className="prosit" >
                <h2>Prosit - {this.props.prosit.nomProsit}</h2>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                    Aller </a>
                </div>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                    Retour </a>
                </div>
                {this.props.prosit.motsClef}
                <button onClick={this.Check} >checker</button>
            </article>
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
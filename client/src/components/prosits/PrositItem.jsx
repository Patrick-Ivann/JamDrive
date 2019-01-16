import React, { Component } from 'react';
import PropTypes from 'prop-types'

class PrositItem extends Component {
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

    render() {
        const {prosit} = this.props
        return (
            <div className="card mt-2">
                <div className="card-body prosit">
                    <h4>Prosit - {this.props.prosit.nomProsit}</h4>
                    <ul className="list__item" >
                        {prosit.motsClef.slice(0,4).map((motsClef, index) => (<li key={index} className="">{motsClef}</li>))}
                    </ul>
                    <a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/aller`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block mb-2 mt-2 text-left">Aller</button></a>
                    <a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit.nomProsit}/retour`}>
                        <button type="button" className="btn btn-primary btn-lg btn-block text-left">Retour</button></a>
                </div>
            </div>
        );
    }


}

PrositItem.propTypes = {

    prosit: PropTypes.object.isRequired
}


export default (PrositItem) 
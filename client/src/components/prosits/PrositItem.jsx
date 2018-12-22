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
            <article className="prosit" >
                <h2>Prosit - {this.props.prosit.nomProsit}</h2>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit._id}`}>
                    Aller </a>
                </div>
                <div className="file"><a href={`http://localhost:5000/api/prosit/testtelechargement/${prosit._id}`}>
                    Retour {this.Check()} </a>
                </div>
            </article>
        );
    }


}

PrositItem.propTypes = {

    prosit: PropTypes.object.isRequired
}


export default (PrositItem) 
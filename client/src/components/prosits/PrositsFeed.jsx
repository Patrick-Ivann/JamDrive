import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PrositItem from "./PrositItem";

class PrositFlux extends Component {


    render() {
        const { prosits } = this.props
        console.log(prosits)
         return prosits.map(prosit => <PrositItem key={prosit._id} prosit={prosit} />)
    }   


}

PrositFlux.propTypes = {
    prosits: PropTypes.array.isRequired
}


export default PrositFlux

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose';


import PrositItem from "./PrositItem";
import PrositItemGODMODE from './PrositItemGODMODE';
import { InputValuesHc } from '../HOC/InputValues';

class PrositFlux extends Component {



    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.rechercheString !== this.props.rechercheString) {

        }
    }


    render() {



        const { prosits } = this.props

        let godModeLight = false

        if (this.props.auth.utilisateur) {
            godModeLight = this.props.auth.utilisateur.godMode

        }



        return (


            prosits
            .filter(prosit => prosit.nomProsit.toString().toLowerCase().indexOf(this.props.rechercheString) > -1 ||
                prosit.motsClef.toString().toLowerCase().indexOf(this.props.rechercheString) > -1)
                .map(prosit => (this.props.auth.godMode === false && (godModeLight === false || godModeLight === undefined  )) ?
                    <PrositItem key={prosit._id} prosit={prosit}></PrositItem> :
                    <PrositItemGODMODE key={prosit._id} prosit={prosit} />



                )

        )
    }


}

PrositFlux.propTypes = {
    prosits: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({

    rechercheString: state.prosit.rechercheString,
    auth: state.auth
})



export default compose(connect(mapStateToProps), InputValuesHc)(PrositFlux)

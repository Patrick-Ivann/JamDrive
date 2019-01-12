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
          
        var rechercheTest = this.props.rechercheString.rechercheString
      }
    }
    

    render() {

        console.log(this.props.rt);


        const { prosits } = this.props
           var rechercheStringFiltre = ''

         var  rechercheString = this.props.rechercheString.rechercheString

        
        console.log(this.props.rechercheString)

        console.log(prosits.sort((a, b) => (a.nomProsit > b.nomProsit) ? 1 : ((b.nomProsit > a.nomProsit) ? -1 : 0))) 



        console.log(prosits.sort((a, b) => a.nomProsit.localeCompare(b.nomProsit)))

         let prositFiltree = prosits.filter((prosit) => {
             return prosit.nomProsit.toLowerCase().indexOf(this.props.rechercheString.rechercheString) !== -1
         }) 


        let infoFiltre = prosits.filter(
            (row) => {

                return row.nomProsit.toLowerCase().indexOf(this.props.rechercheString.rechercheString) !== -1;
            }
        )

        return(
            

            // infoFiltre.map((prosit) => {
            //    return <PrositItemGODMODE key={prosit._id} prosit={prosit} />
            // })

        //    (rechercheString) ? prosits.sort((a, b) => a.nomProsit.localeCompare(b.nomProsit)).map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} />) :  prosits.filter(prositfiltre => prositfiltre.nomProsit.toLowerCase().indexOf(rechercheString) !== -1).map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} />)
        
        //prosits.filter(prositfiltre => prositfiltre.nomProsit.toLowerCase().indexOf(this.props.rechercheString.rechercheString) !== -1).map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} />)
          prosits.filter(prosit => prosit.nomProsit.toLowerCase().indexOf(this.props.rechercheString) !== -1).map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} />)

        //prosits.map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} /> )
         //prosits.sort((a, b) => a.nomProsit.localeCompare(b.nomProsit)).map(prosit => <PrositItemGODMODE key={prosit._id} prosit={prosit} />)
        )}


}

PrositFlux.propTypes = {
    prosits: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  
    rechercheString : state.prosit.rechercheString
})



export default compose(connect(mapStateToProps),InputValuesHc)(PrositFlux)

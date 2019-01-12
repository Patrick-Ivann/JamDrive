import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UniteItem from './UniteItem';

class UniteListe extends Component {
  static propTypes = {
    prop: PropTypes
  }

  componentDidMount() {
    console.log(this.props.ue)
  }



  render() {


    const { ue } = this.props
    console.log(ue)
    const uniteListe = Object.getOwnPropertyNames(ue).sort().map(row => {
  
     
      return (


        <UniteItem unite={row} prosit={ue[row].sort()} key={row} ></UniteItem>
      )
    });
    return (

      <div>

        {uniteListe}
      </div>
    )
  }
}


UniteListe.propTypes = {

  ue : PropTypes.object.isRequired


};


export default (UniteListe);


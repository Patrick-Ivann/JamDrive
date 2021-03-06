import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UniteItem from './UniteItem';

class UniteListe extends Component {
  static propTypes = {
    prop: PropTypes
  }

  componentDidMount() {
  }



  render() {


    const { ue,user } = this.props
    
    const uniteListe = Object.getOwnPropertyNames(ue).sort().map(row => {
  
     
      return (


        <UniteItem user={user} unite={row} prosit={ue[row].sort()} key={row} ></UniteItem>
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


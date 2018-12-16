import React, { Component } from 'react';
import arrow from '../image/down-arrow.png'
import Prosit_container from './Prosit_container';

class UE_container extends Component {


render() {
  return (

      <article className="ue">
        <h1 className="UE_title">UE - {this.props.UE_name}</h1>
        <img className="arrow" src={arrow} alt="Down arrow" />
        <Prosit_container check="validated" prosit_name="React"/>
        <Prosit_container check="mate" prosit_name="Node"/>
        <Prosit_container check="mate" prosit_name="Angular"/>
        <Prosit_container prosit_name="HTML"/>
      </article>

    );
  }
}

export default UE_container;

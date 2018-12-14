import React, { Component } from 'react';
import Prosit_container from './Prosit_container';

class UE_container extends Component {
  constructor(props){
    super(props);

  }

render() {
  return (
    <article class="ue">
      <h1>UE - {this.props.UE_name}</h1>
      <Prosit_container check="ido" prosit_name="React"/>
    </article>
    );
  }
}

export default UE_container;

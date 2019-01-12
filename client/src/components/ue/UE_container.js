import React, { Component } from 'react';
import arrow from '../../static/image/down-arrow.png'
import Prosit_container from '../Prosit_container';

class UE_container extends Component {    
  constructor(props) {
    super(props);
    this.state = {isButtonToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.arrowClick = this.arrowClick.bind(this);
  }

  arrowClick(){
    this.setState(prevState => ({
      isButtonToggleOn: !prevState.isButtonToggleOn
    }))
  }

render() {

  const containProsits = this.props.dataUE.map(prosit => (
    <Prosit_container dataProsit={prosit} />
  ));

  return (
      <article className={[this.state.isButtonToggleOn? 'rolled_out' : 'rolled_up', 'ue'].join(" ")}>
        <h1 className="UE_title" onClick={this.arrowClick}>UE - {this.props.UE_name}</h1>
        <img className='arrow' onClick={this.arrowClick}  src={arrow} alt="Down arrow" />
        {containProsits}
      </article>

    );
  }
}

export default UE_container;

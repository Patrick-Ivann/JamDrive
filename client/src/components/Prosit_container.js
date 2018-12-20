import React, { Component } from 'react';

class Prosit_container extends Component {

  Check(){
    if(this.props.check === "mate"){
      return <span className="classmate">✔</span>
    }
    else if(this.props.check === "validated"){
      return <span className="validated">✔</span>
    }
  }

render() {
  return (
  <article className="prosit">
        <h2>Prosit - {this.props.prosit_name}</h2>
        <div className="file">Aller</div>
        <div className="file">Retour {this.Check()}</div>
  </article>
    );
  }
}

export default Prosit_container;
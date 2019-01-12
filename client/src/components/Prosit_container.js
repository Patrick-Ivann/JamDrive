import React, { Component } from 'react';

class Prosit_container extends Component {
constructor(props){
  super(props)

  this.Check = this.Check.bind(this)
}
  Check(){
    if(this.props.dataProsit.certification === 1){
      return <span className="classmate">✔</span>
    }
    else if(this.props.dataProsit.certification === 2){
      return <span className="validated">✔</span>
    }
  }

render() {
  return (
  <article className="prosit" >
        <h2>Prosit - {this.props.dataProsit.nomProsit}</h2>
        <div className="file"><a href={["localhost:5000/endpoint/", this.props.dataProsit._id].join("")}>
          Aller </a>
        </div>
        <div className="file"><a href={["localhost:5000/endpoint/", this.props.dataProsit._id].join("")}>
          Retour {this.Check()} </a>
        </div>
  </article>
    );
  }
}

export default Prosit_container;

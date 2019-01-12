import React, { Component } from 'react';
import { connect } from 'react-redux'
import {mettreAjourRecherche} from '../../actions/prositActions';

import logo from '../../static/image/jp_logo.png'
import { Exportation } from '../common/InputSearch';
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recherche: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.props.mettreAjourRecherche(value)




  }

  

  handleSearch(event) {
   // this.setState({ recherche: event.target.value.substr(0, 20) })
    
   this.setState({ recherche: event.target.value })

   this.props.mettreAjourRecherche(event.target.value)
  }




render() {
  
  
  
  return (


    <header>
    <h1 id="Title">JamDrive</h1>
    <img id="logo" src={logo} alt="Jampops logo"/>
      <nav>
        <ul>
          <li>Rechercher un fichier</li>
         <input name='recherche' value={this.state.recherche} onChange={this.handleChange} type="text"/>
   {/*<Exportation></Exportation>
  */}
         </ul>
      </nav>
    </header>
    );
  }
}

const mapStateToProps = state => ({

  prosit: state.prosit,
})


export default connect(mapStateToProps,{mettreAjourRecherche}) (Header);

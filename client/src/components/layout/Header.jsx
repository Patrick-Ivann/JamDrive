import React, { Component } from 'react';
import { connect } from 'react-redux'
import {mettreAjourRecherche} from '../../actions/prositActions';
import { changerTheme } from "../../actions/themeAction";

import jampops from '../../static/image/jampops.png'
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
      <header className={"mb-4"}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <img className="logo mr-2" src={jampops} alt="Logo" width="100px" />
          <div className="navbar-brand">JAMDRIVE</div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            </ul>
            <button className="btn btn-primary my-2 my-sm-0" onClick={  this.props.changerTheme}> changer vers le theme {(this.props.theme.theme) ? "qui pete la vue" : "sombre"} </button>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" name='recherche' value={this.state.recherche}
                     onChange={this.handleChange} type="search" placeholder="Recherche.."/>
            </form>
            <button className="btn btn-primary my-2 my-sm-0" data-toggle="modal" data-target="#fileModal">Nouveau fichier</button>
          </div>
        </nav>
      </header>
    );
  }
}
/*

              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
              </li>
 */

const mapStateToProps = state => ({

  prosit: state.prosit,
  theme: state.theme

})


export default connect(mapStateToProps,{mettreAjourRecherche, changerTheme}) (Header);

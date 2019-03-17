import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import {mettreAjourRecherche} from '../../actions/prositActions';
import { changerTheme } from "../../actions/themeAction";
import { logoutUser } from "../../actions/authAction";
import { navigatorCheck } from '../../utils/functionSheet';

/**
 *
 */
class Header extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      recherche: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *
   * @param event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.props.mettreAjourRecherche(value);
  }

  /**
   *
   * @param event
   */
  handleClick(event) {
    event.preventDefault();

    this.props.history.push({
      pathname: '/',
      state: {
        from: this.props.location.pathname
      }
    });

    window.location.href = '/';
  }

  /**
   *
   * @param event
   */
  handleSearch(event) {
    // this.setState({ recherche: event.target.value.substr(0, 20) })
    this.setState({ recherche: event.target.value });
    this.props.mettreAjourRecherche(event.target.value);
  }

  /**
   *
   * @returns {*}
   */
  render() {
    let fileImg = null;
    if (navigatorCheck() === "Safari" || navigatorCheck() === "IE" || navigatorCheck() === "unknown") {
      fileImg = require("../../static/image/jampops.png");
    } else {
      fileImg = require("../../static/image/jampops.webp");
    }

    return (
        <header className={"mb-4"}>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img onClick={ (event) => { this.handleClick(event); this.props.logoutUser() } } className="logo mr-2" src={fileImg} alt="Logo" width="100px" />
            <div className="navbar-brand">JAMDRIVE</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <label aria-label="recherche" id="lblRecherche" htmlFor="recherche"> &nbsp;</label>

                <input className="form-control mr-sm-2" id="recherche" name='recherche' value={this.state.recherche}
                       onChange={this.handleChange} type="search" placeholder="Recherche.."/>
              </form>

              <button className="btn btn-primary my-2 mr-2 my-sm-0" data-toggle="modal" data-target="#fileModal">Nouveau prosit</button>
              <button className="btn btn-secondary my-2 my-sm-0" onClick={this.props.changerTheme}>Thème {(this.props.theme.theme) ? "clair" : "sombre"} </button>
            </div>
          </nav>
        </header>
    );
  }
}

const mapStateToProps = state => ({
  prosit: state.prosit,
  theme: state.theme
});

export default withRouter(connect(mapStateToProps,{mettreAjourRecherche, changerTheme, logoutUser}) (Header));

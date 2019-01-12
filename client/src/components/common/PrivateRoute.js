import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { tentativeRoutePrivee } from "../../actions/authAction";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.godMode === true ? (
        <Component {...props} />
      ) : (
        tentativeRoutePrivee(),
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  
});

export default connect(mapStateToProps,{tentativeRoutePrivee})(PrivateRoute);

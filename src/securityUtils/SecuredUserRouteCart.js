import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredUserRouteCart = ({
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render = {props =>
      security.user.authorities === "ROLE_USER" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/buy/login" />
      )
    }
  />
);

SecuredUserRouteCart.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(SecuredUserRouteCart);
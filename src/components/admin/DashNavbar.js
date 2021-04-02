import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";

class DashNavbar extends Component {

  logout() {
    this.props.logout();
    window.location.reload();
  }

  render() {
    const { user } = this.props.security;

    return (
      <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Company name
        </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Button
              variant="outline-info"
              onClick={this.logout.bind(this)}
            >
              Log out
            </Button>
          </li>
        </ul>
      </Nav>
    );
  }
}

DashNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(DashNavbar);

import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  ButtonToolbar,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class MyHeader extends Component {

  logout() {
    this.props.logout();
    window.location.reload();
  }

  render() {
    const { validToken, user } = this.props.security;

    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="#contact" className="nav-link">
                Contact
              </Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <Link to="#action/3.1" className="dropdown-item" role="button">
                  Action
                </Link>
                <Link to="#action/3.2" className="dropdown-item" role="button">
                  Another action
                </Link>
                <Link to="#action/3.3" className="dropdown-item" role="button">
                  Something
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Header>Header</NavDropdown.Header>
                <Link to="#action/3.4" className="dropdown-item" role="button">
                  Separated link
                </Link>
              </NavDropdown>
            </Nav>
            <Nav>
              <ButtonToolbar>
                {user.authorities === "ROLE_ADMIN" && (
                  <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                )}
                {validToken === false && (
                  <Link to="/login" className="btn btn-outline-info text-white">
                    Login
                  </Link>
                )}
                {validToken && (
                  <Button
                    variant="outline-info"
                    onClick={this.logout.bind(this)}
                  >
                    Log out
                  </Button>
                )}
                <Link to="/shoppingcart" className="nav-link">
                  Cart
                </Link>
              </ButtonToolbar>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

MyHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(MyHeader);

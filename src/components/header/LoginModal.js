import React, { Component } from "react";
import { Modal, ModalBody, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import classnames from "classnames";

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.security.validToken) {
      this.state.show = false ;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); //to prevent refresh the page
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(LoginRequest);
  }

  render() {
    const { errors } = this.state;

    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-model-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email adress</Form.Label>
              <Form.Control
                type="email"
                className={classnames({ "is-invalid": errors.username })}
                placeholder="Enter email"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
              <Form.Text className="text-muted">Text under the </Form.Text>
              {errors.username && (
                <Container className="invalid-feedback" variant="danger">
                  {" "}
                  {errors.username}{" "}
                </Container>
              )}
            </Form.Group>
            <Form.Group controlId="formLoginPassword">
              <Form.Control
                type="password"
                className={classnames({ "is-invalid": errors.password })}
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <Container className="invalid-feedback" variant="danger">
                  {" "}
                  {errors.password}{" "}
                </Container>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Modal.Footer>
              <Link
                to="/signup"
                className="btn btn-light"
                onClick={this.props.onHide}
              >
                Sign up
              </Link>
              <Button
                variant="dark"
                type="submit"
                onClick={this.validToken && this.props.onHide}
              >
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { login }
)(LoginModal);

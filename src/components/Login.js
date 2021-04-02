import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/securityActions";
import classnames from "classnames";

class Login extends Component {
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
      if (this.props.match.path === "/buy/login") {
        this.props.history.push("/buy/delivery");
      } else {
        this.props.history.push("/");
      }
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
      <Container className="col-md-6 col-md-offset-3 mb-4">
        <Card>
          <Card.Body>
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
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
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Link to="/signup" className="btn btn-dark text-white">
              Sign up
            </Link>
            <Button
              variant="dark"
              type="submit"
              className="float-right"
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

Login.propTypes = {
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
)(Login);

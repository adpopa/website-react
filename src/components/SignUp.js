import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Card, Form, FormLabel, Button } from "react-bootstrap";
import { addUser } from "../actions/userActions";
import classnames from "classnames";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); //to prevent refresh the page
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    // console.log(newUser);
    this.props.addUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Container className="col-md-6 col-md-offset-3 mb-4">
        <Card>
          <Card.Body>
            <h4 class="card-title mb-4 mt-1">Sign up</h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  className={classnames({ "is-invalid": errors.username })}
                  placeholder="Enter username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                {errors.username && (
                  <Container className="invalid-feedback" variant="danger">
                    {" "}
                    {errors.username}{" "}
                  </Container>
                )}
              </Form.Group>
              <Form.Group>
                <FormLabel>Password</FormLabel>
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
              <Form.Group>
                <FormLabel>Confirm Password</FormLabel>
                <Form.Control
                  type="password"
                  className={classnames({
                    "is-invalid": errors.confirmPassword
                  })}
                  placeholder="Re-Enter password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                {errors.confirmPassword && (
                  <Container className="invalid-feedback" variant="danger">
                    {" "}
                    {errors.confirmPassword}{" "}
                  </Container>
                )}
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button variant="dark" type="submit">
              Sign Up
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

SignUp.propTypes = {
  addUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUser }
)(SignUp);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Container, Col, Button } from "react-bootstrap";
import { addressToCart } from "../../actions/cartActions"

class Delivery extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      phone: "",
      adress1: "",
      adress2: "",
      city: "",
      postcode: "",
      country: "England",
      saveAdress: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addressToCart(this.state);
    this.props.history.push("/buy/order");
  }

  render() {
    return (
      <Container>
        <h1> Select a delivery adress </h1>
        <h5> United Kingdom delivery only</h5>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="John Doe"
                required="required"
                title="Please match the format requested. e.g: John Doe"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="07234 567890"
                required="required"
                pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}"
                title="Phone number should contain only numbers. e.g: +44 1234 567890 or 01234 567890"
                value={this.state.phone}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="adress1"
              type="text"
              placeholder="1234 Main St"
              required="required"
              pattern="\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?"
              title="Please match the format requested. e.g: 1234 Main St"
              value={this.state.adress1}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              name="adress2"
              type="text"
              placeholder="Apartment, studio, or floor"
              required="required"
              value={this.state.adress2}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="London"
                required="required"
                pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                title="Please match the format requested. e.g: London"
                value={this.state.city}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPostcode">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                name="postcode"
                type="text"
                placeholder="AB1 2CD"
                required="required"
                pattern="^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$"
                title="Please match the format requested. e.g: AB1 2CD"
                value={this.state.postcode}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check 
              name="saveAdress"
              type="checkbox" 
              label="Save adress for future use"
              value={this.state.saveAdress}
              onChange={this.onChange}
              />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

Delivery.propTypes = {
  addressToCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.security.user.id,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { addressToCart }
)(Delivery);

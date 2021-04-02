import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';

class Confirmation extends Component {
  render() {
    return (
      <Container>
        <h1>Confirmation</h1>
          <p>Your order has been registered successfully.</p>
          <p>Order id: {this.props.confirmation}</p>
      </Container>
    )
  }
}

Confirmation.propTypes = {
  confirmation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // userId: state.cart.user.id,
    confirmation: state.cart.confirmation.orderId
});


export default connect (mapStateToProps , {}) (Confirmation)

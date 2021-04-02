import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';

class Payment extends Component {
  render() {
    return (
      <Container>
        <h1>Select a payment method</h1>
        <Container>
            <p> here something happens for payment</p>
            <Button>Payment done</Button>
        </Container>
      </Container>
    )
  }
}

export default Payment

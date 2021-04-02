import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Alert,
  Container,
  Col,
  Card,
  Row,
  Button,
  Table
} from "react-bootstrap";
import { sendOrder } from "../../actions/cartActions";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const order = {
      address: this.props.cart.address,
      items: this.props.cart.items,
      userId: this.props.userId
    };

    console.log(order);
    this.props.sendOrder(order, this.props.history);
  }

  roundUp(number) {
    return Number(Math.round(number + "e+2") + "e-2");
  }

  itemsInterface() {
    const { cart } = this.props;

    return cart.items.map((item, index) => (
      <tr key={index}>
        <td data-th="Product">
          <Row>
            <Col sm={3} className="hidden-xs">
              <img
                src="https://placehold.it/100x100"
                alt="..."
                className="img-responsive image"
              />
            </Col>
            <Col sm={9}>
              <h4>
                {item.itemBrand} {item.itemName}
              </h4>
              {item.itemColour}
            </Col>
          </Row>
        </td>
        <td data-th="Price">£{item.itemPrice}</td>
        <td data-th="Quantity">
          <Row noGutters={true}>{item.itemQuantity}</Row>
        </td>
        <td data-th="Subtotal" className="text-center">
          £{this.roundUp(item.itemPrice * item.itemQuantity)}
        </td>
      </tr>
    ));
  }

  render() {
    const { errors } = this.state;

    return (
      <Container>
        {errors.length && (
          <Alert className="text-center" variant="danger">
            Please review your order
          </Alert>
        )}
        <h4>Review your order</h4>
        <Row>
          <Col className="col-8">
            <Row className="mb-2">
              <Card className="w-100">
                <Card.Body>
                  <h5>Adress</h5>
                  <p className="mb-0">
                    Name: {this.props.cart.address.name}
                  </p>
                  <p className="mb-0">
                    Phone number: {this.props.cart.address.phone}
                  </p>
                  <p className="mb-0">
                    Adress Line 1: {this.props.cart.address.adress1}
                  </p>
                  <p className="mb-0">
                    Adress Line 2: {this.props.cart.address.adress2}
                  </p>
                  <p className="mb-0">City: {this.props.cart.address.city}</p>
                  <p className="mb-0">
                    Postcode: {this.props.cart.address.postcode}
                  </p>
                  <p className="mb-0">
                    Country: {this.props.cart.address.country}
                  </p>
                </Card.Body>
                <Card.Footer>
                  <Button
                    onClick={() => this.props.history.push("/buy/delivery")}
                  >
                    {" "}
                    Change Adress
                  </Button>
                </Card.Footer>
              </Card>
            </Row>
            <Row>
              <Card className="w-100">
                <Card.Body>
                  <h5>List of products</h5>
                  <Container>
                    <Table id="cart" className="table-hover table-condensed">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th className="text-center">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>{this.itemsInterface()}</tbody>
                    </Table>
                  </Container>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col className="col-4">
            <Card>
              <Card.Body>
                <h5>Order Summary</h5>
                <Row>
                  <Col>Items:</Col>
                  <Col className="d-flex justify-content-end">
                    £{this.props.cart.total}
                  </Col>
                </Row>
                <Row>
                  <Col>Delivery:</Col>
                  <Col className="d-flex justify-content-end">£5.00</Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <h6 className="text-danger">Order Total:</h6>
                  </Col>
                  <Col className="d-flex justify-content-end ">
                    <h6 className="text-danger">
                      £{this.props.cart.total + 5}
                    </h6>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button onClick={this.onSubmit}> Place Order </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Order.propTypes = {
  sendOrder: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.security.user.id,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { sendOrder }
)(Order);

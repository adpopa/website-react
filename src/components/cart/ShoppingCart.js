import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { updateCart } from "../../actions/cartActions";
import "./ShoppingCart.css";

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ cart: this.props.cart });
  }

  roundUp(number) {
    return Number(Math.round(number + "e+2")  + "e-2")
  }

  removeItem(index) {
    let cart = this.state.cart;
    cart.items.splice(index, 1);

    this.setState({ cart });
  }

  incrementQuantity(index) {
    let cart = this.state.cart;
    if (cart.items[index].itemQuantity < 10) {
      cart.items[index].itemQuantity = cart.items[index].itemQuantity + 1;
      cart.total = this.roundUp(cart.total + cart.items[index].itemPrice);
      this.props.updateCart(cart);
      this.setState({ cart: cart });
    }
  }
  decreaseQuantity(index) {
    let cart = this.state.cart;
    if (cart.items[index].itemQuantity > 1) {
      cart.items[index].itemQuantity = cart.items[index].itemQuantity - 1;
      cart.total = this.roundUp(cart.total - cart.items[index].itemPrice);
      this.props.updateCart(cart);
      this.setState({ cart: cart });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const order = {
      items: this.state.cart.items,
      userId: this.props.userId
    };
    console.log(order);
    // this.props.addOrder(order, this.props.history);
    if(order.items.length > 0)
      this.props.history.push("/buy/delivery");
  }

  createCartUI() {
    if (this.state.cart) {
      const { cart } = this.state;

      return cart.items.map((item, index) => (
        <tr key={index}>
          <td data-th="Product">
            <Row>
              <Col sm={2} className="hidden-xs">
                <img
                  src="https://placehold.it/100x100"
                  alt="..."
                  className="img-responsive image"
                />
              </Col>
              <Col sm={10}>
                <h4>
                  <Link
                    className="link-black"
                    to={`/product/${item.productId}/v/${item.colourId}`}
                  >
                    {item.itemBrand} {item.itemName}
                  </Link>
                  </h4>
                  <p>{item.itemColour}</p>
              </Col>
            </Row>
          </td>
          <td data-th="Price">£{item.itemPrice}</td>
          <td data-th="Quantity">
            <Row noGutters={true}>
              <Col>
                <Button
                className="btn-left"
                  variant="info"
                  onClick={this.decreaseQuantity.bind(this, index)}
                >
                  <i className="fa fa-minus" />
                </Button>
              </Col>
              <Col >
                <Form.Control
                  disabled="disabled"
                  type="number"
                  max={10}
                  step={1}
                  min={0}
                  value={this.state.cart.items[index].itemQuantity}
                  // onChange={this.onChangeQuantity.bind(this, index)}
                />
              </Col>
              <Col>
                <Button
                  variant="info"
                  onClick={this.incrementQuantity.bind(this, index)}
                >
                  <i className="fa fa-plus" />
                </Button>
              </Col>
            </Row>
          </td>
          <td data-th="Subtotal" className="text-center">
            £
            {this.roundUp(this.state.cart.items[index].itemPrice * this.state.cart.items[index].itemQuantity)}
          </td>
          <td className="actions">
            <Button
              // size={"sm"}
              variant={"danger"}
              onClick={this.removeItem.bind(this, index)}
            >
              <i className="fa fa-trash-o" />
            </Button>
          </td>
        </tr>
      ));
    }
  }

  render() {
    return (
      <Container>
        <Table id="cart" className="table-hover table-condensed">
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th className="th-price">Price</th>
              <th className="th-quantity">Quantity</th>
              <th className="th-subtotal text-center">Subtotal</th>
              <th className="th-btns" />
            </tr>
          </thead>
          <tbody>
            {this.createCartUI()}
          </tbody>
          <tfoot>
            <tr className="visible-xs">
              <td>
                <Link to="/" className="btn btn-warning text-white"> 
                  <i className="fa fa-angle-left"/> Continue Shopping
                </Link>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="text-center">
                <strong>Total £{this.state.cart.total}</strong>
              </td>
              <td>
                <Button onClick={this.onSubmit} variant={'success'} block={true}>
                  Checkout <i className="fa fa-angle-right" />
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    );
  }
}

ShoppingCart.propTypes = {
  updateCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.security.user.id,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { updateCart }
)(ShoppingCart);

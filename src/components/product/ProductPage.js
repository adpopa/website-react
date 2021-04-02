import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  InputGroup
} from "react-bootstrap";
import ProductImage from "../product/resources/img/img.jpg";
import { connect } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

class ProductPage extends Component {
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.getProduct(productId, this.props.history);
  }

  constructor() {
    super();
    this.state = {
      quantity: 1,
      variationId: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { productId } = this.props.match.params;
    const { colourId } = this.props.match.params;

    let colour = this.props.product.productColours.find(obj => obj.colourId === colourId);

    const item = {
      productId: productId,
      colourId: colourId,
      variationId: this.state.variationId,
      itemBrand: this.props.product.productBrand,
      itemName: this.props.product.productName,
      itemSize: this.state.productSize,
      itemQuantity: this.state.quantity,
      itemColour: colour.productColour,
      itemPrice: this.props.product.productPrice
    };

    //for landing page of product
    if(!item.variationId) {
      item.variationId = colour.productVariations[0].variationId;
      item.itemSize = colour.productVariations[0].productSize;
    }
    
    this.props.addToCart(item);
  }

  incrementQuantity() {
    if (this.state.quantity < 10) {
      this.setState({ quantity: this.state.quantity + 1 });
    }
  }
  decreaseQuantity() {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  render() {
    const { product } = this.props;

    let colourButtons;
    if(product.productColours) {
      let colour = [];
      product.productColours.map(item => colour.push(item.productColour));
      colourButtons = product.productColours.map((colour, index) => {
        return (
          <Link 
            to={`/product/${product.productId}/v/${colour.colourId}`}
            key={index} 
            className={(this.props.match.params.colourId === colour.colourId) ? "btn btn-dark active text-light" : "btn btn-outline-dark"}
          >
            {colour.productColour}
          </Link>
        );
      });
    }

    const { colourId } = this.props.match.params;

    let sizeOptions;
    let i = 0;
    if(product.productColours) {
      product.productColours.map(colour => {
          if(colour.colourId === colourId) {
            sizeOptions = colour.productVariations.map(variation => {
              return (
                <option key={i++} value={variation.variationId}>{variation.productSize}</option>
                )
            })
          }
        })
    }

    return (
      <Container>
        <Row>
          <Col lg={5}>
            <Image src={ProductImage} alt="" />
          </Col>
          <Col lg={7}>
            <h1>{product.productName}</h1>
            <h3>{product.productBrand}</h3>
            <h3 className="text-info">£{product.productPrice}</h3>
            <Form onSubmit={this.onSubmit}>
              <Form.Label>Colour</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  {colourButtons}
                </InputGroup.Prepend>
              </InputGroup>
              <Form.Group>
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  as="select"
                  name="variationId"
                  value={this.state.variationId}
                  onChange={this.onChange}
                >
                  {sizeOptions}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Row noGutters={true}>
                  <Col md={1}>
                    <Button variant="info" onClick={this.decreaseQuantity.bind(this)}>
                    <i className="fa fa-minus"/>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      disabled="disabled"
                      type="number"
                      max={10}
                      step={1}
                      min={0}
                      placeholder="Enter product price"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md={1}>
                    <Button variant="info" onClick={this.incrementQuantity.bind(this)}>
                      <i className="fa fa-plus"/>
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Button type="submit" variant="dark">
                Add to Basket
              </Button>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <h5>Product description</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper
            risus in hendrerit gravida rutrum quisque non. Turpis egestas
            pretium aenean pharetra magna. Velit aliquet sagittis id consectetur
            purus ut. Ultrices vitae auctor eu augue ut lectus arcu bibendum at.
            Tempus quam pellentesque nec nam aliquam sem et tortor consequat.
            Interdum velit euismod in pellentesque massa placerat duis ultricies
            lacus. Dui ut ornare lectus sit amet est placerat. Lacus viverra
            vitae congue eu. Eu volutpat odio facilisis mauris sit.
          </p>
        </Row>
      </Container>
    );
  }
}

ProductPage.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product.product
});

export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(ProductPage);

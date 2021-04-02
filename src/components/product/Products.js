import React, { Component } from "react";
import { connect } from "react-redux";

import { Jumbotron, Button, Container, Alert, Row } from "react-bootstrap";

import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { getProducts } from "../../actions/productActions" 

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props.products;

    let ProductContent;
    let productItems = [];

    const ProductAlgorithm = products => {
      if (products.length < 1) {
        return <Alert className="text-center" variant="info">No products in stock</Alert>;
      } else {
        const items = products.map(product => (
          <ProductItem key={product.productId} product={product} />
        ));
        for (let i = 0; i < items.length; i++) {
          productItems.push(items[i]);
        }

        return (
          <Row id="products">
            {productItems}
          </Row>
        );
      }
    };

    ProductContent = ProductAlgorithm(products);

    return (
      <Container>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <hr />
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        {ProductContent}
      </Container>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);

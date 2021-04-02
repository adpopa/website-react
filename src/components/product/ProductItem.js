import React, { Component } from "react";
import { Container, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProductImage from "./resources/img/img.jpg";
import "./ProductItem.scss";

class ProductItem extends Component {
  render() {

    const {product} = this.props;

    return (
      <Container className="col-lg-3 col-md-6 mb-4">
        <Card className="align-items-center">
          <Image src={ProductImage} className="img-fluid" alt="" />
          <Card.Body className="text-center">
            <Link to="/product/" className="grey-text">
              <h5>{product.productType}</h5>
            </Link>
            <h5>
              <strong>
                <Link to={`/product/${product.productId}/v/${product.productColours[0].colourId}`} className="dark-grey-text">
                {product.productName}
                </Link>
              </strong>
            </h5>
            <h4 className="blue-text">
              <strong>£{product.productPrice}</strong>
            </h4>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default ProductItem;

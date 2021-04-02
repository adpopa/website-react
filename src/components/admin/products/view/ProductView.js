import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct, deleteProduct } from "../../../../actions/productActions";
import { FormGroup, Form, Button } from "react-bootstrap";
import VariationTable from "./VariationTable";
import { Link } from "react-router-dom";

class ProductView extends Component {

  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.getProduct(productId, this.props.history);
  }

  onClickDelete(productId) {
    this.props.deleteProduct(productId, this.props.history);
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <div className="float-right">
          <Link
            className="btn btn-primary btn-link"
            to={`/admin/dashboard/update/products/${product.productId}`}
          >
            Update
          </Link>
          <Button
            className="ml-3"
            onClick={this.onClickDelete.bind(this, product.productId)}
          >
            Delete
          </Button>
        </div>
        <FormGroup>
          <Form.Label>Gender</Form.Label>
          <h5>{product.productGender}</h5>
        </FormGroup>
        <FormGroup>
          <Form.Label>Product brand</Form.Label>
          <h5>{product.productBrand}</h5>
        </FormGroup>
        <FormGroup>
          <Form.Label>Product type</Form.Label>
          <h5>{product.productType}</h5>
        </FormGroup>
        <FormGroup>
          <Form.Label>Product name</Form.Label>
          <h5>{product.productName}</h5>
        </FormGroup>
        <FormGroup>
          <Form.Label>Product price</Form.Label>
          <h5>{product.productPrice}</h5>
        </FormGroup>
        <FormGroup>
          <Form.Label>Variations table</Form.Label>
          {product.productColours &&
            VariationTable(product.productColours)}
        </FormGroup>
      </div>
    );
  }
}

ProductView.propTypes = {
  getProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product.product
});

export default connect(
  mapStateToProps,
  { getProduct, deleteProduct }
)(ProductView);

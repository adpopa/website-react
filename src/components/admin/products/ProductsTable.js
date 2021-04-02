import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Alert, Table } from "react-bootstrap";

import PropTypes from "prop-types";
import { getProducts } from "../../../actions/productActions";
import ProductRow from "./ProductRow";

class ProductsTable extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  TableAlgorithm(products) {
    
    let productItems = [];

    if (products.length < 1) {
      return (
        <Alert className="text-center mt-3" variant="info">
          No products in database
        </Alert>
      );
    } else {
      const items = products.map(product => (
        <ProductRow key={product.productId} product={product} />
      ));
      for (let i = 0; i < items.length; i++) {
        productItems.push(items[i]);
      }

      return (
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Type</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Colours</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{productItems}</tbody>
        </Table>
      );
    }
  }

  render() {
    const { products } = this.props.products;
    
    const ProductTable = this.TableAlgorithm(products);

    return (
      <div>
        <h1>Products list</h1>
        <Link
          className="btn btn-primary btn-link"
          to="/admin/dashboard/add/products"
        >
          Add product
        </Link>
        {ProductTable}
      </div>
    );
  }
}

ProductsTable.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(ProductsTable);

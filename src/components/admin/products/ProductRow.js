import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteProduct } from "../../../actions/productActions";

class ProductRow extends Component {
  onClickDelete(productId) {
    this.props.deleteProduct(productId, null);
  }

  render() {
    const { product } = this.props;
    return (
      <tr>
        <td>{product.productName}</td>
        <td>{product.productBrand}</td>
        <td>{product.productType}</td>
        <td>{product.productGender}</td>
        <td>{product.productPrice}</td>
        <td>{product.productColours.length}</td>
        <td>{product.createdAt}</td>
        {product.updatedAt && <td>{product.updatedAt}</td>}
        {!product.updatedAt && <td>never</td>}
        <td>
          <Link
            className="btn btn-primary btn-link"
            to={`/admin/dashboard/products/${product.productId}`}
          >
            V
          </Link>
          <Button
            className="ml-1"
            onClick={this.onClickDelete.bind(this, product.productId)}
          >
            D
          </Button>
        </td>
      </tr>
    );
  }
}
export default connect(
  null,
  { deleteProduct }
)(ProductRow);

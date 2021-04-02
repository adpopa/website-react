import React, { Component } from "react";

class VariationRow extends Component {
  render() {
    const { colour } = this.props;
    let rows = [];

    colour.productVariations.forEach(variation =>
      rows.push(
        <tr key={variation.variationId}>
          <td>{colour.productColour}</td>
          <td>{variation.productSize}</td>
          <td>{variation.productQuantity}</td>
          <td>{variation.createdAt}</td>
          {variation.updatedAt && <td>{variation.updatedAt}</td>}
          {!variation.updatedAt && <td>never</td>}
        </tr>
      )
    );

    return rows;
  }
}

export default VariationRow;

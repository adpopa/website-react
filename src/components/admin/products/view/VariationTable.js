import React from "react";

import { Alert, Table } from "react-bootstrap";
import VariationRow from "./VariationRow";

export default function VariationTable(colours) {
  let variationItems = [];

  if (colours.length < 1) {
    return (
      <Alert className="text-center mt-3" variant="info">
        No colours in database
      </Alert>
    );
  } else {
    colours.forEach(colour =>
      variationItems.push(
        <VariationRow colour={colour} />
      )
    );

    return (
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Color</th>
            <th>Size</th>
            <th>Stock</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>{variationItems}</tbody>
      </Table>
    );
  }
}

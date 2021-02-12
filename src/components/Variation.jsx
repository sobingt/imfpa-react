import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const Variation = (props) => {
  const createAttributeElement = (attributes) => {
    let element = attributes.map((attribute, index) => <li key={index + 1}>{attribute.name} - {attribute.option}</li>)
    return <ul>{element}</ul>
  }

  const createVariationElement = (variations) => {
    console.log("variations")
    console.log(variations)
    let element = variations.map((variation, index) => {
      return (<Table.Row key={index + 1}>
        {/* <Table.Cell>{variation.description}</Table.Cell> */}
        <Table.Cell>{variation.price}</Table.Cell>
        <Table.Cell>{variation.regular_price}</Table.Cell>
        <Table.Cell>{variation.dimensions.width} x {variation.dimensions.height}</Table.Cell>
        <Table.Cell>{createAttributeElement(variation.attributes)}</Table.Cell>
      </Table.Row>)
    })
    return <Table.Body>{element}</Table.Body>
  }

  const createTableElement = (products) => {
    let element = products.map((product, index) => {
      return (
        <Table key={index+1} singleLine>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell>Description</Table.HeaderCell> */}
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Regular Price</Table.HeaderCell>
              <Table.HeaderCell>Dimensions</Table.HeaderCell>
              <Table.HeaderCell>Painting Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {createVariationElement(product.variations)}
        </Table>
      );
    })
    return element;
  }
  return (
    <div>{createTableElement(props.products)}</div>
  );
};
export default Variation;

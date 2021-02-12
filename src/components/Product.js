import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
import SideBar from "../SideBar";
import { Table } from "semantic-ui-react";
import db from "../services/LocalDBService";

const Product = (props) => {
  const idParam = props.match.params.id.substring(3);
  const initialProductState = {
    id: idParam,
    name: "",
    regular_price: "",
    sale_price: "",
    purchasable: false,
    sku: "",
    variation: []
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);

  const getProduct = (id) => {
    const savedProduct = db.get(id);
    if (!savedProduct) {
      console.log("API called")
      ProductDataService.get(id)
        .then((response) => {
          setCurrentProduct(response.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else setCurrentProduct(savedProduct);
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const variationTable = (product) => {
    console.log(product)
  return <div>{product.name}</div>;
  };
  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <h1 className="text-center"> Details</h1>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Properties</Table.HeaderCell>
                <Table.HeaderCell>Values</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>{currentProduct.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>{currentProduct.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>SKU</Table.Cell>
                <Table.Cell>{currentProduct.sku}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Price</Table.Cell>
                <Table.Cell>{currentProduct.price}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>{currentProduct.status}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        {currentProduct.variations}
        {variationTable(currentProduct)}
      </div>
    </>
  );
};
export default Product;

import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
import SideBar from "../SideBar";
import { Table } from "semantic-ui-react";

const Product = (props) => {
  const idParam = props.match.params.id.substring(3);
  const initialProductState = {
    id: idParam,
    name: "",
    regular_price: "",
    sale_price: "",
    purchasable: false,
    sku: "",
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);

  const getProduct = (id) => {
    ProductDataService.get(id)
      .then((response) => {
        setCurrentProduct(response.data);
        console.log(response.data);
        console.log(currentProduct);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCurrentProduct({ ...currentProduct, [name]: value });
  // };

  // const updatePurchasable = (status) => {
  //   var data = {
  //     id: currentProduct.id,
  //     name: currentProduct.name,
  //     regular_price: currentProduct.regular_price,
  //     purchasable: status,
  //   };

  //   ProductDataService.update(currentProduct.id, data)
  //     .then((response) => {
  //       setCurrentProduct({ ...currentProduct, purchasable: status });
  //       // console.log(response.data);
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //     });
  // };

  // const updateProduct = () => {
  //   ProductDataService.update(currentProduct.id, currentProduct)
  //     .then((response) => {
  //       // console.log(response.data);
  //       setMessage("The Product was updated successfully!");
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //     });
  // };

  // const deleteProduct = () => {
  //   ProductDataService.remove(currentProduct.id)
  //     .then((response) => {
  //       // console.log(response.data);
  //       props.history.push("/Products");
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //     });
  // };

  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          {/* <div>
            <h1>Product Details</h1>
            <h3>
              <span className="badge-info badge-pill mr-3">Id </span>
              {currentProduct.id}
            </h3>
            <h3>
              <span className="badge-info badge-pill mr-3">Name </span>
              {currentProduct.name}
            </h3>
            <h3>
              <span className="badge-info badge-pill mr-3">Price </span>
              {currentProduct.regular_price}
            </h3>
            <h3>
              <span className="badge-info badge-pill mr-3">SKU </span>
              {currentProduct.sku}
            </h3>

           
            
          </div> */}
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
      </div>
    </>
  );
};
export default Product;

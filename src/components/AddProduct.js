import React, { useState } from "react";
import ProductDataService from "../services/ProductServices";
import SideBar from "../SideBar";

const AddProduct = () => {
  const initialProductState = {
    id: "",
    name: "",
    regular_price: "",
    sale_price: "",
    sku: "",
    purchasable: false,
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    // console.log(JSON.stringify(value));
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      sku: product.sku,
    };

    ProductDataService.create(data)
      .then((response) => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          regular_price: response.data.regular_price,
          sale_price: response.data.sale_price,
          purchasable: response.data.purchasable,
          sku: response.data.sku,
        });
        setSubmitted(true);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <h2 className="mb-4">Add Product</h2>
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newProduct}>
                  Add Another
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={product.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="regular_price">Regular Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="regular_price"
                    required
                    value={product.regular_price}
                    onChange={handleInputChange}
                    name="regular_price"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sale_price">Sale Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="sale_price"
                    required
                    value={product.sale_price}
                    onChange={handleInputChange}
                    name="sale_price"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sku">Stock Keeping Unit</label>
                  <input
                    type="number"
                    className="form-control"
                    id="sku"
                    required
                    value={product.sku}
                    onChange={handleInputChange}
                    name="sku"
                  />
                </div>

                <button onClick={saveProduct} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

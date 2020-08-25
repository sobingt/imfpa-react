import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
import SideBar from "../SideBar";

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
  const [message, setMessage] = useState("");

  const getProduct = (id) => {
    ProductDataService.get(id)
      .then((response) => {
        setCurrentProduct(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updatePurchasable = (status) => {
    var data = {
      id: currentProduct.id,
      name: currentProduct.name,
      regular_price: currentProduct.regular_price,
      purchasable: status,
    };

    ProductDataService.update(currentProduct.id, data)
      .then((response) => {
        setCurrentProduct({ ...currentProduct, purchasable: status });
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then((response) => {
        // console.log(response.data);
        setMessage("The Product was updated successfully!");
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then((response) => {
        // console.log(response.data);
        props.history.push("/Products");
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <div>
            {currentProduct ? (
              <div className="edit-form">
                <h2 className="mb-4">Update Product</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regular_price">Regular price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="regular_price"
                      name="regular_price"
                      value={currentProduct.regular_price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sale_price">Sale Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="sale_price"
                      required
                      value={currentProduct.sale_price}
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
                      value={currentProduct.sku}
                      onChange={handleInputChange}
                      name="sku"
                    />
                  </div>

                  <div className="form-group">
                    <label className="p-2">
                      <strong>Status:</strong>
                    </label>
                    {currentProduct.purchasable ? "Purchasable" : "Pending"}
                  </div>
                </form>

                {currentProduct.purchasable ? (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => updatePurchasable(false)}
                  >
                    Pending
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => updatePurchasable(true)}
                  >
                    Purchasable
                  </button>
                )}

                <button className="btn btn-danger mr-2" onClick={deleteProduct}>
                  Delete
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={updateProduct}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Product...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

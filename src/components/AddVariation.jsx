import React, { useState } from "react";
import SideBar from "../SideBar";
import shttp from "../shttp";

const AddVariation = () => {
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  //handle input functions
  const handlRegularPrice = (e) => {
    setRegularPrice(e.target.value);
  };
  const handleSalePrice = (e) => {
    setSalePrice(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  // data to be created
  const data = {
    create: [
      {
        price: `${price}`,
        regular_price: `${regularPrice}`,
        sale_price: `${salePrice}`,
      },
    ],
  };

  //function for adding variations
  const createVariation = () => {
    setLoading(true);

    shttp
      .post(`/products/2193/variations/batch`, data)
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <h1 className="border-bottom pb-3 mb-4">Add Variation</h1>
          <form noValidate>
            <div className="row form-group">
              <div className="col-lg-3">SKU:</div>

              <div className="col-lg-9">
                <textarea
                  className=" form-control"
                  placeholder="SKU Lists"
                  rows="3"
                  required
                  id="skus"
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-3">
                {/* Canvas Cost (30cm, 40cm, 50cm): */}
                regurlar price
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  name="regularPrice"
                  placeholder="regular price"
                  className="form-control"
                  value={regularPrice}
                  onChange={handlRegularPrice}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-3">
                {/* Canvas Cost (60cm, 70cm, 80cm): */}
                sale price
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  name="salePrice"
                  placeholder="sale price"
                  className="form-control"
                  value={salePrice}
                  onChange={handleSalePrice}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-3">
                {/* Wrap Cost: */}
                price
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  name="price"
                  placeholder="price"
                  className="form-control"
                  value={price}
                  onChange={handlePrice}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-9 offset-lg-3 ">
                <button
                  type="button"
                  onClick={createVariation}
                  className="btn btn-primary"
                  value="Submit"
                  disabled={loading}
                >
                  {loading && <i className="fa fa-refresh fa-spin"></i>}
                  Submit
                </button>
                <input
                  type="reset"
                  className="btn btn-secondary m-2"
                  value="Reset"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVariation;

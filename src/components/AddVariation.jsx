import React, { useState } from "react";
import SideBar from "../SideBar";
import shttp from "../shttp";
import variation from "../utils/variation";
import db from "../services/LocalDBService";
import Variation from "./Variation";

const AddVariation = () => {
  const initialCost = {
    matt: 15,
    frame: {
      paper: {
        black: 22,
        brown: 22,
        burgundy: 20,
        natural: 21,
        white: 20,
      },
      canvas: {
        black: 25,
        brown: 25,
        natural: 25,
        no: 0,
        wrap: 7,
      },
    },
    paper: 25,
    canvas: 34,
  }
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [variationArray, setVariationArray] = useState([]);
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState(initialCost);
  const [skus, setSKUs] = useState("5510.443.43");
  const [loading, setLoading] = useState(false);

  const [previewLoading, setPreviewLoading] = useState(false);

  //handle input functions
  const handlRegularPrice = (e) => {
    setRegularPrice(e.target.value);
  };
  const handleSalePrice = (e) => {
    setSalePrice(e.target.value);
    console.log(salePrice)
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleSKUs = (e) => {
    setSKUs(e.target.value);
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
        //console.log(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        //console.log(error.response.data);
      });
  };

  const previewVariation = () => {
    setPreviewLoading(true);
    var product = variation.createPreVariationObject({
      sku: "5510.443.43",
      id: 196236,
      variations: [],
      meta_data: {
        w: 800,
        h: 600,
      },
    });

    var v = variation.createAllProductVariation(product, cost);
    let skuArray = skus.split('\n')
    let tempVariationArray = [];
    skuArray.forEach((sku) => {
      let product = db.findBySKU(sku)
      let w, h;
      product.meta_data.forEach(data => {
        if (data.key == "image_width") {
          w = Number(data.value);
        }
        if (data.key == "image_height") {
          h = Number(data.value);
        }
      });
      product = variation.createPreVariationObject({
        sku: product.sku,
        id: product.id,
        variations: product.variations,
        meta_data: {
          w,
          h,
        },
      });
      let v = variation.createAllProductVariation(product);
      tempVariationArray.push(v)
    })
    setVariationArray(tempVariationArray)
    setTimeout(() => {
      setPreviewLoading(false);
    }, 2000);

  };

  const getFormGroup = (label, name, value, handleFn) => {
    return (<div className="form-group row">
      <div className="col-lg-3">
        {label}
      </div>
      <div className="col-lg-9">
        <input
          type="text"
          name={name}
          placeholder={label}
          className="form-control"
          value={value}
          onChange={handleFn}
        />
      </div>
    </div>)
  }
  const initialCost = {
    matt: 15,
frame: {
    paper: {
    black: 22,
brown: 22,
burgundy: 20,
natural: 21,
white: 20,
},
canvas: {
    black: 25,
brown: 25,
natural: 25,
no: 0,
wrap: 7,
},
},
paper: 25,
canvas: 34,
}}

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
                  value={skus}
                  onChange={handleSKUs}
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
        
            {getFormGroup('Matt', 'costMatt', cost.matt, handleCostMatt)}
            {getFormGroup('Frame Paper Black', 'costFramePaperBlack', cost.frame.paper.black, handleCostFramePaperBlack)}
            {getFormGroup('Frame Paper Brown', 'costFramePaperBrown', cost.frame.paper.brown, handleCostFramePaperBrown)}
            {getFormGroup('Frame Paper Burgundy', 'costFramePaperBurgundy', cost.frame.paper.burgundy, handleCostFramePaperBurgundy)}
            {getFormGroup('Frame Paper Black', 'costFramePaperBlack', cost.frame.paper.natural, handleCostFramePaperBlack)}
            {getFormGroup('Frame Paper Black', 'costFramePaperBlack', cost.frame.paper.white, handleCostFramePaperBlack)}

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
                  value="Create Variation"
                  disabled={loading}
                >
                  {loading && <i className="fa fa-refresh fa-spin"></i>}
                  Create Variation
                </button>
                <button
                  type="button"
                  onClick={previewVariation}
                  className="btn btn-secondary m-2"
                  value="Preview Variation"
                  disabled={previewLoading}
                >
                  {previewLoading && <i className="fa fa-refresh fa-spin"></i>}
                  Preview Variation
                </button>
                <input
                  type="reset"
                  className="btn btn-secondary m-2"
                  value="Reset"
                />
              </div>
            </div>

          </form>
          {variationArray.length > 0 ? <Variation products={variationArray} ></Variation> : null}

        </div>
      </div>
    </div>
  );
};

export default AddVariation;

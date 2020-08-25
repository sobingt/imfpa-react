import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import SideBar from "../SideBar";
import { TablePagination } from "react-pagination-table";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // const [currentProduct, setCurrentProduct] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const Header = ["Id", "Name", "Price", "SKU", "Status"];
  useEffect(() => {
    retriveProducts();
  }, []);

  const retriveProducts = () => {
    ProductDataService.getAll()

      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  // const refreshList = () => {
  //   retriveProducts();
  //   setCurrentProduct(null);
  //   // setCurrentIndex(-1);
  // };
  // const setActiveProduct = (product, index) => {
  //   setCurrentProduct(product);
  //   setCurrentIndex(index);
  // };
  // const removeAllProducts = () => {
  //   ProductDataService.removeAll()
  //     .then((response) => {
  //       // console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //     });
  // };

  // const removeProduct = () => {
  //   ProductDataService.remove(currentProduct.id)
  //     .then((response) => {
  //       // console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const findById = () => {
    ProductDataService.findById(searchName)
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
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
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              rows="1"
              placeholder="Search by id (give space or comma between two id's)"
              value={searchName}
              onChange={onChangeSearchName}
            ></textarea>
            <div className="input-group-append">
              <button
                className="btn search-btn text-white btn-outline-secondary"
                type="button"
                onClick={findById}
              >
                Search
              </button>
            </div>
          </div>

          <TablePagination
            title="Product List"
            // subTitle="Sub Title"
            headers={Header}
            data={products}
            columns="id.name.price.sku.status"
            perPageItemCount={10}
            // partialPageCount={3}
            totalCount={100}
            arrayOption={[["size", "all", " "]]}
            nextPageText="Next"
            prePageText="Prev"
            className="table-striped table-light table-responsive"
          />
        </div>
      </div>
    </>
  );
};
export default ProductList;

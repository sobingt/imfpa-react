import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
import ImageStatus from "./ImageStatus";
import GetImages from "./GetImages";
import { Link } from "react-router-dom";
import { Switch } from "antd";

// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import SideBar from "../SideBar";
// import { TablePagination } from "react-pagination-table";
import "./ProductList.css";
import { Icon, Menu, Table } from "semantic-ui-react";

const PaintingList = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [imageStatus, setImageStatus] = useState(false);
  useEffect(() => {
    retriveProducts();
  }, []);

  const retriveProducts = () => {
    ProductDataService.getCategory(10, currentIndex)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const nextProducts = () => {
    if (searchName != "") {
      ProductDataService.findByTermInPainting(searchName, 10, currentIndex + 1)

        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
          const nextPage = currentIndex + 1;
          setCurrentIndex(nextPage);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      ProductDataService.getCategory(10, currentIndex + 1)

        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
          const nextPage = currentIndex + 1;
          setCurrentIndex(nextPage);
        })
        .catch((e) => {
          // console.log(e);
        });
    }
  };
  const ToggleButton = () => {
    imageStatus ? setImageStatus(false) : setImageStatus(true);
  };
  const prevProducts = () => {
    if (searchName != "") {
      ProductDataService.findByTermInPainting(searchName, 10, currentIndex - 1)

        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
          const prevPage = currentIndex - 1;
          setCurrentIndex(prevPage);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      ProductDataService.getCategory(10, currentIndex - 1)

        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
          const prevPage = currentIndex - 1;
          setCurrentIndex(prevPage);
        })
        .catch((e) => {
          // console.log(e);
        });
    }
  };

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

  const findByTerm = () => {
    ProductDataService.findByTermInPainting(searchName, 10, currentIndex)
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <div>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <div className="col-md-12">
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
                  Search By Id
                </button>
                <button
                  className="btn search-btn text-white btn-outline-secondary"
                  type="button"
                  onClick={findByTerm}
                >
                  Global Search
                </button>
              </div>
            </div>
          </div>

          <h4 className="title">Painting List</h4>

          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>SKU</Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="p-1">Image</span>
                  <Switch onClick={ToggleButton} />
                </Table.HeaderCell>
                <Table.HeaderCell>Variations</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((product) => {
                return (
                  <Table.Row key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <Table.Cell>{product.id}</Table.Cell>
                    </Link>
                    <Table.Cell>
                      <a href={product.permalink}>{product.name}</a>
                    </Table.Cell>
                    <Table.Cell>{product.sku}</Table.Cell>
                    <Table.Cell>
                      {/* <GetImages sku={product.sku} /> */}
                      {/* <ImageStatus sku={product.sku}/> */}
                      {imageStatus ? <GetImages sku={product.sku} /> : "false"}
                    </Table.Cell>
                    <Table.Cell>{product.variations.length}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          <div className="clearfix">
            <ul className="pagination-status">
              <li className="pagination-status__item">
                <button
                  className="pagination-status__btn pagination-status__btn--disable"
                  onClick={prevProducts}
                >
                  Prev
                </button>
              </li>
              Page: {currentIndex}
              <li className="pagination-status__item">
                <button
                  className="pagination-status__btn "
                  onClick={nextProducts}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaintingList;

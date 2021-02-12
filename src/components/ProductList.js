import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
import SideBar from "../SideBar";
import GetImages from "./GetImages";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { Switch } from "antd";
import db from "../services/LocalDBService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    retriveProducts();
  }, []);

  // getting per_page selected value
  const onOptionChange = (e) => {
    setPerPage(e.target.value);
  };
  const onPageClick = () => {
    retriveProducts();
  };

  const ToggleButton = () => {
    imageStatus ? setImageStatus(false) : setImageStatus(true);
  };
  const retriveProducts = () => {
    ProductDataService.getAllProducts(perPage, currentIndex)

      .then((response) => {
        setProducts(response.data);
        db.appendProducts(response.data)
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const nextProducts = () => {
    ProductDataService.getAllProducts(10, currentIndex + 1)

      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        const nextPage = currentIndex + 1;
        setCurrentIndex(nextPage);
        db.appendProducts(response.data)
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const prevProducts = () => {
    const prevPage = currentIndex - 1;
    setCurrentIndex(prevPage);
    ProductDataService.getAllProducts(10, currentIndex)

      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        db.appendProducts(response.data)
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const findById = () => {
    ProductDataService.findById(searchName)
      .then((response) => {
        setProducts(response.data);
        db.appendProducts(response.data)
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const findByTerm = () => {
    ProductDataService.findByTerm(searchName)
      .then((response) => {
        setProducts(response.data);
        db.appendProducts(response.data)
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

          <h4 className="title">Product List</h4>

          <select
            className="float-right bg-light text-primary p-2 m-1"
            onChange={onOptionChange}
            onClick={onPageClick}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30"> 30</option>
            <option value="40">40</option>
          </select>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>SKU</Table.HeaderCell>
                <Table.HeaderCell>Categories</Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="p-1">Image</span>
                  <Switch onClick={ToggleButton} />
                </Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Variations</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((product) => {
                return (
                  <Table.Row key={product.id}>
                    <Table.Cell>
                      <Link to={`/products/${product.id}`}>{product.id} </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <a target="_blank" href={product.permalink}>
                        {product.name}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{product.sku}</Table.Cell>
                    <Table.Cell>
                      {product.categories.map((item, i) => {
                        return (
                          <span key={i}>
                            <a
                              target="_blank"
                              href={`https://imfpa.org/product-category/${item.slug}`}
                            >
                              {item.name}
                            </a>
                          </span>
                        );
                      })}
                    </Table.Cell>
                    <Table.Cell>
                      {/* <GetImages sku={product.sku} /> */}

                      {imageStatus ? <GetImages sku={product.sku} /> : "false"}
                      {/* <ImageStatus sku={product.sku}/> */}
                    </Table.Cell>
                    <Table.Cell>
                      <div
                        dangerouslySetInnerHTML={{ __html: product.price_html }}
                      />
                    </Table.Cell>
                    <Table.Cell>{product.variations.length}</Table.Cell>
                    <Table.Cell>{product.status}</Table.Cell>
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
    </>
  );
};
export default ProductList;

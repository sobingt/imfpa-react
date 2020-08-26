import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductServices";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import SideBar from "../SideBar";
// import { TablePagination } from "react-pagination-table";
import "./ProductList.css";
import { Icon, Menu, Table } from "semantic-ui-react";

const PaintingList = () => {
  const [products, setProducts] = useState([]);
  // const [currentProduct, setCurrentProduct] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  //   const Header = ["Id", "Name", "Permalink", "SKU", "Status"];
  useEffect(() => {
    retriveProducts();
  }, []);

  const retriveProducts = () => {
    ProductDataService.getCategory()

      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };
  const count = Object.keys(products).length;
  console.log(count);

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
  const fetchingImages = (sku) => {
    var url = "https://cdn.imfpa.org/paintings/";
    var paintingSize = [
      "_800",
      "_O",
      "_800-30cm-Black-0.5",
      "_800-40cm-Black-0.5.jpg",
      "_800-50cm-Black-0.5",
    ];
    var ext = ".jpg";
    var length = [30, 40, 50, 60, 70, 80];
    var color = ["black", "brown"];
    var painting_type = [0.5, 0.75];
    var image1 = url + sku + paintingSize[0] + ext;
    var image2 = url + sku + paintingSize[1] + ext;
    var image3 = url + sku + paintingSize[2] + ext;
    var image4 = url + sku + paintingSize[3] + ext;
    var image5 = url + sku + paintingSize[4] + ext;

    var frame1 =
      url +
      sku +
      "_800-" +
      length[0] +
      "cm-" +
      color[0] +
      "-" +
      painting_type[0] +
      ext;

    // return sku;
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
          <h4 className="title">Painting List</h4>

          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>SKU</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Variations</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((product) => {
                return (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.id}</Table.Cell>
                    <Table.Cell>
                      <a href={product.permalink}>{product.name}</a>
                    </Table.Cell>
                    <Table.Cell>{product.sku}</Table.Cell>
                    <Table.Cell>{fetchingImages(product.sku)}</Table.Cell>
                    <Table.Cell>{product.variations.length}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
export default PaintingList;

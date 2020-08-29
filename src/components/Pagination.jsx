import React from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const pageLinks = [];
  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage === i ? "active" : "";

    pageLinks.push(
      <li
        className={`text-white p-2 ${active}`}
        key={i}
        onClick={() => props.nextPage(i)}
      >
        <a href="#" className="pagination-anchor">
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <ul className="pagination bg-light">
          {props.currentPage > 1 ? (
            <li
              className={`text-white p-2`}
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <a href="#">Prev</a>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages + 1 ? (
            <li
              className={`text-white p-2`}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <a href="#">Next</a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};
export default Pagination;

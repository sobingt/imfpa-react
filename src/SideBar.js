import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { Link, Redirect } from "react-router-dom";

function SideBar() {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      // console.log("user logged in");
    } else {
      setRedirect({ redirect: true });
    }
  }, []);

  const onLogout = () => {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    setRedirect({ redirect: true });
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo">IMFPA</div>
        <ul className="sidebar-navigation">
          <li className="header">
            <font>DASHBOARD</font>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fa fa-home" aria-hidden="true"></i>
              <font>Home</font>
            </Link>
          </li>
          {/* <li className="header">
            <font>Products</font>
          </li> */}
          <li>
            <Link to="/products">
              <i className="fa fa-list" aria-hidden="true"></i>
              <font>Product List</font>
            </Link>
          </li>
          <li>
            <Link to="/paintings">
              <i className="fa fa-photo" aria-hidden="true"></i>
              <font>Painting List</font>
            </Link>
          </li>
          {/* <li>
            <Link to="/add">
              <i className="fa fa-plus" aria-hidden="true"></i>
              <font>Add Product</font>
            </Link>
          </li> */}
          {/* <li className="header">
            <font>Options</font>
          </li> */}
          <li>
            <button
              style={{ fontSize: 14 }}
              className="btn text-white"
              onClick={onLogout}
            >
              <i className="fa fa-sign-out pl-3" aria-hidden="true"></i>
              <font>Logout</font>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;

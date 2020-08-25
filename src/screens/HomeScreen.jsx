import React from "react";
import SideBar from "../SideBar";

const HomeScreen = () => {
  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="jumbotron">
          <h1>DASHBOARD</h1>
          <p>Welcome to IMFPA</p>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;

import React, { useState } from "react";
import { PostData } from "../services/PostData";
import { Redirect } from "react-router-dom";
import db from "../services/LocalDBService";

const LoginScreen = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    redirect: false,
  });

  const onChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = () => {
    PostData(user).then((result) => {
      let responseJSON = result;
      if (responseJSON.token) {
        sessionStorage.setItem("userData", JSON.stringify(responseJSON));
        setUser({ redirect: true });
      } else {
        console.log("Incorrect Login Details");
      }
    });
  };
  if (user.redirect) {
    return <Redirect to={"/dashboard"} />;
  }

  if (sessionStorage.getItem("userData")) {
    return <Redirect to={"/dashboard"} />;
  }

  db.init();
  return (
    <div className="container text-center mt-5 pt-5">
      <div className="col-md-6 offset-md-3">
        <div className="jumbotron ">
          <h1>Login</h1>
          <form>
            <input
              className="form-control m-2"
              type="text"
              name="username"
              placeholder="Enter Name"
              onChange={onChangeInput}
              value={user.username}
            />
            <input
              className="form-control m-2"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={onChangeInput}
              value={user.password}
            />

            <input
              className="btn btn-primary"
              onClick={onSubmit}
              value="Login"
              name="login"
              type="button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

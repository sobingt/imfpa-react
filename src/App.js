import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Error from "./screens/Error";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={HomeScreen} />
        <Route exact path="/" component={LoginScreen} />
        <Route path="/add" component={AddProduct} />
        <Route path="/products/:id" component={Product} />
        <Route exact path={["/", "/products"]} component={ProductList} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;

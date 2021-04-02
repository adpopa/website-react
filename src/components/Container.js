import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./Container.css"

import MyHeader from "./header/MyHeader";
import Products from "./product/Products";
import SignUp from "./SignUp";
import MyFooter from "./footer/MyFooter";
import ProductPage from "./product/ProductPage";
import ShoppingCart from "./cart/ShoppingCart";
import Login from "./Login";

class Container extends Component {
  render() {
    return (
      <div>
        <MyHeader />
        <main id="app-container">
          <Route exact path="/" component={Products} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/product/:productId/v/:colourId" component={ProductPage} />
          <Route exact path="/shoppingcart" component={ShoppingCart} />
        </main>
        <MyFooter />
      </div>
    );
  }
}

export default Container;

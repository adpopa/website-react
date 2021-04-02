import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Container from "./components/Container";
import Dashboard from "./components/admin/Dashboard";
import jwt_decode from "jwt-decode";
import setJwtToHeader from "./securityUtils/setJwtToHeader";
import { SET_CURRENT_USER, SET_CART } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredAdminRoute from "./securityUtils/SecuredAdminRoute"
import SecuredUserRouteCart from "./securityUtils/SecuredUserRouteCart";
import Buy from "./components/buy/Buy";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJwtToHeader(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  // handle logout
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
  }
}

const cart = localStorage.cart;

if(cart) {
  store.dispatch({
    type: SET_CART,
    payload: JSON.parse(cart)
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {
              // Public Routes
            }
            <Route exact path="/" component={Container} />
            <Route exact path="/login" component={Container} />
            <Route exact path="/signup" component={Container} />
            <Route exact path="/product/:productId/v/:colourId" component={Container} />
            <Route exact path="/shoppingcart" component={Container} />
            {
              // Private Routes
            }
              <Switch>
                <SecuredAdminRoute exact path="/admin/dashboard" component={Dashboard} />
                <SecuredAdminRoute exact path="/admin/dashboard/products" component={Dashboard} />
                <SecuredAdminRoute exact path="/admin/dashboard/add/products" component={Dashboard}/>
                <SecuredAdminRoute exact path="/admin/dashboard/products/:productId" component={Dashboard}/>
                <SecuredAdminRoute exact path="/admin/dashboard/update/products/:productId" component={Dashboard}/>
                <SecuredAdminRoute exact path="/admin/dashboard/update/products/:productId" component={Dashboard}/>
              </Switch>
            {
              // Order Routes
            }
              <Route exact path="/buy/login" component={Buy} />
              <Switch>
                <SecuredUserRouteCart exact path="/buy/delivery" component={Buy} />
                <SecuredUserRouteCart exact path="/buy/payment" component={Buy} />
                <SecuredUserRouteCart exact path="/buy/order" component={Buy} />
                <SecuredUserRouteCart exact path="/buy/confirmation" component={Buy} />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

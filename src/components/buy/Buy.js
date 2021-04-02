import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav, Row, Col } from "react-bootstrap";

import Login from "../Login"
import Delivery from "./Delivery";
import Payment from "./Payment";
import Order from "./Order";
import Confirmation from "./Confirmation";

class Buy extends Component {
  render() {
    return (
      <div>
        <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 ">
          <p className="navbar-brand col-sm-3 col-md-2 mr-0 mb-0">
            Company name
          </p>
          <Row className="mx-auto">
            <Col>
              <p className={(this.props.match.path === "/buy/login") ? "navbar-brand text-info mb-0" : "navbar-brand mb-0"}>Sign In</p>
            </Col>
            <Col>
              <p className={(this.props.match.path === "/buy/delivery") ? "navbar-brand text-info mb-0" : "navbar-brand mb-0"}>Delivery</p>
            </Col>
            <Col>
              <p className={(this.props.match.path === "/buy/payment") ? "navbar-brand text-info mb-0" : "navbar-brand mb-0"}>Payment</p>
            </Col>
            <Col>
            <p className={(this.props.match.path === "/buy/order") ? "navbar-brand text-info mb-0" : "navbar-brand mb-0"}>Place order</p>
            </Col>
            <Col>
            <p className={(this.props.match.path === "/buy/confirmation") ? "navbar-brand text-info mb-0" : "navbar-brand mb-0"}>Confirmation</p>
            </Col>
          </Row>
        </Nav>
        <main id="app-container">
          <Route exact path="/buy/login" component={Login} />
          <Route exact path="/buy/delivery" component={Delivery} />
          <Route exact path="/buy/payment" component={Payment} />
          <Route exact path="/buy/order" component={Order} />
          <Route exact path="/buy/confirmation" component={Confirmation} />
        </main>
      </div>
    );
  }
}

export default Buy;

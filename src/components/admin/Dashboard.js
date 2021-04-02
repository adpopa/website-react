import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./Dashboard.css"
import DashMenu from "./DashMenu";
import DashHome from "./DashHome";
import ProductAdd from "./products/add/ProductAdd";
import DashNavbar from "./DashNavbar";
import ProductsTable from "./products/ProductsTable";
import ProductView from "./products/view/ProductView";
import ProductUpdate from "./products/update/ProductUpdate";
import { Row, Container} from "react-bootstrap";

class Dashboard extends Component {
  render() {
    return (
      <div id="dashboard-container">
      <DashNavbar />
      <div className="container-fluid">
        <Row>
          <DashMenu />
          <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <Route exact path="/admin/dashboard" component={DashHome} />
          <Route exact path="/admin/dashboard/products" component={ProductsTable} />
          <Route exact path="/admin/dashboard/add/products" component={ProductAdd} />
          <Route exact path="/admin/dashboard/products/:productId" component={ProductView} /> {/* :productId = param */}
          <Route exact path="/admin/dashboard/update/products/:productId" component={ProductUpdate} /> {/* :productId = param */}
          </main>
        </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;

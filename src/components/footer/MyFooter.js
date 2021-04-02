import React from "react";
import { Card, Container, Row } from "react-bootstrap";

import "./MyFooter.scss"

function MyFooter() {
  return (
    <Card.Footer bg="dark">
      <Container>
        <Row>
          <ul className="links footer-nav list-inline">
            <li className="menu-item-left inline">
              <a href="/">FAQs</a>
            </li>
            <li className="menu-item-middle inline">
              <a href="/">PRIVACY POLICY</a>
            </li>
            <li className="menu-item-right inline">
              <a href="/">TERMS AND CONDITIONS</a>
            </li>
          </ul>
        </Row>
        <hr />
        <Row>
          <div className="text-muted">Copyright 2019 © Alex Daniel Popa</div>
        </Row>
      </Container>
    </Card.Footer>
  );
}

export default MyFooter;

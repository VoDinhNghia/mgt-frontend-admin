import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class FooterPage extends Component {
  render() {
    return (
      <>
        <div className="bg-primary mt-2 p-3 text-white text-center fs-6">
          <Row>
            <Col xl={4}>
              <p>About </p>
            </Col>
            <Col xl={4}>
              <p>Service</p>
            </Col>
            <Col xl={4}>
              <p>Contact</p>
            </Col>
          </Row>
        </div>
        <div className="text-center p-3 bg-light fs-6">@Copyright 2023</div>
      </>
    );
  }
}

export default FooterPage;

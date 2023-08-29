import React, { Component } from "react";
import "./index.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

class LoginPage extends Component {
  render() {
    return (
      <Container className="mt-4 LoginPage">
        <Row>
          <Col xl={6}>
            <img src="/images/loginIconLeft.png" alt="" width="100%" />
          </Col>
          <Col xl={6}>
            <div className="p-3 fs-6">
              <h4 className="text-center mt-4 mb-4">Login</h4>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" />
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control type="password" />
              <Button variant="outline-primary" className="mt-4 w-100">
                Login
              </Button>
              <p className="mt-2">
                <a href="/#" className="text-muted">
                  Forget password?
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;

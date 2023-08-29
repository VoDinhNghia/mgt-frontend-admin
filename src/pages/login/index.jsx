import React, { Component } from "react";
import "./index.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../../services/authService";
import { NotificationManager } from "react-notifications";
import { routes } from "../../constants/constant";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      passWord: e.target.value,
    });
  }

  async onHandleLogin() {
    const { email, passWord } = this.state;
    const res = await login({ email, passWord });
    if (res?.statusCode === 200) {
      NotificationManager.success(res?.message, "Login", 2000);
      setTimeout(() => {
        window.location.href = routes.home;
      }, 500);
    } else {
      NotificationManager.error(res?.message, "Login", 4000);
    }
  }

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
              <Form.Control
                type="text"
                onChange={(e) => this.onChangeEmail(e)}
              />
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.onChangePassword(e)}
              />
              <Button
                variant="outline-primary"
                className="mt-4 w-100"
                onClick={() => this.onHandleLogin()}
              >
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

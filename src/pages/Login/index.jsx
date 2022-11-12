import { Col, Row, Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import React from 'react';
import './index.css';
const Login = ({ setToken }) => {
  const loginUser = async (credentials) => {
    const data = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return await data.json();
  }
  const onFinish = async (values) => {
    const { data } = await loginUser({
      email: values.email,
      passWord: values.password,
    });
    setToken(data?.access_token);
  };
  return <div className='LoginPage'>
    <Row>
      <Col span={12} push={12} className='RightLogin'>
        <h2>Sign in</h2>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            className='email'
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type='email'
              placeholder="Enter your email at here."
            />
          </Form.Item>
          <Form.Item
            className='password'
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <a href="/" className="loginForgot">Forgot password ?</a>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12} pull={12} className='LeftLogin'>
        <h3>STUDENTS</h3>
        <h2>Start managing students with us!</h2>
        <p>This is a web application used to manage students of one university, hope you will have a great experience with us.</p>
        <img src="images/login-left-page.png" alt="login page" />
      </Col>
    </Row>
  </div>
};
export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
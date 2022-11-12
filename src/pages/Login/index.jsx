import { Col, Row, Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import './index.css';
const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
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
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12} pull={12} className='LeftLogin'>
        <h3>STUDENTS</h3>
        <h2>Start managing students with us!</h2>
        <p>This is a web application used to manage students of one university, hope you will have a great experience with us.</p>
        <img src="images/login-left-page.png" alt="image" />
      </Col>
    </Row>
  </div>
};
export default Login;
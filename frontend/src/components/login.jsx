import { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginAPICall, storeToken, saveLoggedInUser } from '../services/AuthService';
import './login.css';
import image from '../assets/munisysimage.jpg';
import logo from '../assets/download.png';
import icon1 from '../assets/icon1.png';
import inconlink from '../assets/iconlink.png';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginAPICall(values.username, values.password);
      const { accessToken, role } = response.data;

      storeToken(accessToken);
      saveLoggedInUser(values.username, role);

      message.success('Login successful');
      navigate('/layout/Dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Invalid username or password.');
      } else {
        message.error('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    form.resetFields();
  };

  return (
    <div className="app-container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Munisys Equip" />
        </div>
      </div>
      <div className="login-container">
        <div className="login-content">
          <div className="login-image">
            <img src={image} alt="Munisys Equip" />
          </div>
          <div className="login-form-container">
            <h2 className="login-heading">Login</h2>
            <p className="login-subheading">Please enter your credentials to continue.</p>
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  iconRender={visible => (visible ? <EyeTwoTone onClick={() => setPasswordVisible(!passwordVisible)} /> : <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                  Sign in
                </Button>
                <Button type="default" style={{ background: "#fff", color: '#333' }} className="login-form-button clear-button" onClick={onClear}>
                  Clear
                </Button>
              </Form.Item>
            </Form>
            <p className="forgot-password">
              If you forget your account, please contact the administrator.
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-left">
          <p>© 2024 MunisysEquipe. All Rights Reserved.</p>
          <div className="footer-links">
            <p href="#">Terms of Service | Privacy Policy</p>
          </div>
        </div>
        <div className="footer-icons">
          <a target='_blank' href="https://www.munisys.ma/"><img src={icon1} alt="Munisys Icon" /></a>
          <a target='_blank' href="https://www.linkedin.com/company/munisys/"><img src={inconlink} alt="LinkedIn Icon" /></a>
        </div>
      </div>
    </div>
  );
};

export default Login;

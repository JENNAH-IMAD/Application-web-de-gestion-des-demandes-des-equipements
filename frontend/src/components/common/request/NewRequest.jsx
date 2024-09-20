import { Form, Input, Button, Select, Typography, Modal, Row, Col } from 'antd';
import { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './NewRequest.css';
import { createRequestForCurrentUser } from '../../../services/RequestService.js';  // Import the service

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const NewRequest = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    const requestDto = {
      equipmentType: values.category,
      description: values.description,
      status: "In Progress"
    };

    createRequestForCurrentUser(requestDto)
      .then(() => {
        setVisible(true);
      })
      .catch((error) => {
        console.error("Failed to create request:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOk = () => {
    setVisible(false);
    navigate('/layout/view-request');
  };

  return (
    <div className="new-request-container">
      <Title level={2} className="new-request-title">Request New Material</Title>
      <Form layout="vertical" onFinish={onFinish} className="new-request-form">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item
              name="category"
              label="Material Category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select placeholder="Select Category" className="small-select">
                <Option value="Laptop">Laptop</Option>
                <Option value="Printer">Printer</Option>
                <Option value="Screen">Screen</Option>
                <Option value="Mouse">Mouse</Option>
                <Option value="Keybord">Keybord</Option>
                <Option value="Headset">Headset</Option>
                <Option value="Webcam">Webcam</Option>
                <Option value="central Unit">central Unit</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description!' }]}
            >
              <TextArea rows={4} placeholder="Description" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button" loading={loading} style={{width: '10%'}}>Submit</Button>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            View Request
          </Button>,
        ]}
      >
        <div className="modal-content">
          <CheckCircleOutlined className="modal-icon" />
          <div className="modal-title">Request Created Successfully</div>
          <div className="modal-description">Your request for additional equipment has been successfully created.</div>
        </div>
      </Modal>
    </div>
  );
};

export default NewRequest;

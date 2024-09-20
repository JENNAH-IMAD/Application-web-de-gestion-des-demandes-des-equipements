import { Typography, Steps, Card, Button, Modal, Form, Input, Select } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Details-History.css';

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const DetailsHistory = () => {
  const location = useLocation();
  const { request } = location.state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepDirection, setStepDirection] = useState('horizontal');

  useEffect(() => {
    const updateStepDirection = () => {
      if (window.innerWidth <= 1024) {
        setStepDirection('vertical');
      } else {
        setStepDirection('horizontal');
      }
    };
    window.addEventListener('resize', updateStepDirection);
    updateStepDirection();
    return () => window.removeEventListener('resize', updateStepDirection);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    Modal.success({
      title: 'Request Created Successfully',
      content: 'Your request for additional equipment has been successfully created.',
      okText: 'View Request',
      onOk: () => {
        console.log('View Request clicked');
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="details-history-container">
      <Title level={2} className="details-history-title">Request Details</Title>
      <Card className="request-details" style={{ marginBottom: '10px'}}>
        <p><strong>Request ID:</strong> {request.id}</p>
        <p><strong>Equipment Requested:</strong> {request.item}</p>
        <p><strong>Request Date:</strong> {request.date}</p>
        <p><strong>Employee Name:</strong> Yassin Omari</p> {/* Replace with actual employee name if available */}
        <p><strong>Request Description:</strong> Requesting a new laptop due to hardware issues</p> {/* Replace with actual description if available */}
        <p><strong>Status:</strong> {request.status}</p>
      </Card>
      <Button type="primary" className="reply-button" onClick={showModal} style={{ backgroundColor: '#3164F4' ,width:'10%'}}>Reply</Button>
      <Title level={3} className="details-history-subtitle">Request State</Title>
      <Steps progressDot current={1} className="details-history-steps" direction={stepDirection}>
        <Step title="Create Request" />
        <Step title="Accepted By Supervisor 1" />
        <Step title="Awaiting A Response From Supervisor 2" />
        <Step title="Request Confirmed" />
      </Steps>

      <Modal
        title="Reply Supervisor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submith" type="primary" onClick={handleOk} className="submith-button" style={{ backgroundColor: '#3164F4'}}>
            Submit
          </Button>,
        ]}
        className="reply-modal"
      >
        <Form layout="vertical">
          <Form.Item label="Request ID">
            <Input value={request.id} disabled />
          </Form.Item>
          <Form.Item label="Equipment Requested">
            <Select placeholder="Select Category">
              <Option value="laptop">Laptop</Option>
              <Option value="desktop">Desktop</Option>
              <Option value="monitor">Monitor</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item label="Request Date">
            <Input value={request.date} disabled />
          </Form.Item>
          <Form.Item label="Employee Name">
            <Input value="Yassin Omari" disabled />
          </Form.Item>
          <Form.Item label="Request Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailsHistory;

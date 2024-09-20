import { Typography, Card, Input, Button, Table, Steps, Modal, Divider } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './DetailsRequest.css';

const { Title } = Typography;

const DetailsRequest = () => {
  const location = useLocation();
  const request = location.state?.request || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [stepDirection, setStepDirection] = useState('horizontal');

  const showModal = (type) => {
    let content = {};
    if (type === 'validate') {
      content = {
        icon: <CheckCircleOutlined style={{ fontSize: '50px', color: 'green' }} />,
        title: 'Validation Successful',
        description: 'Request has been validated successfully',
        details: `Validated By: SupervisorName`,
      };
    } else if (type === 'reject') {
      content = {
        icon: <CloseCircleOutlined style={{ fontSize: '50px', color: 'red' }} />,
        title: 'Rejection Successful',
        description: 'Request has been rejected successfully',
        details: `Rejected By: SupervisorName`,
      };
    } else if (type === 'info') {
      content = {
        icon: <InfoCircleOutlined style={{ fontSize: '50px', color: 'orange' }} />,
        title: 'Request Need More Info',
        description: 'Request is awaiting further information',
        details: `Rejected By: SupervisorName`,
      };
    }
    setModalContent(content);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const dataSource = [
    {
      key: '1',
      name: 'MacBook Air 14-in (M2)',
      type: 'Laptop',
      status: 'Functional',
      date: '22/09/2023'
    },
    {
      key: '2',
      name: 'Epson LS12000',
      type: 'Projector',
      status: 'Functional',
      date: '18/07/2023'
    },
    {
      key: '3',
      name: 'Jabra Evolve 2',
      type: 'Headset',
      status: 'Broken',
      date: '10/07/2022'
    },
  ];

  const columns = [
    {
      title: 'Material Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date of Receipt',
      dataIndex: 'date',
      key: 'date',
    },
  ];

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

  return (
    <div className="details-request-container">
      <Title level={2} className="details-request-title">Request Details</Title>
      <Card className="request-details">
        <p><strong>Request ID:</strong> {request.id}</p>
        <p><strong>Equipment Requested:</strong> {request.equipment}</p>
        <p><strong>Request Date:</strong> {request.date}</p>
        <p><strong>Employee Name:</strong> {request.employee}</p>
        <p><strong>Request Description:</strong> {request.description}</p>
        <p><strong>Status:</strong> {request.status}</p>
      </Card>
      <Title level={3} className="details-request-subtitle">Inventory Employee</Title>
      <Input.Search placeholder="Search Equipment" className="details-request-search-bar" />
      <Table dataSource={dataSource} columns={columns} pagination={false} className="details-request-table" />
      <div className="details-request-buttons">
        <Button className="validate-button" onClick={() => showModal('validate')}>Validate</Button>
        <Button className="more-info-button" onClick={() => showModal('info')}>Need more info</Button>
        <Button className="reject-button" onClick={() => showModal('reject')}>Reject</Button>
      </div>
      <Title level={3} className="details-request-subtitle">Request State</Title>
      <Divider />
      <Steps
        progressDot
        current={1}
        direction={stepDirection}
        items={[
          {
            title: 'Create Request',
            description: 'The request has been created.',
          },
          {
            title: 'Accepted By Supervisor 1',
            description: 'The request has been accepted by the first supervisor.',
          },
          {
            title: 'Awaiting A Response From Supervisor 2',
            description: 'The request is awaiting a response from the second supervisor.',
          },
          {
            title: 'Request Confirmed',
            description: 'The request has been confirmed.',
          },
        ]}
      />
      <Modal visible={modalVisible} onOk={handleModalOk} onCancel={handleModalOk} footer={null}>
        <div className="modal-content">
          {modalContent.icon}
          <div className="modal-title">{modalContent.title}</div>
          <div className="modal-description">{modalContent.description}</div>
          <div className="modal-details">
            <p>Request ID: {request.id}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>{modalContent.details}</p>
          </div>
          <Button type="primary" onClick={handleModalOk}>View Details</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DetailsRequest;

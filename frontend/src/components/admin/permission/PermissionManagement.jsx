/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Typography, Select, Row, Col, Input, message, Modal } from 'antd';
import {
  fetchEmployeesByService,
  fetchSupervisorsByService,
  addSupervisorToService,
  
} from '../../../services/EmployeeService';
import './PermissionManagement.css';

const { Title } = Typography;
const { Option } = Select;

const SupervisorsManagement = ({ isVisible, onClose, supervisors, onUpdate, employees, serviceId }) => {
  const [localSupervisors, setLocalSupervisors] = useState(supervisors || []);

  // Add new supervisor
  const addSupervisor = () => {
    setLocalSupervisors([...localSupervisors, { id: null, name: '' }]);
  };

  // Delete supervisor (from frontend list)
  const deleteSupervisor = (id) => {
    setLocalSupervisors(localSupervisors.filter(s => s.id !== id));
  };

  // Handle supervisor change (name change)
  const handleChange = (id, value) => {
    setLocalSupervisors(localSupervisors.map(s => s.id === id ? { ...s, name: value } : s));
  };

  // Handle confirm button click (save supervisors)
  const handleConfirm = async () => {
    try {
      for (const supervisor of localSupervisors) {
        // Add new supervisors to the service
        if (supervisor.id === null && supervisor.name) {
          const employee = employees.find(e => e.name === supervisor.name);
          await addSupervisorToService(serviceId, employee.id);
        }
      }
      onUpdate(localSupervisors);
      message.success('Supervisors updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to update supervisors.');
    }
  };

  return (
    <Modal
      title="Supervisors Management"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      ]}
      centered
    >
      <div className="supervisors-management-container">
        <Button type="dashed" icon={<PlusOutlined />} onClick={addSupervisor} className="add-supervisor-button">
          Add Supervisor
        </Button>
        {localSupervisors.map(supervisor => (
          <div key={supervisor.id || Math.random()} className="supervisor-item">
            <span>Supervisor {supervisor.id || 'New'}:</span>
            <Select
              value={supervisor.name}
              onChange={(value) => handleChange(supervisor.id, value)}
              className="supervisor-select"
              placeholder="Select employee"
            >
              {employees.map(employee => (
                <Option key={employee.id} value={employee.name}>{employee.name}</Option>
              ))}
            </Select>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteSupervisor(supervisor.id)}
              className="delete-button"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const PermissionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('1');
  const [employees, setEmployees] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [isSupervisorModalVisible, setIsSupervisorModalVisible] = useState(false);

  useEffect(() => {
    fetchEmployees(selectedService);
    fetchSupervisors(selectedService);
  }, [selectedService]);

  const fetchEmployees = async (serviceId) => {
    try {
      const data = await fetchEmployeesByService(serviceId);
      setEmployees(data);
    } catch (error) {
      message.error('Failed to fetch employees. Please try again.');
    }
  };

  const fetchSupervisors = async (serviceId) => {
    try {
      const data = await fetchSupervisorsByService(serviceId);
      setSupervisors(Object.values(data));
    } catch (error) {
      message.error('Failed to fetch supervisors. Please try again.');
    }
  };

  const handleUpdateSupervisors = async (updatedSupervisors) => {
    setSupervisors(updatedSupervisors);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, _record) => (
        <Button className="edit-role-button">
          Edit role
        </Button>
      ),
    },
  ];

  return (
    <div className="permission-management-container">
      <Title level={2} className="permission-title">Permission Management</Title>
      <Row className="select-service" gutter={[16, 16]} align="middle">
        <Col>
          <label className="service-label">Select service</label>
        </Col>
        <Col flex="1">
          <Select defaultValue="1" className="service-select" onChange={setSelectedService}>
            <Option value="1">IF</Option>
            <Option value="2">HR</Option>
            <Option value="3">SA</Option>
            <Option value="4">SB</Option>
            <Option value="5">SC</Option>
            <Option value="6">SI</Option>
          </Select>
        </Col>
      </Row>

      <Title level={3} className="permission-subtitle">Supervisors</Title>
      <div className="supervisors-container">
        {supervisors.length > 0 ? (
          supervisors.map((supervisor, index) => (
            <div key={index} className="supervisor-box">
              <p><strong>Supervisor {index + 1}</strong></p>
              <p>{supervisor.name}</p>
              <p>{supervisor.grade}</p>
            </div>
          ))
        ) : (
          <p>No supervisors available.</p>
        )}
      </div>

      <Button className="update-button" onClick={() => setIsSupervisorModalVisible(true)}>Update Supervisors</Button>

      <Title level={3} className="permission-subtitle">List Employees</Title>
      <Input
        placeholder="Search Employees"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <Table
        columns={columns}
        dataSource={filteredEmployees}
        pagination={false}
        bordered
        scroll={{ y: 240 }}
      />

      <SupervisorsManagement
        isVisible={isSupervisorModalVisible}
        onClose={() => setIsSupervisorModalVisible(false)}
        supervisors={supervisors}
        onUpdate={handleUpdateSupervisors}
        employees={filteredEmployees.map(employee => employee)}
        serviceId={selectedService}  // Pass the selected service ID
      />
    </div>
  );
};

export default PermissionManagement;

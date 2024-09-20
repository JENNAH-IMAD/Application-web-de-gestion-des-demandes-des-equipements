
import { Table, Button, Typography, Select, Row, Col } from 'antd';
import './ApprobationManagement.css';

const { Title } = Typography;
const { Option } = Select;

const ApprobationManagement = () => {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Supervisor 1',
            dataIndex: 'supervisor1',
            key: 'supervisor1',
            render: () => (
                <Select defaultValue="Yassin" className="supervisor-select">
                    <Option value="Yassin">Yassin</Option>
                    <Option value="Rachid">Rachid</Option>
                    <Option value="Null">Null</Option>
                </Select>
            ),
        },
        {
            title: 'Supervisor 2',
            dataIndex: 'supervisor2',
            key: 'supervisor2',
            render: () => (
                <Select defaultValue="Rachid" className="supervisor-select">
                    <Option value="Yassin">Yassin</Option>
                    <Option value="Rachid">Rachid</Option>
                    <Option value="Null">Null</Option>
                </Select>
            ),
        },
        {
            title: 'Supervisor 3',
            dataIndex: 'supervisor3',
            key: 'supervisor3',
            render: () => (
                <Select defaultValue="Null" className="supervisor-select">
                    <Option value="Yassin">Yassin</Option>
                    <Option value="Rachid">Rachid</Option>
                    <Option value="Null">Null</Option>
                </Select>
            ),
        },
        {
            title: 'Supervisor 4',
            dataIndex: 'supervisor4',
            key: 'supervisor4',
            render: () => (
                <Select defaultValue="Null" className="supervisor-select">
                    <Option value="Yassin">Yassin</Option>
                    <Option value="Rachid">Rachid</Option>
                    <Option value="Null">Null</Option>
                </Select>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Button className="update-button">Update</Button>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            username: 'YASSIN',
            service: 'SI',
            status: 'Administrateur',
        },
        {
            key: '2',
            username: 'AMIN',
            service: 'SI',
            status: 'technicien',
        },
        {
            key: '3',
            username: 'HARIT',
            service: 'SI',
            status: 'ingénierie',
        },
        {
            key: '4',
            username: 'RACHID',
            service: 'SI',
            status: 'Leader',
        },
    ];

    return (
        <div className="approbation-management-container">
            <Title level={2} className="approbation-title">Approbation Management</Title>
            <Row className="select-service" gutter={[16, 16]} align="middle">
                <Col>
                    <label className="service-label">Select service</label>
                </Col>
                <Col flex="1">
                    <Select defaultValue="SI" className="service-select" >
                        <Option value="SI">SI</Option>
                        <Option value="HR">HR</Option>
                        <Option value="Finance">Finance</Option>
                    </Select>
                </Col>
            </Row>
            <Title level={3} className="approbation-subtitle">List Employees</Title>
            <div className="responsive-table">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    className="desktop-table"
                />
                <div className="mobile-cards">
                    {data.map((record) => (
                        <div key={record.key} className="mobile-card">
                            <p><strong>Username:</strong> {record.username}</p>
                            <p><strong>Service:</strong> {record.service}</p>
                            <p><strong>Status:</strong> {record.status}</p>
                            <p><strong>Supervisor 1:</strong> 
                                <Select defaultValue="Yassin" className="supervisor-select">
                                    <Option value="Yassin">Yassin</Option>
                                    <Option value="Rachid">Rachid</Option>
                                    <Option value="Null">Null</Option>
                                </Select>
                            </p>
                            <p><strong>Supervisor 2:</strong> 
                                <Select defaultValue="Rachid" className="supervisor-select">
                                    <Option value="Yassin">Yassin</Option>
                                    <Option value="Rachid">Rachid</Option>
                                    <Option value="Null">Null</Option>
                                </Select>
                            </p>
                            <p><strong>Supervisor 3:</strong> 
                                <Select defaultValue="Null" className="supervisor-select">
                                    <Option value="Yassin">Yassin</Option>
                                    <Option value="Rachid">Rachid</Option>
                                    <Option value="Null">Null</Option>
                                </Select>
                            </p>
                            <p><strong>Supervisor 4:</strong> 
                                <Select defaultValue="Null" className="supervisor-select">
                                    <Option value="Yassin">Yassin</Option>
                                    <Option value="Rachid">Rachid</Option>
                                    <Option value="Null">Null</Option>
                                </Select>
                            </p>
                            <Button className="update-button">Update</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApprobationManagement;

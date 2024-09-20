import { useState } from 'react';
import { Button, Typography, Input, List, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './RequestManaged.css';

const { Title } = Typography;

const RequestManaged = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const requests = [
        {
            id: 12354,
            equipment: 'Laptop',
            date: '2024-05-01',
            employee: 'Yassin Omari',
            description: 'Requesting a new laptop due to hardware issues',
            status: 'In Progress'
        },
        {
            id: 12355,
            equipment: 'Laptop',
            date: '2024-04-30',
            employee: 'Rachid Naimi',
            description: 'Requesting a new laptop due to hardware issues',
            status: 'In Progress'
        },
        {
            id: 12356,
            equipment: 'Laptop',
            date: '2024-02-01',
            employee: 'HARIT SABISBO',
            description: 'Requesting a new laptop due to hardware issues',
            status: 'In Progress'
        }
    ];

    const filteredRequests = requests.filter(request =>
        request.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDetailsClick = (request) => {
        navigate('/layout/s/details-request', { state: { request } });
    };

    return (
        <div className="request-managed-container">
            <Title level={2} className="request-managed-title">Members History</Title>
            <div className="request-managed-search-bar">
                <Input
                    placeholder="Search Equipment"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <List
                itemLayout="vertical"
                dataSource={filteredRequests}
                renderItem={item => (
                    <List.Item key={item.id} className="request-managed-list-item">
                        <Row gutter={[16, 16]} className="request-managed-details">
                            <Col span={24} md={20}>
                                <p><strong>Request ID:</strong> {item.id}</p>
                                <p><strong>Equipment Requested:</strong> {item.equipment}</p>
                                <p><strong>Request Date:</strong> {item.date}</p>
                                <p><strong>Employee Name:</strong> {item.employee}</p>
                                <p><strong>Request Description:</strong> {item.description}</p>
                                <p><strong>Status:</strong> {item.status}</p>
                            </Col>
                            <Col span={24} md={4} className="button-col">
                                <Button
                                    type="primary"
                                    className="request-managed-details-button"
                                    onClick={() => handleDetailsClick(item)}
                                >
                                    Details
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RequestManaged;

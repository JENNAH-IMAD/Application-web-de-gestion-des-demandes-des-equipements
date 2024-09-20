import  { useEffect, useState } from 'react';
import { Input, Button, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserRequests } from '../../../services/RequestService'; // Assuming this method exists in your service file
import './MyHistory.css';

const { Title } = Typography;

const MyHistory = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUserRequests()
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the request history!", error);
            });
    }, []);

    const filteredRequests = requests.filter(request =>
        request.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = (item) => {
        navigate('/layout/details-history', { state: { request: item } });
    };

    return (
        <div className="my-history-container">
            <Title level={2} className="history-title">My History</Title>
            <Input
                placeholder="Search Equipment"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <List
                itemLayout="horizontal"
                dataSource={filteredRequests}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        className="list-item"
                        actions={[
                            <Button key="details" className="details-button" type='edit' onClick={() => handleClick(item)}>
                                Details
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={`Request ID: ${item.id}`}
                            description={
                                <div className="request-info">
                                    <div>
                                        <span>Equipment Requested:</span> {item.equipmentType}
                                    </div>
                                    <div>
                                        <span>Request Date:</span> {item.requestDate}
                                    </div>
                                    <div>
                                        <span>Status:</span> {item.status}
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MyHistory;

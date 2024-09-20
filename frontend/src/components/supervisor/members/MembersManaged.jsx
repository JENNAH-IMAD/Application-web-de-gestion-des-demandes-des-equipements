import { Table, Button, Typography } from 'antd';
import './MembersManaged.css';

const { Title } = Typography;

const MembersManaged = () => {
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
        },
        {
            title: 'Supervisor 2',
            dataIndex: 'supervisor2',
            key: 'supervisor2',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="action-buttons">
                    <Button className="inventory-button">Inventory</Button>
                    <Button className="history-request-button">History Request</Button>
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            username: 'YASSIN',
            service: 'Administration',
            status: 'Administrateur',
            supervisor1: 'Null',
            supervisor2: 'Null',
        },
        {
            key: '2',
            username: 'AMIN',
            service: 'Engineering',
            status: 'technicien',
            supervisor1: 'Youssef safwani',
            supervisor2: 'Kamal talal',
        },
        {
            key: '3',
            username: 'HARIT',
            service: 'Engineering',
            status: 'ingénierie',
            supervisor1: 'Safwan nouri',
            supervisor2: 'Morad rajhi',
        },
        {
            key: '4',
            username: 'RACHID',
            service: 'Engineering',
            status: 'Leader',
            supervisor1: 'Samir Taj',
            supervisor2: 'Null',
        },
    ];

    return (
        <div className="members-managed-container">
            <Title level={2} className="members-title">Members Managed</Title>
            <div className="table-container">
                <Table columns={columns} dataSource={data} pagination={false} bordered />
            </div>
        </div>
    );
};

export default MembersManaged;

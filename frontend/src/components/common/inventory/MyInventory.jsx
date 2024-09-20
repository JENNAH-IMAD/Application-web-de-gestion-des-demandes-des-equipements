import { useEffect, useState, useMemo } from 'react';
import { Table, Input, Typography, message } from 'antd';
import { getToken, getLoggedInUser } from '../../../services/AuthService'; // Adjust the import path if necessary
import axios from 'axios';
import './MyInventory.css';

const { Title } = Typography;

const MyInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch inventory items from the API
  useEffect(() => {
    const fetchInventory = async () => {
      const token = getToken();
      const loggedInUser = getLoggedInUser();

      if (!token || !loggedInUser) {
        message.error('You must be logged in to view your inventory.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/api/inventory/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setInventoryItems(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          message.error('Unauthorized access. Please log in again.');
        } else {
          message.error('Failed to fetch inventory. Please try again later.');
        }
      }
    };

    fetchInventory();
  }, []);

  const filteredItems = useMemo(() =>
    inventoryItems.filter(item =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [inventoryItems, searchTerm]
  );

  const columns = [
    {
      title: 'MATERIAL NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'SERIES',
      dataIndex: 'series',
      key: 'series',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'DATE OF RECEIPT',
      dataIndex: 'dateOfReceipt',
      key: 'dateOfReceipt',
    },
  ];

  return (
    <div className="inventory-container">
      <Title level={2} className="inventory-title">My Inventory</Title>
      <div className="search-bar">
        <Input
          placeholder="Search Equipment"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredItems}
        pagination={false}
        rowKey="id"
        className="inventory-table"
        scroll={{ y: 'calc(100vh - 200px)' }} // Adjust the height for vertical scrolling
      />
    </div>
  );
};

export default MyInventory;

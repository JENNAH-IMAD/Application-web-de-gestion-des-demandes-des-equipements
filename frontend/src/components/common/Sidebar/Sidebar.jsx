import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BiSolidBriefcase } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { IoDocuments } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";  
import { LuHistory } from "react-icons/lu";
import { HiMiniArrowRightEndOnRectangle, HiMiniDocumentText } from "react-icons/hi2";
import PropTypes from 'prop-types';
import './Sidebar.css';
import logo from '../../../assets/download.png';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/layout/Dashboard');
  };

  const menuItems = [
    {
      key: 'employee',
      label: 'Employee',
      children: [
        {
          key: '1',
          icon: <BiSolidBriefcase className="menu-icon" />,
          label: 'My Inventory',
          onClick: () => navigate('/layout/MyInventory'),
        },
        {
          key: '2',
          icon: <LuHistory className="menu-icon" />,
          label: 'My History',
          onClick: () => navigate('/layout/MyHistory'),
        },
        {
          key: '3',
          icon: <HiMiniDocumentText className="menu-icon" />,
          label: 'Create New Request',
          onClick: () => navigate('/layout/NewRequest'),
        },
      ],
    },
    {
      key: 'supervisor',
      label: 'Supervisor',
      children: [
        {
          key: '4',
          icon: <HiUsers className="menu-icon" />,
          label: 'Members Managed',
          onClick: () => navigate('/layout/s/MembersManaged'),
        },
        {
          key: '5',
          icon: <IoDocuments className="menu-icon" />,
          label: 'Request Managed',
          onClick: () => navigate('/layout/s/RequestManaged'),
        },
      ],
    },
    {
      key: 'administrators',
      label: 'Administrators',
      children: [
        {
          key: '6',
          icon: <FaUsers className="menu-icon" />,
          label: 'Approbation Management',
          onClick: () => navigate('/layout/a/ApprobationManagement'),
        },
        {
          key: '7',
          icon: <FaUserCog className="menu-icon" />,
          label: 'Permission Management',
          onClick: () => navigate('/layout/a/PermissionManagement'),
        },
      ],
    }
  ];

  return (
    <div className="sidebar">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Munisys Equip" />
      </div>
      <div className="menu-wrapper">
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={menuItems}
        />
      </div>
      <div className="logout-button">
        <Menu mode="inline" style={{ borderRight: 0 }}>
          <Menu.Item key="10" icon={<HiMiniArrowRightEndOnRectangle className="menu-icon" />} onClick={onLogout}>
            Log out
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;

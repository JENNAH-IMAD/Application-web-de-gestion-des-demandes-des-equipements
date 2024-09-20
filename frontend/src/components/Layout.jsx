import { Layout as AntLayout, Modal } from 'antd';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './common/Sidebar/Sidebar';
import Footer from './common/footer/Footer';
import Dashboard from './Dashboard';
import MyInventory from './common/inventory/MyInventory';
import MyHistory from './common/history/MyHistory';
import DetailsHistory from './common/history/Details-History';
import NewRequest from './common/request/NewRequest';
import MembersManaged from './supervisor/members/MembersManaged';
import RequestManaged from './supervisor/request/RequestManaged';
import ApprobationManagement from './admin/approbation/ApprobationManagement';
import PermissionManagement from './admin/permission/PermissionManagement';
import ViewRequestCreated from './common/request/ViewRequestCreated';
import DetailsRequest from './supervisor/request/DetailsRequest';
import { isUserLoggedIn, logout as performLogout } from '../services/AuthService';
import '../App.css';

const { Content } = AntLayout;

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        performLogout();
        navigate('/login');
      },
    });
  };

  const isAuthenticated = isUserLoggedIn();

  return (
    <AntLayout className="app-layout">
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}
      <AntLayout className="site-layout" style={{ background: '#fff' }}>
        <Content
          className="app-content"
          style={{
            margin: '24px 16px 0',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }}
        >
          <Routes>
            <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/MyInventory" element={isAuthenticated ? <MyInventory /> : <Navigate to="/login" replace />} />
            <Route path="/MyHistory" element={isAuthenticated ? <MyHistory /> : <Navigate to="/login" replace />} />
            <Route path="/details-history" element={isAuthenticated ? <DetailsHistory /> : <Navigate to="/login" replace />} />
            <Route path="/NewRequest" element={isAuthenticated ? <NewRequest /> : <Navigate to="/login" replace />} />
            <Route path="/view-request" element={isAuthenticated ? <ViewRequestCreated /> : <Navigate to="/login" replace />} />
            <Route path="/s/MembersManaged" element={isAuthenticated ? <MembersManaged /> : <Navigate to="/login" replace />} />
            <Route path="/s/RequestManaged" element={isAuthenticated ? <RequestManaged /> : <Navigate to="/login" replace />} />
            <Route path="/s/details-request" element={isAuthenticated ? <DetailsRequest /> : <Navigate to="/login" replace />} />
            <Route path="/a/ApprobationManagement" element={isAuthenticated ? <ApprobationManagement /> : <Navigate to="/login" replace />} />
            <Route path="/a/PermissionManagement" element={isAuthenticated ? <PermissionManagement /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/Dashboard" : "/login"} replace />} />
          </Routes>
        </Content>
        {isAuthenticated && <Footer />}
      </AntLayout>
    </AntLayout>
  );
};

export default MainLayout;

import { Card, Calendar, Col, Row, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const { Title } = Typography;

const Dashboard = () => {
  const latestRequests = [
    { name: 'Mostapha raji', request: 'Laptop', time: 'Last week' },
    { name: 'Samir Amani', request: 'Laptop', time: 'Last month' },
    { name: 'Rachid Yousri', request: 'Screen', time: 'Last month' },
  ];

  const data = {
    labels: ['Finance', 'HR', 'IT', 'Marketing', 'Design', 'Management'],
    datasets: [
      {
        label: 'Employees',
        backgroundColor: [
          'rgba(0, 123, 255, 0.6)', // Finance
          'rgba(32, 201, 151, 0.6)', // HR
          'rgba(111, 66, 193, 0.6)', // IT
          'rgba(255, 193, 7, 0.6)', // Marketing
          'rgba(0, 123, 255, 0.6)', // Design
          'rgba(111, 66, 193, 0.6)'  // Management
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)', // Finance
          'rgba(32, 201, 151, 1)', // HR
          'rgba(111, 66, 193, 1)', // IT
          'rgba(255, 193, 7, 1)', // Marketing
          'rgba(0, 123, 255, 1)', // Design
          'rgba(111, 66, 193, 1)'  // Management
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        data: [7, 6, 8, 5, 8, 6],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6c757d',
          stepSize: 1
        },
        grid: {
          borderColor: '#dee2e6',
          color: '#f1f3f5'
        }
      },
      x: {
        ticks: {
          color: '#6c757d'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Title level={3}>Welcome Supervisor</Title>
      <Row gutter={[8, 8]} className="dashboard-row">
        <Col xs={24} sm={12} lg={10}>
          <Card title="Latest Requests" bordered={false} className="dashboard-card">
            {latestRequests.map((req, index) => (
              <div key={index} className="latest-request">
                <span>{req.name}</span>
                <span>{req.request}</span>
                <span className="latest-request-time">{req.time}</span>
              </div>
            ))}
            <a href="#">See all tasks</a>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={10}>
          <Card bordered={false} className="dashboard-card">
            <div className="custom-calendar-container">
              <Calendar fullscreen={false} headerRender={({ value, onChange }) => {
                return (
                  <div className="custom-calendar-header">
                    <div className="month-year">
                      <span>{value.format('MMMM YYYY')}</span>
                    </div>
                    <div className="calendar-controls">
                      <button onClick={() => onChange(value.clone().subtract(1, 'month'))}>{'<'}</button>
                      <button onClick={() => onChange(value.clone().add(1, 'month'))}>{'>'}</button>
                    </div>
                  </div>
                );
              }} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[8, 8]} className="dashboard-row">
        <Col xs={24} sm={24} lg={10}>
          <Card title="Employees by Service" bordered={false} className="dashboard-card">
            <div className="chart-container">
              <Bar data={data} options={options} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

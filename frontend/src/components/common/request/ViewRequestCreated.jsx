import { Typography, Steps, Card } from 'antd';
import './ViewRequestCreated.css';

const { Title } = Typography;
const { Step } = Steps;

const ViewRequestCreated = () => {
  return (
    <div className="view-request-created-container">
      <Title level={2} className="view-request-created-title">Request Details</Title>
      <Card className="request-details">
        <p><strong>Request ID:</strong> 12354</p>
        <p><strong>Equipment Requested:</strong> Laptop</p>
        <p><strong>Request Date:</strong> 2024-05-01</p>
        <p><strong>Employee Name:</strong> Yassin Omari</p>
        <p><strong>Request Description:</strong> Requesting a new laptop due to hardware issues</p>
        <p><strong>Status:</strong> In Progress</p>
      </Card>
      <Title level={3} className="view-request-created-subtitle">Request State</Title>
      <Steps progressDot current={1} className="request-steps">
        <Step title="Create Request" />
        <Step title="Accepted By Supervisor 1" />
        <Step title="Awaiting A Response From Supervisor 2" />
        <Step title="Request Confirmed" />
      </Steps>
    </div>
  );
};

export default ViewRequestCreated;

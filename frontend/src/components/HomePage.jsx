
import { Typography, Row, Col, Card, Button } from 'antd';
import './HomePage.css';

const { Title, Text } = Typography;

const HomePage = () => (
  <div className="home-section">
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12}>
        <Title level={2} className="home-title">Welcome to MunisysEquipe</Title>
        <Text className="home-description">
          Explore our comprehensive inventory management solution designed to streamline your operations and optimize your resources.
        </Text>
        <Button type="primary">
          Get Started
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Card
          hoverable
          className="home-card"
          cover={
            <div className="home-card-cover">
              <img alt="Featured Inventory" src="https://via.placeholder.com/350x200" />
            </div>
          }
        >
          <Card.Meta title="Featured Inventory" description="Check out our latest inventory offerings." />
        </Card>
      </Col>
    </Row>
  </div>
);

export default HomePage;

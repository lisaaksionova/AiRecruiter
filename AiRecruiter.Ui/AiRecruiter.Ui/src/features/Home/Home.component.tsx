import { Button, Layout, Row, Col, Card } from "antd";
const { Header, Content, Footer } = Layout;
import "./Home.styles.css";
import { UserOutlined, BankOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';

const Home = () => {
    return (
        <Layout className="home-layout">
            <Header className="header">
                <div className="header-content">
                    <div className="header-left">
                        <img
                            className="logo"
                            src="/logo.svg"
                            alt="AI Recruiter Logo"
                        />
                        <span className="logo-text">AI Recruiter</span>
                    </div>
                    <div className="header-right">
                        <Button type="text" href="/register">Sign Up</Button>
                        <Button type="primary" href="/login">Log In</Button>
                    </div>
                </div>
            </Header>
            
            <Content className="main-content">
                <section className="hero-section">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12} className="hero-text">
                            <h1>Smart Recruitment Platform</h1>
                            <p>Streamline your hiring process with AI-powered matching and automated candidate screening.</p>
                            <div className="cta-buttons">
                                <Button type="primary" size="large" icon={<UserOutlined />} href="/applicant">
                                    I'm a Candidate
                                </Button>
                                <Button size="large" icon={<BankOutlined />} href="/company">
                                    I'm an Employer
                                </Button>
                            </div>
                        </Col>
                        <Col xs={24} lg={12} className="hero-image">
                            <img
                                src="src/assets/recruitment-basics-cover.jpg"
                                alt="Recruitment Process"
                            />
                        </Col>
                    </Row>
                </section>

                <section className="features-section">
                    <h2>Why Choose AI Recruiter?</h2>
                    <Row gutter={[32, 32]} className="features-grid">
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="feature-card">
                                <RocketOutlined className="feature-icon" />
                                <h3>AI-Powered Matching</h3>
                                <p>Smart algorithms find the perfect fit between candidates and positions.</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="feature-card">
                                <TeamOutlined className="feature-icon" />
                                <h3>Streamlined Process</h3>
                                <p>Efficient workflow from application to hire, saving time for everyone.</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="feature-card">
                                <UserOutlined className="feature-icon" />
                                <h3>Smart Profiles</h3>
                                <p>Rich candidate profiles with skills assessment and verification.</p>
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Content>

            <Footer className="footer">
                <p>AI Recruiter ©{new Date().getFullYear()} Created by Yelyzaveta Aksionova</p>
            </Footer>
        </Layout>
    );
}

export default Home;
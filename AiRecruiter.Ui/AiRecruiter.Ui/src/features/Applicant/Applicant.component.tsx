import { Layout, Menu, type MenuProps, Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useAuthStore } from "../../stores/auth.store";

const items = [
    { key: "1", label: "Offers", path: "/applicant/offers" },
    { key: "2", label: "Vacancies", path: "/applicant/vacancies" },
    { key: "3", label: "Statistics", path: "/" },
];

const Applicant = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey =
        items.find((item) => location.pathname === item.path)?.key ||
        items.find((item) => location.pathname.startsWith(item.path))?.key ||
        "0";

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        const item = items.find((i) => i.key === e.key);
        if (item) {
            navigate(item.path);
        }
    };

    const logout = useAuthStore((state) => state.logout);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="demo-logo">
                    <img
                        className="logo"
                        src="/logo.svg"
                        alt="Company Logo"
                        style={{ width: 32, height: 32, objectFit: "contain" }}
                    />
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onClick={handleMenuClick}
                />
                <Button
                    type="primary"
                    danger
                    onClick={logout}
                    style={{ marginLeft: "auto" }}
                >
                    Logout
                </Button>
            </Header>
            <Content style={{ padding: "24px 48px" }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
                AI Recruiter ©{new Date().getFullYear()} Created by Yelyzaveta
                Aksionova
            </Footer>
        </Layout>
    );
}

export default Applicant;
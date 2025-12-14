import { Layout, Menu, type MenuProps, Button } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./Company.styles.css";
import VacancyForm from "./VacancyForm/VacancyForm.component";
import type { Vacancy, VacancyCreate } from "../../models/vacancy.model";
import { useState } from "react";
import create from "@ant-design/icons/lib/components/IconFont";
import { useVacancyStore } from "../../stores/vacancy.store";

const { Header, Content, Footer } = Layout;

const items = [
    { key: "1", label: "Dashboard", path: "/company/dashboard" },
    { key: "2", label: "Vacancies", path: "/company/vacancies" },
    { key: "3", label: "Matches", path: "/company/matches" },
    { key: "4", label: "Candidates", path: "/company/candidates" },
];

const Company = () => {
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

    const createVacancy = useVacancyStore((state) => state.createVacancy);
    const [modalOpen, setModalOpen] = useState(false);

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
                     onClick={() => setModalOpen(true)}
                    style={{ marginLeft: "auto" }}
                >
                    Create Vacancy
                </Button>
            </Header>
            <Content style={{ padding: "0 48px" }}>
                <Outlet />
                <VacancyForm<VacancyCreate>
                    header="Create Vacancy"
                    modalOpen={modalOpen}
                    apiAction={createVacancy}
                    onClose={() => setModalOpen(false)}
                />
            </Content>
            <Footer style={{ textAlign: "center" }}>
                AI Recruiter ©{new Date().getFullYear()} Created by Yelyzaveta
                Aksionova
            </Footer>
        </Layout>
    );
};

export default Company;

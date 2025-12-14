import { Button, Select, Table, type TableProps } from "antd";
import { useVacancyStore } from "../../../stores/vacancy.store";
import type { Vacancy } from "../../../models/vacancy.model";
import { useEffect } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const GlobalVacancies = () => {
    const navigate = useNavigate();
    const vacancies = useVacancyStore((state) => state.vacancies);
    const loading = useVacancyStore((state) => state.loading);
    const fetchVacancies = useVacancyStore((state) => state.fetchVacancies);
    const error = useVacancyStore((state) => state.error);

    const columns: TableProps<Vacancy>["columns"] = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string, record: Vacancy) => (
                <a onClick={() => handleRedirect(record.id)}>{text}</a>
            ),
        },

        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
        },
        {
            title: "Stack",
            dataIndex: "stack",
            key: "stack",
            render: (stack: string[]) => stack?.join(", "),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: Vacancy) => <Button type="primary">Apply</Button>,
        },
    ];

    useEffect(() => {
        fetchVacancies();
    }, [fetchVacancies]);

    const handleRedirect = (id: number) => {
        navigate(`/applicant/vacancies/${id}`);
    };

    return (
        <div>
            <h1>Vacancies</h1>
            <div>
                <Search
                    placeholder="Search vacancy..."
                    style={{ width: 200, marginRight: 16 }}
                />
                <Select className="vacancy-select" defaultValue="Level" />
                <Select className="vacancy-select" defaultValue="Location" />
                <Select className="vacancy-select" defaultValue="Stack" />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Table<Vacancy>
                columns={columns}
                dataSource={vacancies}
                className="vacancy-table"
                loading={loading}
                rowKey="id"
            />
        </div>
    );
};

export default GlobalVacancies;

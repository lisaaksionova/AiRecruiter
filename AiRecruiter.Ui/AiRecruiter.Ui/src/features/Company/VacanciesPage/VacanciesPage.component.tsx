import {
    Button,
    Input,
    Modal,
    Popconfirm,
    Progress,
    Select,
    Space,
    Table,
    Tag,
    type TableProps,
} from "antd";
import "./VacanciesPage.styles.css";
import type { Vacancy } from "../../../models/vacancy.model";
import { useEffect, useState } from "react";
import {
    useVacancyStore,
    type VacancyState,
} from "../../../stores/vacancy.store";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import VacancyForm from "../VacancyForm/VacancyForm.component";
const { Search } = Input;

const VacanciesPage = () => {
    const vacancies = useVacancyStore((state) => state.vacancies);
    const loading = useVacancyStore((state) => state.loading);
    const fetchVacancies = useVacancyStore((state) => state.fetchVacancies);
    const error = useVacancyStore((state) => state.error);
    const deleteVacancy = useVacancyStore((state) => state.deleteVacancy);
    const updateVacancy = useVacancyStore((state) => state.updateVacancy);

    const [modalOpen, setModalOpen] = useState(false);

    const columns: TableProps<Vacancy>["columns"] = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
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
            title: "Min Match %",
            dataIndex: "minMatchPercent",
            key: "minMatchPercent",
        },
        {
            title: "Max Candidates",
            dataIndex: "maxCandidates",
            key: "maxCandidates",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: Vacancy) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => handleEdit(record as Vacancy)}
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this vacancy?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        await deleteVacancy(id);
    };

    const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

    const handleEdit = (vacancy: Vacancy) => {
        setEditingVacancy(vacancy);
        setModalOpen(true);
    };

  useEffect(() => {
    const fetchData = async () => {
        await fetchVacancies();
    };
    fetchData();
}, []);


    useEffect(() => {
        fetchVacancies();
    }, [fetchVacancies]);

    return (
        <div>
            <h1>Vacancies</h1>
            <div>
                <Search
                    placeholder="Search vacancy..."
                    style={{ width: 200 }}
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
            <VacancyForm<Vacancy>
                header="Edit Vacancy"
                modalOpen={modalOpen}
                editingVacancy={editingVacancy}
                apiAction={updateVacancy}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default VacanciesPage;

import { Button, Space, Table, Tag, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../../../stores/application.store";
import { useVacancyStore } from "../../../../stores/vacancy.store";
import type { Status } from "../../../../models/application.model";

interface OfferData {
    key: number;
    title: string;
    company: string;
    stack: string[];
    location: string;
    salary: number;
    status: Status;
    match: number;
}

const statusColors: Record<Status, string> = {
    "Applied": "blue",
    "Interviewing": "orange",
    "Offered": "green",
    "Rejected": "red",
    "Hired": "purple",
};

interface OffersTableProps {
    statusFilter?: (status: string) => boolean;
}

const OffersTable = ({ statusFilter = () => true }: OffersTableProps) => {
    const [loading, setLoading] = useState(true);
    const [offersData, setOffersData] = useState<OfferData[]>([]);
    const { applications, fetchApplications, updateApplication } = useApplicationStore();
    const { vacancies, fetchVacancies } = useVacancyStore();

    const columns: TableProps<OfferData>["columns"] = [
        {
            title: "Position",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Company",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "Stack",
            dataIndex: "stack",
            key: "stack",
            render: (stack: string[]) => (
                <>
                    {stack.map(tech => (
                        <Tag color="blue" key={tech}>
                            {tech}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            render: (salary: number) => `$${salary}`,
        },
        {
            title: "Match",
            dataIndex: "match",
            key: "match",
            render: (match: number) => `${match}%`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: Status) => (
                <Tag color={statusColors[status]} style={{ textTransform: "capitalize" }}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: OfferData) => (
                <Space>
                    {record.status === "Offered" && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => handleStatusUpdate(record.key, "Hired")}
                            >
                                Accept
                            </Button>
                            <Button
                                danger
                                onClick={() => handleStatusUpdate(record.key, "Rejected")}
                            >
                                Decline
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleStatusUpdate = async (applicationId: number, newStatus: Status) => {
        try {
            await updateApplication({
                id: applicationId,
                status: newStatus
            });
            await fetchApplications();
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchApplications(),
                    fetchVacancies()
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchApplications, fetchVacancies]);

    useEffect(() => {
        if (applications.length > 0 && vacancies.length > 0) {
            const offeredApplications = applications
                .filter(app => ["Offered", "Hired", "Rejected"].includes(app.status))
                .filter(app => statusFilter(app.status));

            const combinedData: OfferData[] = offeredApplications.map(app => {
                const vacancy = vacancies.find(v => v.id === app.vacancyId);
                if (!vacancy) return null;

                return {
                    key: app.id,
                    title: vacancy.title,
                    company: `Company ${vacancy.companyId}`,
                    stack: vacancy.stack,
                    location: vacancy.location,
                    salary: vacancy.salary || 0,
                    status: app.status,
                    match: app.matchPercent
                };
            }).filter((data): data is OfferData => data !== null);

            setOffersData(combinedData);
        }
    }, [applications, vacancies]);

    return (
        <Table<OfferData>
            columns={columns}
            dataSource={offersData}
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
}

export default OffersTable;
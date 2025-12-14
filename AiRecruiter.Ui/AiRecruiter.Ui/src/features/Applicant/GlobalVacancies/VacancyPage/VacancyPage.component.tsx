import { useParams } from "react-router-dom";
import { useVacancyStore } from "../../../../stores/vacancy.store";
import { useEffect } from "react";
import { Button, Spin } from "antd";
import "./VacancyPage.styles.css";

const VacancyPage = () => {
    const { id } = useParams<{ id: string }>();
    const vacancy = useVacancyStore((state) => state.vacancy);
    const fetchVacancy = useVacancyStore((state) => state.fetchVacancy);
    const loading = useVacancyStore((state) => state.loading);

    useEffect(() => {
        if (id) {
            fetchVacancy(Number(id));
        }
    }, [id, fetchVacancy]);

    if (loading)
        return (
            <Spin
                className="spin"
                tip="Loading vacancy..."
                style={{ marginTop: 50 }}
            />
        );

    if (!vacancy) return <div>Vacancy not found</div>;

    return (
        <div className="vacancy">
            <h1>{vacancy.title}</h1>
            <p className="level">{vacancy.level}</p>
            <p>Location: {vacancy.location}</p>
            <p className="salary">${vacancy.salary.toLocaleString()}</p>
            <div className="vacancy-stack">
                {vacancy.stack.map((s) => (
                    <span key={s} className="stack-badge">
                        {s}
                    </span>
                ))}
            </div>
            <p>{vacancy.description}</p>
            <div className="vacancy-footer">
                <Button type="primary">Apply</Button>
            </div>
        </div>
    );
};

export default VacancyPage;

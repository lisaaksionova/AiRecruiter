import "./CreateVacancy.styles.css";
import { useVacancyStore } from "../../../stores/vacancy.store";
import VacancyForm from "../VacancyForm/VacancyForm.component";
import type { VacancyCreate } from "../../../models/vacancy.model";
import { useState } from "react";

const CreateVacancy = () => {
    const createVacancy = useVacancyStore((state) => state.createVacancy);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <VacancyForm<VacancyCreate>
            header="Create Vacancy"
            modalOpen={modalOpen}
            apiAction={createVacancy}
            onClose={() => setModalOpen(false)}
        />
    );
};

export default CreateVacancy;

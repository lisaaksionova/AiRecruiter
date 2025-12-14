import { create } from 'zustand';
import axios from 'axios';
import type { Level, Vacancy, VacancyCreate } from '../models/vacancy.model';

const API_URL = 'http://localhost:5087/api/Vacancy';

const levelMap: Record<number, Level> = {
  0: 'Intern',
  1: 'Trainee',
  2: 'Junior',
  3: 'Mid',
  4: 'Senior',
  5: 'Lead',
};


export interface VacancyState {
    vacancies: Vacancy[];
    vacancy: Vacancy | null;
    loading: boolean;
    error: string | null;
    fetchVacancies: () => Promise<void>;
    fetchVacancy: (id: number) => Promise<void>;
    createVacancy: (vacancyData: VacancyCreate) => Promise<void>;
    updateVacancy: (vacancyData: Vacancy) => Promise<void>;
    deleteVacancy: (id: number) => Promise<void>;
}
    

export const useVacancyStore = create<VacancyState>((set) => ({
    vacancies: Array<Vacancy>(),
    vacancy: null,
    loading: false,
    error: null,

    fetchVacancies: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_URL + '/GetAll');
            const responseData = response.data;
            const vacancies = responseData.map((item: any) => ({
                id: item.id,
                title: item.title,
                stack: item.stack,
                level: levelMap[item.level] ?? 'Junior',
                location: item.location,
                salary: item.salary,
                description: item.description,
                minMatchPercent: item.minMatchPercent,
                maxCandidates: item.maxCandidates,
                companyId: item.companyId,
            })) as Vacancy[];
            set({ vacancies, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch vacancies', loading: false });
        }
    },

    createVacancy: async (vacancyData: VacancyCreate) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(API_URL + '/Create', vacancyData);
            const newVacancy = response.data;
            set((state: any) => ({
                vacancies: [...state.vacancies, newVacancy],
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to create vacancy', loading: false });
        }
    },

    updateVacancy: async (vacancyData: Vacancy) => {
        console.log('Updating vacancyData:', vacancyData);

        set({ loading: true, error: null });
        try {
            const response = await axios.put(API_URL + '/Update', vacancyData);
            const updatedVacancy = response.data;
            set((state: any) => ({
                vacancies: state.vacancies.map((v: any) => v.id === vacancyData.id ? updatedVacancy : v),
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to update vacancy', loading: false });
        }
    },

    deleteVacancy: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/Delete/${id}`);

            set((state: any) => ({
                vacancies: state.vacancies.filter((v: Vacancy) => v.id !== id),
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to delete vacancy', loading: false });
        }
    },

     fetchVacancy: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_URL + "/GetById/" + id);
            const data = response.data;

            const vacancy: Vacancy = {
                id: data.id,
                title: data.title,
                stack: data.stack,
                level: levelMap[data.level] ?? 'Junior',
                location: data.location,
                salary: data.salary,
                description: data.description,
                minMatchPercent: data.minMatchPercent,
                maxCandidates: data.maxCandidates,
                companyId: data.companyId,
            };

            set({ vacancy: vacancy, loading: false });
        } catch (error: any) {
            set({
                error: error.message || "Failed to fetch vacancy",
                loading: false,
            });
        }
    },
}));
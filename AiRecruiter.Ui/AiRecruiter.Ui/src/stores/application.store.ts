import { create } from 'zustand';
import axios from 'axios';
import type { Application, ApplicationCreate, ApplicationUpdate } from '../models/application.model';
import { statusMap, statusReverseMap } from '../models/application.model';

const API_URL = 'http://localhost:5087/api/Application';

export interface ApplicationState {
    applications: Application[];
    application: Application | null;
    loading: boolean;
    error: string | null;
    fetchApplications: () => Promise<void>;
    createApplication: (applicationData: ApplicationCreate) => Promise<void>;
    updateApplication: (applicationData: ApplicationUpdate) => Promise<void>;
}
  

export const useApplicationStore = create<ApplicationState>((set, get) => ({
    applications: [],
    application: null,
    loading: false,
    error: null,

    fetchApplications: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_URL + '/GetAll');
            const responseData = response.data;
            const mapped = responseData.map((item: any) => ({
                id: item.id,
                appliedAt: item.appliedAt,
                status: statusMap[item.status] ?? 'Unknown',
                matchPercent: item.matchPercent,
                vacancyId: item.vacancyId,
                candidateId: item.candidateId,
            })) as Application[];

            set({ applications: mapped as unknown as Application[], loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch applications', loading: false });
        }
    },



    createApplication: async (applicationData: ApplicationCreate) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(API_URL + '/Create', applicationData);
            const newApplication = response.data;
            set((state: any) => ({
                applications: [...state.applications, newApplication],
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to create application', loading: false });
        }
    },

    updateApplication: async (applicationData: ApplicationUpdate) => {
        set({ loading: true, error: null });
        try {
            const mappedData = {
                id: applicationData.id,
                status: statusReverseMap[applicationData.status],
            };
            const response = await axios.put(API_URL + '/Update', mappedData);
            const newApplication = response.data;
            set((state: any) => ({
                applications: [...state.applications, newApplication],
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to update application', loading: false });
        }
    },

}));
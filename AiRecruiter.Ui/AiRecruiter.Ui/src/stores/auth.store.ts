import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5087/api/auth';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            useAuthStore.setState({ role: null, error: 'Session expired. Please login again.' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

interface User {
    id: string;
    email: string;
    role: 'candidate' | 'company';
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LogoutRequest {
    token: string;
}

interface RegisterCandidateRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    skills: string[];
    experienceYears: number;
    location: string;
    aboutMe: string;
    salary: number;
}

interface RegisterCompanyRequest {
    email: string;
    password: string;
    name: string;
    description: string;
}

interface AuthState {
    user: User | null;
    role: string | null;
    loading: boolean;
    error: string | null;
    login: (data: LoginRequest) => Promise<void>;
    registerCandidate: (data: RegisterCandidateRequest) => Promise<void>;
    registerCompany: (data: RegisterCompanyRequest) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    role: null,
    loading: false,
    error: null,

    login: async (data: LoginRequest) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login-user`, data);
            const userData = response.data;
            set({ 
                user: userData,
                role: userData.role, 
                loading: false 
            });
            localStorage.setItem('token', userData.token);
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Login failed', loading: false });
        }
    },

    registerCandidate: async (data: RegisterCandidateRequest) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register-candidate`, data);
            set({ role: response.data, loading: false });
            console.log('Registered candidate:', response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Candidate registration failed', 
                loading: false 
            });
        }
    },

    registerCompany: async (data: RegisterCompanyRequest) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register-company`, data);
            set({ role: response.data, loading: false });
            console.log('Registered company:', response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Company registration failed', 
                loading: false 
            });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(`${API_URL.replace('/auth', '')}/Auth/logout-user`, { token });
            }
            localStorage.removeItem('token');
            set({ 
                user: null,
                role: null,
                loading: false 
            });
            window.location.href = '/';
        } catch (error: any) {
            console.error('Logout failed:', error);
            // Clear local state even if request fails
            localStorage.removeItem('token');
            set({ 
                user: null,
                role: null,
                loading: false 
            });
            window.location.href = '/';
        }
    },
}));

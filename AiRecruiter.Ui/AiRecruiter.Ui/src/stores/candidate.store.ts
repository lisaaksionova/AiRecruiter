import { create } from "zustand";
import axios from "axios";
import type { Candidate } from "../models/candidate.model";

const API_URL = "http://localhost:5087/api/Candidate";

interface MatchScore {
    candidateId: number;
    vacancyId: number;
    score: number;
}

export interface CandidateState {
    candidates: Candidate[];
    candidate: Candidate | null;
    loading: boolean;
    error: string | null;
    matchScores: MatchScore[];
    fetchCandidates: () => Promise<void>;
    fetchCandidate: (id: number) => Promise<void>;
    fetchMatchScores: (vacancy: any, candidate: any) => Promise<number>;
}

export const useCandidateStore = create<CandidateState>((set) => ({
    candidates: Array<Candidate>(),
    candidate: null,
    loading: false,
    error: null,
    matchScores: [],

    fetchCandidates: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_URL + "/GetAll");
            const responseData = response.data;
            const candidates = responseData.map((item: any) => ({
                id: item.id,
                first_name: item.firstName,
                last_name: item.lastName,
                location: item.location,
                experience_years: item.experienceYears,
                skills: item.skills,
            })) as Candidate[];
            set({ candidates, loading: false });
        } catch (error: any) {
            set({
                error: error.message || "Failed to fetch candidates",
                loading: false,
            });
        }
    },

    fetchCandidate: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_URL + "/GetById/" + id);
            const data = response.data;

            const candidate: Candidate = {
                id: data.id,
                first_name: data.firstName,
                last_name: data.lastName,
                location: data.location,
                experience_years: data.experienceYears,
                skills: data.skills,
            };

            set({ candidate: candidate, loading: false });
        } catch (error: any) {
            set({
                error: error.message || "Failed to fetch candidate",
                loading: false,
            });
        }
    },

    fetchMatchScores: async (vacancy: any, candidate: any) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('http://localhost:8000/match', {
                vacancy: {
                    ...vacancy,
                    level: vacancy.level === 'Lead' ? 4 : 
                           vacancy.level === 'Senior' ? 3 :
                           vacancy.level === 'Mid' ? 2 :
                           vacancy.level === 'Junior' ? 1 : 0
                },
                candidate: {
                    id: candidate.id,
                    firstName: candidate.first_name,
                    lastName: candidate.last_name,
                    location: candidate.location,
                    experienceYears: candidate.experience_years,
                    skills: candidate.skills
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data.matchPercent;
        } catch (error: any) {
            set({
                error: error.message || "Failed to fetch match scores",
                loading: false,
            });
            return 0;
        }
    },
}));

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Company from './features/Company/Company.component'
import MatchesPage from './features/Company/MatchesPage/MatchesPage.component'
import VacanciesPage from './features/Company/VacanciesPage/VacanciesPage.component'
import DashboardPage from './features/Company/DashboardPage/DashboardPage.component'
import CreateVacancy from './features/Company/CreateVacancy/CreateVacancy.component.tsx'
import Home from './features/Home/Home.component.tsx'
import Applicant from './features/Applicant/Applicant.component.tsx'
import Offers from './features/Applicant/Offers/Offers.component.tsx'
import CandidatesPage from './features/Company/CandidatesPage/CandidatesPage.component.tsx'
import CandidatePage from './features/Company/CandidatesPage/Candidate/CandidatePage.component.tsx'
import GlobalVacancies from './features/Applicant/GlobalVacancies/GlobalVacancies.component.tsx'
import VacancyPage from './features/Applicant/GlobalVacancies/VacancyPage/VacancyPage.component.tsx'
import Login from './features/Auth/Login.component'
import Register from './features/Auth/Register.component'
import { useAuthStore } from './stores/auth.store'

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.role);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected company routes */}
        <Route path="/company" element={
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="createVacancy" element={<CreateVacancy />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="candidates/:id" element={<CandidatePage />} />
        </Route>

        {/* Protected applicant routes */}
        <Route path="/applicant" element={
          <ProtectedRoute>
            <Applicant />
          </ProtectedRoute>
        }>
          <Route path="offers" element={<Offers />} />
          <Route path="vacancies" element={<GlobalVacancies />} />
          <Route path="vacancies/:id" element={<VacancyPage />} />
        </Route>

        {/* Catch all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

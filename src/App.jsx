import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FleetProvider } from './context/FleetContext';
import './index.css';

// Import pages with lazy loading
const MainLayout = React.lazy(() => import('./components/MainLayout'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// School Pages
const Students = React.lazy(() => import('./pages/Students'));
const Teachers = React.lazy(() => import('./pages/Teachers'));
const Enrollment = React.lazy(() => import('./pages/Enrollment'));
const Grades = React.lazy(() => import('./pages/Grades'));
const Payments = React.lazy(() => import('./pages/Payments'));
const Schedule = React.lazy(() => import('./pages/Schedule'));

// Shared Pages
const Reports = React.lazy(() => import('./pages/Reports'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Users = React.lazy(() => import('./pages/Users'));

// Fallback component
const LoadingFallback = () => <div className="flex items-center justify-center h-screen">Carregando...</div>;

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          
          {/* School Routes */}
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="enrollments" element={<Enrollment />} />
          <Route path="grades" element={<Grades />} />
          <Route path="payments" element={<Payments />} />
          <Route path="schedule" element={<Schedule />} />
          
          {/* Shared Routes */}
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <FleetProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FleetProvider>
    </AuthProvider>
  );
}

export default App;

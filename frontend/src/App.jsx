import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import AlertHistoryPage from "./pages/AlertHistoryPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OopDesignPage from "./pages/OopDesignPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SystemMonitorPage from "./pages/SystemMonitorPage.jsx";
import ThreatAnalyticsPage from "./pages/ThreatAnalyticsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage mode="user" />} />
      <Route path="/admin-login" element={<LoginPage mode="admin" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="analytics" element={<ThreatAnalyticsPage />} />
        <Route path="alerts" element={<AlertHistoryPage />} />
        <Route path="oop-design" element={<OopDesignPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="monitor" element={<SystemMonitorPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

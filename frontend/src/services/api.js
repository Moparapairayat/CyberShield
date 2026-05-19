import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cybershield_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  adminLogin: (payload) => api.post("/auth/admin/login", payload),
  me: () => api.get("/auth/me")
};

export const dashboardApi = {
  getOverview: () => api.get("/dashboard"),
  getStatus: () => api.get("/dashboard/status")
};

export const threatApi = {
  getLogs: (params) => api.get("/threats/logs", { params }),
  getAnalytics: () => api.get("/threats/analytics"),
  simulateBruteForce: (payload) => api.post("/threats/simulate/bruteforce", payload),
  simulateUnknownAccount: (payload) => api.post("/threats/simulate/unknown-account", payload),
  simulateSuspiciousRequests: (payload) => api.post("/threats/simulate/suspicious-requests", payload)
};

export const alertApi = {
  getAlerts: (params) => api.get("/alerts", { params }),
  acknowledge: (id) => api.patch(`/alerts/${id}/acknowledge`)
};

export const reportApi = {
  downloadThreatReport: () =>
    api.get("/reports/threat-report", {
      responseType: "blob"
    })
};

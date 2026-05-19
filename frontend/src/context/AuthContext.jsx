import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("cybershield_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("cybershield_token"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("cybershield_token")));

  useEffect(() => {
    async function loadSession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.me();
        const nextUser = response.data.data.user;
        setUser(nextUser);
        localStorage.setItem("cybershield_user", JSON.stringify(nextUser));
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [token]);

  function persistSession(data) {
    localStorage.setItem("cybershield_token", data.token);
    localStorage.setItem("cybershield_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  async function login(credentials, mode = "user") {
    const response = mode === "admin"
      ? await authApi.adminLogin(credentials)
      : await authApi.login(credentials);

    persistSession(response.data.data);
    toast.success(mode === "admin" ? "Admin login successful." : "Login successful.");
    return response.data.data;
  }

  async function register(payload) {
    const response = await authApi.register(payload);
    persistSession(response.data.data);
    toast.success("CyberShield account created successfully.");
    return response.data.data;
  }

  function logout() {
    localStorage.removeItem("cybershield_token");
    localStorage.removeItem("cybershield_user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

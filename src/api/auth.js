import axios from "axios";

const api = axios.create({ baseURL: "" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (email, password) =>
  api.post("/auth/register", { email, password });

export const login = (email, password) =>
  api.post("/auth/login", new URLSearchParams({ username: email, password }), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

export const logout = (refreshToken) =>
  api.post("/auth/logout", { refresh_token: refreshToken });

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  api.post("/auth/reset-password", { token, new_password: newPassword });

export const getMe = () => api.get("/users/me");

export const changePassword = (currentPassword, newPassword) =>
  api.post("/users/me/password", {
    current_password: currentPassword,
    new_password: newPassword,
  });

export default api;

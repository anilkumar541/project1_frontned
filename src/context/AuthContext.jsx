import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, getMe } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken") || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (accessToken && !user) {
      getMe()
        .then((res) => setUser(res.data))
        .catch(() => clearAuth());
    }
  }, [accessToken]);

  function clearAuth() {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  async function login(email, password) {
    const res = await apiLogin(email, password);
    const { access_token, refresh_token } = res.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    const meRes = await getMe();
    setUser(meRes.data);
  }

  async function logout() {
    try {
      if (refreshToken) await apiLogout(refreshToken);
    } catch (_) {}
    clearAuth();
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

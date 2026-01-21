import { useState, useEffect } from "react";

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

   useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");

    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");
  }, [token, role, userId]);

  function logout() {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  }

  return { token, setToken, role, setRole, userId, setUserId, logout };
}

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  // add more fields if needed
};

type AuthCtx = {
  token: string | null;
  user: User | null;
  setToken: (t: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  token: null,
  user: null,
  setToken: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load token from localStorage
  useEffect(() => {
    const t = localStorage.getItem("tf_token");
    if (t) {
      setTokenState(t);
      // Optional: fetch user info from API if token exists
      // setUser({ id: "123", name: "John Doe", email: "john@example.com" });
    }
  }, []);

  const setToken = (t: string | null) => {
    if (t) localStorage.setItem("tf_token", t);
    else localStorage.removeItem("tf_token");
    setTokenState(t);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("tf_token");
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

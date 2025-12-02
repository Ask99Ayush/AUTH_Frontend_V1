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
  setUser: (u: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  // Load token and user from localStorage on init
  useEffect(() => {
    const t = localStorage.getItem("tf_token");
    const u = localStorage.getItem("tf_user");
    
    if (t) {
      setTokenState(t);
    }
    
    if (u) {
      try {
        setUserState(JSON.parse(u));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("tf_user");
      }
    }
  }, []);

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("tf_token", t);
      setTokenState(t);
      
      // If we have a token but no user, try to load user from localStorage
      if (!user) {
        const u = localStorage.getItem("tf_user");
        if (u) {
          try {
            setUserState(JSON.parse(u));
          } catch (err) {
            console.error("Failed to parse user:", err);
          }
        }
      }
    } else {
      localStorage.removeItem("tf_token");
      setTokenState(null);
    }
  };

  const setUser = (u: User | null) => {
    if (u) {
      localStorage.setItem("tf_user", JSON.stringify(u));
      setUserState(u);
    } else {
      localStorage.removeItem("tf_user");
      setUserState(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("tf_token");
    localStorage.removeItem("tf_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
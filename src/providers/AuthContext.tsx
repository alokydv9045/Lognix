"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (name: string, email: string, username: string) => Promise<boolean>;
  logout: () => void;
}

const defaultUser: UserProfile = {
  id: "usr_10924",
  name: "Alex Devlin",
  username: "alexdevlin",
  email: "alex.devlin@lognix.io",
  streakDays: 14,
  solvedCount: 142,
  easySolved: 76,
  mediumSolved: 54,
  hardSolved: 12,
  totalAvailable: 450,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("lognix-auth");
    if (storedAuth === "false") {
      setUser(null);
      setIsAuthenticated(false);
    } else {
      setUser(defaultUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    // Simulated authentication with zero credential leak
    await new Promise((res) => setTimeout(res, 600));
    const loggedUser: UserProfile = {
      ...defaultUser,
      email,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem("lognix-auth", "true");
    return true;
  };

  const signup = async (name: string, email: string, username: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 700));
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      username,
      email,
      streakDays: 1,
      solvedCount: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      totalAvailable: 450,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("lognix-auth", "true");
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.setItem("lognix-auth", "false");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

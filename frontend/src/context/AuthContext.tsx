The error message indicates TypeScript isn't installed/accessible when the build runs, but looking at the actual code, the real compilation issue is that `useEffect` is imported but never used. However, the build error shown is a tooling issue, not a type error.

Looking more carefully at the code itself: `useEffect` is imported but not used — this would cause a TypeScript/ESLint error that could fail the build. That's the fix needed within this file.

import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '@/services/authService';

interface User {
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: authService.AuthRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (credentials: authService.AuthRequest) => {
    const response = await authService.login(credentials);
    const newUser: User = {
      role: response.role,
      email: credentials.email,
    };
    setToken(response.token);
    setUser(newUser);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    navigate('/admin');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ADMIN';

  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
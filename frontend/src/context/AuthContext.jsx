import React, { createContext, useState, useContext } from 'react';
import { setAuthHeader } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cafe_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role === 'admin') setAuthHeader('admin');
      return parsed;
    }
    return null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('cafe_user', JSON.stringify(userData));
    setAuthHeader(userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cafe_user');
    setAuthHeader(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

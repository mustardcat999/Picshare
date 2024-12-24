import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login as apiLogin } from '../api'; // Import the login function from api

interface AuthContextType {
  userId: string | null;
  username: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));  // Store username
  const handleLogin = async (username: string) => {
    try {
      const response = await apiLogin(username);
      console.log(response);
      setUserId(response.userId);
      setUsername(username);  // Store the username when login is successful
      localStorage.setItem('username', username);  // Persist username in localStorage
      localStorage.setItem('userId', response.userId);  // Persist userId
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        userId,
        username, 
        login: handleLogin, 
        logout: handleLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
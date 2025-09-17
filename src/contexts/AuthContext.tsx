import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserType = 'patient' | 'doctor' | 'hospital' | null;

interface AuthContextType {
  userType: UserType;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (email: string, password: string, userType: UserType) => {
    // In a real app, you would validate credentials with your backend here
    console.log(`Logging in as ${userType} with email: ${email}`);
    
    setUserType(userType);
    setIsAuthenticated(true);
    
    // Redirect based on user type
    navigate(`/${userType}/dashboard`);
  };

  const logout = () => {
    setUserType(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userType, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

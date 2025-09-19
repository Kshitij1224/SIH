import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

    // Supported user types in the app
export type UserType = 'patient' | 'doctor' | 'hospital' | null;

    // User record shape loaded from userData.json (union-friendly, minimal typing)
export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'hospital';
  // doctor fields
  specialization?: string;
  hospital?: string;
  phone?: string;
  address?: string;
  // patient fields
  age?: number;
  gender?: string;
  bloodType?: string;
  emergencyContact?: string;
  // hospital fields
  departments?: string[];
  beds?: number;
  doctors?: number;
};

interface AuthContextType {
  userType: UserType;
  isAuthenticated: boolean;
  user: UserRecord | null;
  login: (email: string, password: string, userType: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load possibly persisted user
  const getStoredUser = (): UserRecord | null => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const storedUser = getStoredUser();

  const [user, setUser] = useState<UserRecord | null>(storedUser);
  const [userType, setUserType] = useState<UserType>(storedUser?.role ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storedUser);
  const navigate = useNavigate();

  // Use userData.json to validate credentials and load the concrete user record
  const login = (email: string, password: string, type: UserType): void => {
    (async () => {
      if (!type) {
        alert('Please select a user type');
        return;
      }

      try {
        const response = await fetch('/userData.json');
        if (!response.ok) throw new Error('Failed to load user data');
        const data = await response.json();

        const key = type === 'doctor' ? 'doctors' : type === 'patient' ? 'patients' : 'hospitals';
        const list: UserRecord[] = data[key] || [];

        const found = list.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
          alert('Invalid email or password');
          return;
        }

        const fullUser: UserRecord = { ...found, role: type };
        setUser(fullUser);
        setUserType(type);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(fullUser));

        navigate(`/${type}/dashboard`);
      } catch (err) {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      }
    })();
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userType, isAuthenticated, user, login, logout }}>
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

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { 
  User, 
  LoginCredentials, 
  AuthResponse,
  isDoctor,
  isPatient,
  isHospital
} from '../types/auth';

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { email, password, role } = credentials;
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with a small delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Import the JSON file
      const response = await fetch('/userData.json');
      const data = await response.json();
      
      // Find user based on role
      const userData = data[`${role}s`]?.find((user: any) => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
      );

      if (userData) {
        // Create typed user object
        const typedUser = {
          ...userData,
          role,
          id: userData.id,
          name: userData.name,
          email: userData.email,
        } as User;
        
        // Validate user type
        if (
          (role === 'doctor' && isDoctor(typedUser)) ||
          (role === 'patient' && isPatient(typedUser)) ||
          (role === 'hospital' && isHospital(typedUser))
        ) {
          setUser(typedUser);
          localStorage.setItem('user', JSON.stringify(typedUser));
          setLoading(false);
          return { success: true, user: typedUser };
        }
      }
      
      setError('Invalid email or password');
      setLoading(false);
      return { 
        success: false, 
        error: 'Invalid credentials. Please check your email and password.' 
      };
      
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setLoading(false);
      return { 
        success: false, 
        error: 'An error occurred during login. Please try again.' 
      };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check for existing session on initial load
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Basic validation
        if (!parsedUser?.id || !parsedUser?.role || !parsedUser?.email) {
          throw new Error('Invalid user data');
        }
        
        // Type-specific validation
        const isValidUser = 
          (isDoctor(parsedUser) && parsedUser.specialization && parsedUser.hospital) ||
          (isPatient(parsedUser) && parsedUser.age && parsedUser.bloodType) ||
          (isHospital(parsedUser) && parsedUser.departments && parsedUser.beds !== undefined);
          
        if (isValidUser) {
          setUser(parsedUser);
        } else {
          throw new Error('Invalid user data format');
        }
        
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        localStorage.removeItem('user');
      }
    };
    
    loadUser();
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    error,
    clearError,
  }), [user, login, logout, loading, error, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetToDefault: () => void;
  isLoading: boolean;
  error: string | null;
}

interface Settings {
  maintenanceMode: boolean;
  enableAuditLog: boolean;
  autoBackup: boolean;
  backupFrequency: 'hourly' | 'daily' | 'weekly';
  sessionTimeout: number;
}

const defaultSettings: Settings = {
  maintenanceMode: false,
  enableAuditLog: true,
  autoBackup: true,
  backupFrequency: 'daily',
  sessionTimeout: 30,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('hospitalSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Failed to load settings. Using default settings.');
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('hospitalSettings', JSON.stringify(settings));
      } catch (err) {
        console.error('Failed to save settings:', err);
        setError('Failed to save settings. Changes might not persist.');
      }
    }
  }, [settings, isLoading]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  const resetToDefault = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetToDefault,
        isLoading,
        error,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;

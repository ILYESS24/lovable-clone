import { useState, useEffect } from 'react';

export interface UserSettings {
  autoApprove: boolean;
  chatMode: 'chat' | 'code' | 'debug';
  theme: 'light' | 'dark' | 'system';
  language: string;
  model: string;
  temperature: number;
  maxTokens: number;
  telemetryConsent?: string;
  telemetryUserId?: string;
  providerSettings?: {
    auto?: {
      apiKey?: {
        value?: string;
      };
    };
  };
}

const defaultSettings: UserSettings = {
  autoApprove: false,
  chatMode: 'chat',
  theme: 'system',
  language: 'en',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 4000,
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem('dyad-settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings({ ...defaultSettings, ...parsed });
        }
        
        // Load environment variables from localStorage
        const storedEnvVars = localStorage.getItem('dyad-env-vars');
        if (storedEnvVars) {
          const parsed = JSON.parse(storedEnvVars);
          setEnvVars(parsed);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    setLoading(true);
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      
      localStorage.setItem('dyad-settings', JSON.stringify(updated));
      setError(null);
      return updated;
    } catch (error) {
      console.error('Failed to save settings:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('dyad-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      }
      
      const storedEnvVars = localStorage.getItem('dyad-env-vars');
      if (storedEnvVars) {
        const parsed = JSON.parse(storedEnvVars);
        setEnvVars(parsed);
      }
      setError(null);
    } catch (error) {
      console.error('Failed to refresh settings:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    envVars,
    loading,
    error,
    updateSettings,
    refreshSettings,
  };
}

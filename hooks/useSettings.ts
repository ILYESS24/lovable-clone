import { useState, useEffect } from 'react';

export interface Settings {
  autoApprove: boolean;
  chatMode: 'chat' | 'code' | 'debug';
  theme: 'light' | 'dark' | 'system';
  language: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const defaultSettings: Settings = {
  autoApprove: false,
  chatMode: 'chat',
  theme: 'system',
  language: 'en',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 4000,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem('dyad-settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings({ ...defaultSettings, ...parsed });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    try {
      localStorage.setItem('dyad-settings', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem('dyad-settings');
    } catch (error) {
      console.error('Failed to reset settings:', error);
    }
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading,
  };
}

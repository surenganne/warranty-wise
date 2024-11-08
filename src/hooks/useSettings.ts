import { useState, useEffect } from 'react';
import { UserSettings } from '../components/Settings';

const DEFAULT_SETTINGS: UserSettings = {
  notifications: {
    email: true,
    browser: true,
    mobile: false,
    expiryThreshold: 30,
    serviceReminders: true,
    dailyDigest: false,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00'
    }
  },
  display: {
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    theme: 'system',
    highContrast: false,
    fontSize: 'medium'
  },
  calendar: {
    defaultView: 'month',
    weekStartsOn: 0,
    syncWithGoogle: false,
    syncWithOutlook: false,
    showDeclined: false
  },
  privacy: {
    shareAnalytics: true,
    storageLocation: 'local',
    autoBackup: true,
    backupFrequency: 'weekly'
  },
  accessibility: {
    animations: true,
    screenReader: false,
    keyboardShortcuts: true,
    contrastMode: 'normal'
  }
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  return {
    settings,
    updateSettings: setSettings,
  };
}
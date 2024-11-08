import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Bell, Globe, Calendar, DollarSign, Save,
  Shield, Eye, Database, Accessibility, Smartphone
} from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
}

export interface UserSettings {
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
    expiryThreshold: number;
    serviceReminders: boolean;
    dailyDigest: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  display: {
    language: string;
    dateFormat: string;
    currency: string;
    theme: 'light' | 'dark' | 'system';
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  calendar: {
    defaultView: 'month' | 'week' | 'agenda';
    weekStartsOn: 0 | 1 | 6; // 0: Sunday, 1: Monday, 6: Saturday
    syncWithGoogle: boolean;
    syncWithOutlook: boolean;
    showDeclined: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    storageLocation: 'local' | 'cloud';
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
  };
  accessibility: {
    animations: boolean;
    screenReader: boolean;
    keyboardShortcuts: boolean;
    contrastMode: 'normal' | 'high';
  };
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: 'Chinese' },
];

const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: '12/31/2023' },
  { value: 'DD/MM/YYYY', label: '31/12/2023' },
  { value: 'YYYY-MM-DD', label: '2023-12-31' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

export function Settings({ isOpen, onClose, settings, onSave }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [activeTab, setActiveTab] = useState<'notifications' | 'display' | 'calendar' | 'privacy' | 'accessibility'>('notifications');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Alert Preferences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.notifications.email}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  notifications: {
                    ...localSettings.notifications,
                    email: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Browser Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.notifications.browser}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  notifications: {
                    ...localSettings.notifications,
                    browser: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Mobile Push Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.notifications.mobile}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  notifications: {
                    ...localSettings.notifications,
                    mobile: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Notification Timing</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Warranty Expiry Warning (days)
            </label>
            <input
              type="number"
              min="1"
              max="90"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.notifications.expiryThreshold}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                notifications: {
                  ...localSettings.notifications,
                  expiryThreshold: parseInt(e.target.value)
                }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Daily Digest</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.notifications.dailyDigest}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  notifications: {
                    ...localSettings.notifications,
                    dailyDigest: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">Quiet Hours</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.notifications.quietHours.enabled}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    notifications: {
                      ...localSettings.notifications,
                      quietHours: {
                        ...localSettings.notifications.quietHours,
                        enabled: e.target.checked
                      }
                    }
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {localSettings.notifications.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={localSettings.notifications.quietHours.start}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      notifications: {
                        ...localSettings.notifications,
                        quietHours: {
                          ...localSettings.notifications.quietHours,
                          start: e.target.value
                        }
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input
                    type="time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={localSettings.notifications.quietHours.end}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      notifications: {
                        ...localSettings.notifications,
                        quietHours: {
                          ...localSettings.notifications.quietHours,
                          end: e.target.value
                        }
                      }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Appearance</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.display.theme}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                display: {
                  ...localSettings.display,
                  theme: e.target.value as 'light' | 'dark' | 'system'
                }
              })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.display.fontSize}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                display: {
                  ...localSettings.display,
                  fontSize: e.target.value as 'small' | 'medium' | 'large'
                }
              })}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">High Contrast Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.display.highContrast}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  display: {
                    ...localSettings.display,
                    highContrast: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Localization</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.display.language}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                display: {
                  ...localSettings.display,
                  language: e.target.value
                }
              })}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.display.dateFormat}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                display: {
                  ...localSettings.display,
                  dateFormat: e.target.value
                }
              })}
            >
              {DATE_FORMATS.map((format) => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.display.currency}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                display: {
                  ...localSettings.display,
                  currency: e.target.value
                }
              })}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendarTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Calendar Preferences</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default View</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.calendar.defaultView}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                calendar: {
                  ...localSettings.calendar,
                  defaultView: e.target.value as 'month' | 'week' | 'agenda'
                }
              })}
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="agenda">Agenda</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Week Starts On</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.calendar.weekStartsOn}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                calendar: {
                  ...localSettings.calendar,
                  weekStartsOn: parseInt(e.target.value) as 0 | 1 | 6
                }
              })}
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="6">Saturday</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Calendar Sync</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Sync with Google Calendar</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.calendar.syncWithGoogle}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  calendar: {
                    ...localSettings.calendar,
                    syncWithGoogle: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Sync with Outlook</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.calendar.syncWithOutlook}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  calendar: {
                    ...localSettings.calendar,
                    syncWithOutlook: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Data Privacy</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Share Analytics</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.privacy.shareAnalytics}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  privacy: {
                    ...localSettings.privacy,
                    shareAnalytics: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Storage Location</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.privacy.storageLocation}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                privacy: {
                  ...localSettings.privacy,
                  storageLocation: e.target.value as 'local' | 'cloud'
                }
              })}
            >
              <option value="local">Local Storage Only</option>
              <option value="cloud">Cloud Storage</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Backup & Recovery</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Auto Backup</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.privacy.autoBackup}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  privacy: {
                    ...localSettings.privacy,
                    autoBackup: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {localSettings.privacy.autoBackup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Backup Frequency</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={localSettings.privacy.backupFrequency}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  privacy: {
                    ...localSettings.privacy,
                    backupFrequency: e.target.value as 'daily' | 'weekly' | 'monthly'
                  }
                })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Accessibility Features</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Screen Reader Support</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.accessibility.screenReader}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  accessibility: {
                    ...localSettings.accessibility,
                    screenReader: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Keyboard Navigation</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.accessibility.keyboardShortcuts}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  accessibility: {
                    ...localSettings.accessibility,
                    keyboardShortcuts: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Reduce Animations</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.accessibility.animations}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  accessibility: {
                    ...localSettings.accessibility,
                    animations: e.target.checked
                  }
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contrast Mode</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={localSettings.accessibility.contrastMode}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                accessibility: {
                  ...localSettings.accessibility,
                  contrastMode: e.target.value as 'normal' | 'high'
                }
              })}
            >
              <option value="normal">Normal Contrast</option>
              <option value="high">High Contrast</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>

          <div className="flex space-x-1 mb-6">
            {[
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'display', icon: Eye, label: 'Display' },
              { id: 'calendar', icon: Calendar, label: 'Calendar' },
              { id: 'privacy', icon: Shield, label: 'Privacy' },
              { id: 'accessibility', icon: Accessibility, label: 'Accessibility' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'display' && renderDisplayTab()}
            {activeTab === 'calendar' && renderCalendarTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'accessibility' && renderAccessibilityTab()}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
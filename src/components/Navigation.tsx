import React from 'react';
import { Shield, Bell, Settings as SettingsIcon, HelpCircle, BarChart2, Calendar } from 'lucide-react';

interface NavigationProps {
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
  onAnalyticsClick: () => void;
  onCalendarClick: () => void;
  themeToggle: React.ReactNode;
}

export function Navigation({ 
  onNotificationClick, 
  onSettingsClick, 
  onHelpClick, 
  onAnalyticsClick,
  onCalendarClick,
  themeToggle 
}: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">WarrantyWise</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={onCalendarClick}
            >
              <Calendar className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={onAnalyticsClick}
            >
              <BarChart2 className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 relative"
              onClick={onNotificationClick}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={onHelpClick}
            >
              <HelpCircle className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={onSettingsClick}
            >
              <SettingsIcon className="h-6 w-6" />
            </button>
            {themeToggle}
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
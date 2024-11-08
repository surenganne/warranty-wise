import React from 'react';
import { Shield, Bell, Settings, HelpCircle, BarChart2, Calendar, LogOut, Home, Package } from 'lucide-react';
import { User } from '../types/auth';

interface MainNavProps {
  currentPage: 'home' | 'products' | 'analytics' | 'calendar';
  onNavigate: (page: 'home' | 'products' | 'analytics' | 'calendar') => void;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
  onSignOut: () => void;
  user: User | null;
}

export function MainNav({
  currentPage,
  onNavigate,
  onNotificationClick,
  onSettingsClick,
  onHelpClick,
  onSignOut,
  user
}: MainNavProps) {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">WarrantyWise</span>
            </div>
            
            <div className="hidden sm:flex sm:space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'home'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <Home className="h-5 w-5 inline-block mr-1" />
                Home
              </button>
              
              <button
                onClick={() => onNavigate('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'products'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <Package className="h-5 w-5 inline-block mr-1" />
                Products
              </button>
              
              <button
                onClick={() => onNavigate('analytics')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'analytics'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <BarChart2 className="h-5 w-5 inline-block mr-1" />
                Analytics
              </button>
              
              <button
                onClick={() => onNavigate('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'calendar'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <Calendar className="h-5 w-5 inline-block mr-1" />
                Calendar
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
              <Settings className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <span className="text-gray-700 dark:text-gray-300">{user?.name}</span>
              </div>
              <button
                onClick={onSignOut}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product } from '../types/product';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export function NotificationCenter({ isOpen, onClose, products }: NotificationCenterProps) {
  if (!isOpen) return null;

  const expiringProducts = products.filter(p => p.status === 'expiring');
  const expiredProducts = products.filter(p => p.status === 'expired');
  const upcomingServices = products.filter(p => p.daysRemaining <= 60 && p.status === 'active');

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {expiringProducts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Warranties Expiring Soon</h3>
            <div className="space-y-3">
              {expiringProducts.map(product => (
                <div key={product.id} className="flex items-start space-x-3 bg-yellow-50 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Expires in {product.daysRemaining} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expiredProducts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recently Expired</h3>
            <div className="space-y-3">
              {expiredProducts.map(product => (
                <div key={product.id} className="flex items-start space-x-3 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Expired {Math.abs(product.daysRemaining)} days ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingServices.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Upcoming Services</h3>
            <div className="space-y-3">
              {upcomingServices.map(product => (
                <div key={product.id} className="flex items-start space-x-3 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Service recommended in {product.daysRemaining} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expiringProducts.length === 0 && expiredProducts.length === 0 && upcomingServices.length === 0 && (
          <div className="text-center py-6">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import { Product } from '../types/product';

interface StatsSummaryProps {
  products: Product[];
}

export function StatsSummary({ products }: StatsSummaryProps) {
  const stats = products.reduce(
    (acc, product) => {
      acc[product.status]++;
      return acc;
    },
    { active: 0, expiring: 0, expired: 0 }
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
        <div className="p-2 rounded-full bg-green-100">
          <ShieldCheck className="h-6 w-6 text-green-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Active Warranties</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
        <div className="p-2 rounded-full bg-yellow-100">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.expiring}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
        <div className="p-2 rounded-full bg-red-100">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Expired</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.expired}</p>
        </div>
      </div>
    </div>
  );
}
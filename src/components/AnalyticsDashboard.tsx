import React from 'react';
import { DollarSign, PieChart, Calendar, TrendingUp, Wrench } from 'lucide-react';
import { Product } from '../types/product';

interface AnalyticsDashboardProps {
  products: Product[];
}

export function AnalyticsDashboard({ products }: AnalyticsDashboardProps) {
  // Calculate total product value (assuming 80% of products have value data)
  const totalValue = products.reduce((sum, product) => sum + (product.purchasePrice || 0), 0);
  
  // Calculate total service costs
  const totalServiceCosts = products.reduce((sum, product) => 
    sum + (product.serviceHistory?.reduce((acc, service) => acc + service.cost, 0) || 0), 0
  );

  // Calculate category distribution
  const categoryDistribution = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate warranty status distribution
  const warrantyStatus = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Product Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalValue)}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Service Costs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalServiceCosts)}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Wrench className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Warranties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {warrantyStatus.active || 0}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h3>
          <div className="space-y-4">
            {Object.entries(categoryDistribution).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{category}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {count} ({Math.round((count / products.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / products.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Warranty Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Expiring Soon ({warrantyStatus.expiring || 0})</span>
              <span>Active ({warrantyStatus.active || 0})</span>
              <span>Expired ({warrantyStatus.expired || 0})</span>
            </div>
            <div className="relative pt-4">
              <div className="flex mb-2">
                <div className="flex-1">
                  <div className="h-2 bg-yellow-500 rounded-l"></div>
                  <div className="text-xs text-gray-500 mt-1">30 days</div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-green-500"></div>
                  <div className="text-xs text-gray-500 mt-1">Active</div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-red-500 rounded-r"></div>
                  <div className="text-xs text-gray-500 mt-1">Expired</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service History Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service History Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['maintenance', 'repair', 'inspection'].map(type => {
            const serviceCount = products.reduce((count, product) => 
              count + (product.serviceHistory?.filter(s => s.type === type).length || 0), 0
            );
            const totalCost = products.reduce((sum, product) => 
              sum + (product.serviceHistory?.filter(s => s.type === type).reduce((acc, s) => acc + s.cost, 0) || 0), 0
            );

            return (
              <div key={type} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white capitalize mb-2">{type}s</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Count</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{serviceCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(totalCost)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
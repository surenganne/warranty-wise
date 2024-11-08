import React, { useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, Wrench } from 'lucide-react';
import { Product, ServiceRecord } from '../types/product';

interface ServiceAnalyticsProps {
  products: Product[];
}

export function ServiceAnalytics({ products }: ServiceAnalyticsProps) {
  const analytics = useMemo(() => {
    const allServices = products.flatMap(p => p.serviceHistory || []);
    const totalCost = allServices.reduce((sum, service) => sum + service.cost, 0);
    const avgCostPerService = totalCost / (allServices.length || 1);
    
    const costByType = allServices.reduce((acc, service) => {
      acc[service.type] = (acc[service.type] || 0) + service.cost;
      return acc;
    }, {} as Record<string, number>);

    const costByMonth = allServices.reduce((acc, service) => {
      const month = new Date(service.date).toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[month] = (acc[month] || 0) + service.cost;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCost,
      avgCostPerService,
      costByType,
      costByMonth,
      totalServices: allServices.length
    };
  }, [products]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Service Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(analytics.totalCost)}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Cost per Service</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(analytics.avgCostPerService)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Services</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {analytics.totalServices}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cost by Service Type</h3>
          <div className="space-y-4">
            {Object.entries(analytics.costByType).map(([type, cost]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    type === 'maintenance' ? 'bg-blue-500' :
                    type === 'repair' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{type}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(cost)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Spending</h3>
          <div className="space-y-4">
            {Object.entries(analytics.costByMonth).map(([month, cost]) => (
              <div key={month} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{month}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(cost)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { ArrowRight, Package, BarChart2, Calendar, Plus } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: 'home' | 'products' | 'analytics' | 'calendar') => void;
}

export function HomePage({ products, onNavigate }: HomePageProps) {
  const activeProducts = products.filter(p => p.status === 'active').length;
  const expiringProducts = products.filter(p => p.status === 'expiring').length;
  const expiredProducts = products.filter(p => p.status === 'expired').length;

  // Get the most recently added products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
    .slice(0, 3);

  // Get products expiring soon
  const expiringSoonProducts = products
    .filter(p => p.status === 'expiring')
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Welcome to WarrantyWise
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Your smart warranty management solution. Keep track of all your product warranties in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Warranties</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{activeProducts}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
              <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{expiringProducts}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{expiredProducts}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full">
              <BarChart2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('products')}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center justify-between">
            Manage Products
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            View and manage all your product warranties in one place.
          </p>
        </button>

        <button
          onClick={() => onNavigate('analytics')}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center justify-between">
            View Analytics
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Get insights into your warranty coverage and upcoming expirations.
          </p>
        </button>

        <button
          onClick={() => onNavigate('calendar')}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center justify-between">
            Calendar View
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            See your warranty expirations and service schedules in calendar format.
          </p>
        </button>
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recently Added Products</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              status={product.status}
              daysRemaining={product.daysRemaining}
              progressPercentage={product.progressPercentage}
              imageUrl={product.imageUrl}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Expiring Soon */}
      {expiringSoonProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Warranties Expiring Soon</h2>
            <button
              onClick={() => onNavigate('products')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expiringSoonProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                status={product.status}
                daysRemaining={product.daysRemaining}
                progressPercentage={product.progressPercentage}
                imageUrl={product.imageUrl}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
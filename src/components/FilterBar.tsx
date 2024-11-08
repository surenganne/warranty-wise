import React from 'react';
import { Filter, SortAsc } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export function FilterBar({ 
  categories, 
  selectedCategory, 
  sortBy, 
  onCategoryChange, 
  onSortChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <SortAsc className="h-5 w-5 text-gray-400" />
        <select
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="expiryDate">Expiry Date</option>
          <option value="name">Name</option>
          <option value="purchaseDate">Purchase Date</option>
        </select>
      </div>
    </div>
  );
}
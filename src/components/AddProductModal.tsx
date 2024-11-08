import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  category: string;
  purchaseDate: string;
  warrantyPeriod: number;
  warrantyUnit: 'days' | 'months' | 'years';
  imageUrl: string;
}

const CATEGORIES = [
  'Electronics',
  'Appliances',
  'Furniture',
  'Automotive',
  'Tools',
  'Other'
];

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1581502019003-3e81085c0c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
];

export function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: CATEGORIES[0],
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyPeriod: 1,
    warrantyUnit: 'years',
    imageUrl: DEFAULT_IMAGES[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Warranty Period</label>
              <input
                type="number"
                min="1"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={formData.warrantyPeriod}
                onChange={(e) => setFormData({ ...formData, warrantyPeriod: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={formData.warrantyUnit}
                onChange={(e) => setFormData({ ...formData, warrantyUnit: e.target.value as 'days' | 'months' | 'years' })}
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <div className="mt-1 flex items-center space-x-2">
              <img src={formData.imageUrl} alt="Preview" className="h-12 w-12 object-cover rounded" />
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={() => {
                  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
                  setFormData({ ...formData, imageUrl: DEFAULT_IMAGES[randomIndex] });
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Image
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  status: 'active' | 'expiring' | 'expired';
  daysRemaining: number;
  progressPercentage: number;
  imageUrl: string;
  onClick: () => void;
}

export function ProductCard({ name, category, status, daysRemaining, progressPercentage, imageUrl, onClick }: ProductCardProps) {
  const statusConfig = {
    active: { bgColor: 'bg-green-100', textColor: 'text-green-800', progressColor: 'bg-green-500', label: 'Active' },
    expiring: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', progressColor: 'bg-yellow-500', label: 'Expiring Soon' },
    expired: { bgColor: 'bg-red-100', textColor: 'text-red-800', progressColor: 'bg-red-500', label: 'Expired' }
  };

  const config = statusConfig[status];
  const expiryText = status === 'expired' 
    ? `Expired ${Math.abs(daysRemaining)} days ago`
    : `Expires in ${daysRemaining} days`;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
            {config.label}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {expiryText}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${config.progressColor} h-2 rounded-full transition-all duration-300`} style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
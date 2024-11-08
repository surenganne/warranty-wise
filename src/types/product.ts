export interface ServiceRecord {
  id: number;
  date: string;
  type: 'maintenance' | 'repair' | 'inspection';
  description: string;
  cost: number;
  provider: string;
  nextServiceDue?: string;
}

export interface Document {
  id: number;
  name: string;
  type: 'manual' | 'warranty' | 'receipt' | 'other';
  url: string;
  uploadDate: string;
  size: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  model: string;
  imageUrl: string;
  purchaseDate: string;
  warrantyPeriod: number;
  warrantyUnit: 'days' | 'months' | 'years';
  status: 'active' | 'expiring' | 'expired';
  daysRemaining: number;
  progressPercentage: number;
  serviceHistory?: ServiceRecord[];
  nextServiceDate?: string;
  documents?: Document[];
  recommendedServiceInterval?: {
    period: number;
    unit: 'days' | 'months' | 'years';
  };
}
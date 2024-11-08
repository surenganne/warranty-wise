import { WarrantyStatus, WarrantyUnit } from '../types/product';

export function calculateWarrantyStatus(
  purchaseDate: string,
  warrantyPeriod: number,
  warrantyUnit: WarrantyUnit
) {
  const start = new Date(purchaseDate);
  const now = new Date();
  
  // Convert warranty period to milliseconds
  let warrantyMs = warrantyPeriod * 24 * 60 * 60 * 1000; // days to ms
  if (warrantyUnit === 'months') {
    warrantyMs *= 30; // approximate months to days
  } else if (warrantyUnit === 'years') {
    warrantyMs *= 365; // approximate years to days
  }
  
  const expiryDate = new Date(start.getTime() + warrantyMs);
  const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate progress percentage
  const totalDays = Math.ceil(warrantyMs / (1000 * 60 * 60 * 24));
  const daysElapsed = totalDays - daysRemaining;
  const progressPercentage = Math.max(0, Math.min(100, (daysElapsed / totalDays) * 100));
  
  let status: WarrantyStatus = 'active';
  if (daysRemaining <= 0) {
    status = 'expired';
  } else if (daysRemaining <= 30) {
    status = 'expiring';
  }
  
  return {
    status,
    daysRemaining,
    progressPercentage
  };
}
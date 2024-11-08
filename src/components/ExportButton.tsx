import React from 'react';
import { Download } from 'lucide-react';
import { Product } from '../types/product';

interface ExportButtonProps {
  products: Product[];
}

export function ExportButton({ products }: ExportButtonProps) {
  const handleExport = () => {
    const csv = [
      ['Name', 'Category', 'Purchase Date', 'Warranty Period', 'Status', 'Days Remaining'].join(','),
      ...products.map(product => [
        product.name,
        product.category,
        product.purchaseDate,
        `${product.warrantyPeriod} ${product.warrantyUnit}`,
        product.status,
        product.daysRemaining
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warranty-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      <Download className="h-4 w-4 mr-2" />
      Export Data
    </button>
  );
}
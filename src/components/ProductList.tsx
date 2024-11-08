import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { StatsSummary } from './StatsSummary';
import { ExportButton } from './ExportButton';

interface ProductListProps {
  products: Product[];
  onAddClick: () => void;
  onProductClick: (product: Product) => void;
}

export function ProductList({ products, onAddClick, onProductClick }: ProductListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [sortBy, setSortBy] = React.useState('expiryDate');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'purchaseDate':
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        case 'expiryDate':
        default:
          return a.daysRemaining - b.daysRemaining;
      }
    });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Products</h1>
        <div className="flex space-x-4">
          <ExportButton products={products} />
          <button
            onClick={onAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Product
          </button>
        </div>
      </div>

      <StatsSummary products={products} />

      <SearchBar onSearch={setSearchQuery} />

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              status={product.status}
              daysRemaining={product.daysRemaining}
              progressPercentage={product.progressPercentage}
              imageUrl={product.imageUrl}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Share2, Trash2, X, FileText, Calendar, Wrench, DollarSign } from 'lucide-react';
import { Product } from '../types/product';
import { formatDate } from '../utils/dateUtils';
import { DocumentManager } from './DocumentManager';
import { ServiceHistory } from './ServiceHistory';

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  onUpdateProduct: (product: Product) => void;
}

export function ProductDetails({ product, isOpen, onClose, onDelete, onUpdateProduct }: ProductDetailsProps) {
  const [isDocManagerOpen, setIsDocManagerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'service'>('details');

  const handleShare = async () => {
    const shareData = {
      title: `Warranty Info: ${product.name}`,
      text: `Product: ${product.name}\nManufacturer: ${product.manufacturer}\nWarranty Status: ${product.status}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Product details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddDocument = (document: Omit<Document, 'id'>) => {
    const newDoc = {
      ...document,
      id: Math.max(0, ...(product.documents?.map(d => d.id) || [])) + 1
    };
    
    onUpdateProduct({
      ...product,
      documents: [...(product.documents || []), newDoc]
    });
  };

  const handleDeleteDocument = (docId: number) => {
    onUpdateProduct({
      ...product,
      documents: product.documents?.filter(d => d.id !== docId) || []
    });
  };

  const handleAddService = (serviceRecord: Omit<ServiceRecord, 'id'>) => {
    const newService = {
      ...serviceRecord,
      id: Math.max(0, ...(product.serviceHistory?.map(s => s.id) || [])) + 1
    };

    onUpdateProduct({
      ...product,
      serviceHistory: [...(product.serviceHistory || []), newService]
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 py-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.manufacturer} • {product.model}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsDocManagerOpen(true)}
                  className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  title="Manage documents"
                >
                  <FileText className="h-5 w-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  title="Share details"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 text-red-400 hover:text-red-500"
                  title="Delete product"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'details'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('service')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'service'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Service History
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Warranty Status
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : product.status === 'expiring'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {product.daysRemaining > 0
                          ? `${product.daysRemaining} days remaining`
                          : `Expired ${Math.abs(product.daysRemaining)} days ago`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Purchase Date
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {formatDate(product.purchaseDate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Warranty Period
                    </h3>
                    <span className="text-gray-900 dark:text-white">
                      {product.warrantyPeriod} {product.warrantyUnit}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Category
                    </h3>
                    <span className="text-gray-900 dark:text-white">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                          Warranty Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                          {Math.round(product.progressPercentage)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                      <div
                        style={{ width: `${product.progressPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400"
                      ></div>
                    </div>
                  </div>
                </div>

                {product.documents && product.documents.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                      Documents
                    </h3>
                    <div className="space-y-2">
                      {product.documents.map(doc => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {doc.name}
                            </span>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ServiceHistory
                records={product.serviceHistory || []}
                onAddService={handleAddService}
              />
            )}
          </div>
        </div>
      </div>

      <DocumentManager
        documents={product.documents || []}
        onAddDocument={handleAddDocument}
        onDeleteDocument={handleDeleteDocument}
        isOpen={isDocManagerOpen}
        onClose={() => setIsDocManagerOpen(false)}
      />
    </>
  );
}
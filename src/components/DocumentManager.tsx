import React, { useState } from 'react';
import { FileText, Download, Upload, Trash2, X, File, FileCheck } from 'lucide-react';
import { Document } from '../types/product';
import { DocumentUpload } from './DocumentUpload';

interface DocumentManagerProps {
  documents: Document[];
  onAddDocument: (document: Omit<Document, 'id'>) => void;
  onDeleteDocument: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentManager({ documents, onAddDocument, onDeleteDocument, isOpen, onClose }: DocumentManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress((i / totalSteps) * 100);
    }

    // Create document object
    const newDocument = {
      name: file.name,
      type: getDocumentType(file.type),
      url: URL.createObjectURL(file), // In a real app, this would be the uploaded file URL
      uploadDate: new Date().toISOString(),
      size: file.size
    };

    onAddDocument(newDocument);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const getDocumentType = (mimeType: string): Document['type'] => {
    if (mimeType.includes('pdf')) return 'manual';
    if (mimeType.includes('image')) return 'receipt';
    return 'other';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Manager</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <DocumentUpload onUpload={handleFileUpload} />
            
            {isUploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Uploading...</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {documents.length === 0 ? (
              <div className="text-center py-6">
                <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No documents added yet</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                      <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.type} • {formatFileSize(doc.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-2 text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
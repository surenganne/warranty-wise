import React, { useState } from 'react';
import { DocumentManager } from './DocumentManager';
import { Document } from '../types/product';
import { FileText, Upload, AlertTriangle, CheckCircle } from 'lucide-react';

export function DocumentTest() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [testResults, setTestResults] = useState<{
    name: string;
    status: 'success' | 'error' | 'pending';
    message?: string;
  }[]>([
    { name: 'PDF Upload', status: 'pending' },
    { name: 'Image Upload', status: 'pending' },
    { name: 'Large File', status: 'pending' },
    { name: 'Invalid File Type', status: 'pending' },
    { name: 'Delete Document', status: 'pending' }
  ]);

  const handleAddDocument = (document: Omit<Document, 'id'>) => {
    const newDoc = {
      ...document,
      id: documents.length + 1
    };
    setDocuments([...documents, newDoc]);

    // Update test results
    const updatedResults = [...testResults];
    if (document.name.endsWith('.pdf')) {
      updatedResults[0] = { name: 'PDF Upload', status: 'success', message: 'Successfully uploaded PDF' };
    } else if (document.name.endsWith('.jpg') || document.name.endsWith('.png')) {
      updatedResults[1] = { name: 'Image Upload', status: 'success', message: 'Successfully uploaded image' };
    }
    setTestResults(updatedResults);
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    
    // Update delete test result
    const updatedResults = [...testResults];
    updatedResults[4] = { name: 'Delete Document', status: 'success', message: 'Successfully deleted document' };
    setTestResults(updatedResults);
  };

  const handleError = (error: string) => {
    const updatedResults = [...testResults];
    if (error.includes('5MB')) {
      updatedResults[2] = { name: 'Large File', status: 'success', message: 'Correctly rejected large file' };
    } else if (error.includes('type')) {
      updatedResults[3] = { name: 'Invalid File Type', status: 'success', message: 'Correctly rejected invalid file type' };
    }
    setTestResults(updatedResults);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Document Upload Test Suite
            </h1>
            <button
              onClick={() => setTestResults(testResults.map(r => ({ ...r, status: 'pending' })))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Tests
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              {testResults.map((test, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    test.status === 'success'
                      ? 'bg-green-50 border-green-200'
                      : test.status === 'error'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {test.status === 'success' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {test.status === 'error' && (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      {test.status === 'pending' && (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="font-medium text-gray-900">{test.name}</span>
                    </div>
                    <span className={`text-sm ${
                      test.status === 'success'
                        ? 'text-green-600'
                        : test.status === 'error'
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }`}>
                      {test.status === 'pending' ? 'Not tested' : test.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Test Instructions</h2>
              <div className="space-y-2 text-gray-600">
                <p>1. Try uploading a PDF file (should pass PDF Upload test)</p>
                <p>2. Try uploading a JPG or PNG image (should pass Image Upload test)</p>
                <p>3. Try uploading a file larger than 5MB (should pass Large File test)</p>
                <p>4. Try uploading an unsupported file type like .exe (should pass Invalid File Type test)</p>
                <p>5. Upload a document and delete it (should pass Delete Document test)</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Current Documents</h2>
              {documents.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No documents uploaded yet</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-600 overflow-auto">
                    {JSON.stringify(documents, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <DocumentManager
          documents={documents}
          onAddDocument={handleAddDocument}
          onDeleteDocument={handleDeleteDocument}
          isOpen={true}
          onClose={() => {}}
        />
      </div>
    </div>
  );
}
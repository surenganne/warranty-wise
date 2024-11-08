import React, { useState, useRef } from 'react';
import { Upload, File, X, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

export function DocumentUpload({ 
  onUpload, 
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return false;
    }

    // Check file type
    const fileType = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedTypes.includes(fileType)) {
      setError(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return ImageIcon;
    return FileText;
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes.join(',')}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload className={`h-8 w-8 ${
            isDragging ? 'text-blue-500' : 'text-gray-400'
          }`} />
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Drag and drop your file here, or{' '}
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">browse</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Supported formats: {acceptedTypes.join(', ')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Max size: {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        </div>

        {error && (
          <div className="absolute inset-x-0 -bottom-16 flex items-center justify-center">
            <div className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-sm rounded-lg px-4 py-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4 relative">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {preview.startsWith('data:image') ? (
              <img src={preview} alt="Preview" className="max-h-48 w-full object-cover" />
            ) : (
              <div className="h-48 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                <File className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
              }}
              className="absolute top-2 right-2 p-1 bg-gray-900/50 rounded-full text-white hover:bg-gray-900/75"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
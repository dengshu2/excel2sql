'use client'

import { useRef } from 'react'

interface ExcelUploaderProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export default function ExcelUploader({ onFileUpload, isLoading }: ExcelUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      onFileUpload(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleClick = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isLoading 
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        
        {isLoading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">Processing file...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900">
              Drop your Excel file here
            </p>
            <p className="text-gray-600">
              or click to browse (.xlsx, .xls)
            </p>
            <p className="text-sm text-gray-500">
              Maximum file size: 10MB
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-blue-900">Privacy Notice:</span>
          </div>
          <p className="mt-1 text-blue-800">
            All file processing happens locally in your browser. Your data never leaves your device.
          </p>
        </div>
      </div>
    </div>
  )
}
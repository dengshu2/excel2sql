'use client'

import { useState } from 'react'
import ExcelUploader from '@/components/ExcelUploader'
import SqlOutput from '@/components/SqlOutput'
import { parseExcelToData } from '@/lib/excelParser'
import { generateSparkSQL } from '@/lib/sqlGenerator'

export default function Home() {
  const [excelData, setExcelData] = useState<any[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [tableName, setTableName] = useState('table_name')
  const [sqlOutput, setSqlOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    // Clear previous data
    setExcelData([])
    setHeaders([])
    setSqlOutput('')
    
    try {
      const { data, headers: parsedHeaders } = await parseExcelToData(file)
      setExcelData(data)
      setHeaders(parsedHeaders)
      
      // Auto-generate SQL after a brief delay to show loading
      setTimeout(() => {
        const sql = generateSparkSQL(data, parsedHeaders, tableName)
        setSqlOutput(sql)
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error parsing Excel file:', error)
      alert('文件解析失败，请确保上传的是有效的Excel文件（.xlsx 或 .xls）')
      setIsLoading(false)
    }
  }

  const handleTableNameChange = (name: string) => {
    setTableName(name)
    if (excelData.length > 0) {
      const sql = generateSparkSQL(excelData, headers, name)
      setSqlOutput(sql)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Excel to Spark SQL Converter
          </h1>
          <p className="text-gray-600">
            Convert Excel files to Spark SQL INSERT statements. All processing happens locally in your browser.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Upload */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                1
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Excel File</h2>
            </div>
            <ExcelUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
          </div>

          {/* Step 2: Preview Data */}
          {excelData.length > 0 && !isLoading && (
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Preview Data</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        {headers.map((header, index) => (
                          <th key={index} className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {excelData.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Showing first 5 rows of {excelData.length} total rows
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && excelData.length === 0 && (
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Processing File</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600">正在解析Excel文件，请稍候...</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Configure Table */}
          {excelData.length > 0 && !isLoading && (
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                  3
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Configure Table</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Table Name:
                  </label>
                  <input
                    type="text"
                    value={tableName}
                    onChange={(e) => handleTableNameChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md"
                    placeholder="Enter table name"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generated SQL */}
          {sqlOutput && (
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                  4
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Generated Spark SQL</h2>
              </div>
              <SqlOutput sqlOutput={sqlOutput} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
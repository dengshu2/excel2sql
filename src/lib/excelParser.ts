import * as XLSX from 'xlsx'

export interface ParsedExcelData {
  data: any[][]
  headers: string[]
}

export async function parseExcelToData(file: File): Promise<ParsedExcelData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        
        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // Convert to JSON with header option
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1,
          defval: null 
        }) as any[][]
        
        if (jsonData.length === 0) {
          reject(new Error('The Excel file appears to be empty'))
          return
        }
        
        // Extract headers from the first row
        const headers = jsonData[0] || []
        
        // Validate headers
        const validHeaders = headers.map((header, index) => {
          if (!header || typeof header !== 'string' || header.trim() === '') {
            return `column_${index + 1}`
          }
          return header.toString().trim()
        })
        
        // Extract data rows (excluding header)
        const dataRows = jsonData.slice(1).filter(row => {
          // Filter out completely empty rows
          return row.some(cell => cell !== null && cell !== undefined && cell !== '')
        })
        
        if (dataRows.length === 0) {
          reject(new Error('No data rows found in the Excel file'))
          return
        }
        
        // Ensure all rows have the same number of columns as headers
        const normalizedData = dataRows.map(row => {
          const normalizedRow = [...row]
          while (normalizedRow.length < validHeaders.length) {
            normalizedRow.push(null)
          }
          return normalizedRow.slice(0, validHeaders.length)
        })
        
        resolve({
          data: normalizedData,
          headers: validHeaders
        })
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error}`))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file'))
    }
    
    reader.readAsArrayBuffer(file)
  })
}
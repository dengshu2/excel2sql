export function generateSparkSQL(data: any[][], headers: string[], tableName: string): string {
  if (!data.length || !headers.length) {
    return ''
  }

  // Infer column types based on data
  const columnTypes = inferColumnTypes(data, headers)
  
  // Generate CREATE TABLE statement
  const createTableSQL = generateCreateTable(tableName, headers, columnTypes)
  
  // Generate INSERT statements
  const insertSQL = generateInsertStatements(tableName, headers, data)
  
  return `${createTableSQL}\n\n${insertSQL}`
}

function inferColumnTypes(data: any[][], headers: string[]): string[] {
  const types: string[] = []
  
  for (let colIndex = 0; colIndex < headers.length; colIndex++) {
    let hasNumber = false
    let hasString = false
    let hasNull = false
    
    // Sample first 10 rows to infer type
    const sampleSize = Math.min(10, data.length)
    
    for (let rowIndex = 0; rowIndex < sampleSize; rowIndex++) {
      const value = data[rowIndex][colIndex]
      
      if (value === null || value === undefined || value === '') {
        hasNull = true
        continue
      }
      
      if (typeof value === 'number' || (!isNaN(Number(value)) && value !== '')) {
        hasNumber = true
      } else {
        hasString = true
      }
    }
    
    // Determine type based on findings
    if (hasString || (hasNull && !hasNumber)) {
      types.push('STRING')
    } else if (hasNumber) {
      // Check if all numbers are integers
      let isInteger = true
      for (let rowIndex = 0; rowIndex < sampleSize; rowIndex++) {
        const value = data[rowIndex][colIndex]
        if (value !== null && value !== undefined && value !== '') {
          const numValue = Number(value)
          if (!Number.isInteger(numValue)) {
            isInteger = false
            break
          }
        }
      }
      types.push(isInteger ? 'INT' : 'DOUBLE')
    } else {
      types.push('STRING')
    }
  }
  
  return types
}

function generateCreateTable(tableName: string, headers: string[], types: string[]): string {
  const columns = headers.map((header, index) => {
    const sanitizedHeader = sanitizeColumnName(header)
    return `    \`${sanitizedHeader}\` ${types[index]}`
  }).join(',\n')
  
  return `CREATE TABLE ${tableName} (\n${columns}\n);`
}

function generateInsertStatements(tableName: string, headers: string[], data: any[][]): string {
  if (data.length === 0) {
    return ''
  }
  
  const sanitizedHeaders = headers.map(header => `\`${sanitizeColumnName(header)}\``)
  const headersList = sanitizedHeaders.join(', ')
  
  const valuesList = data.map(row => {
    const values = row.map(cell => formatValue(cell)).join(', ')
    return `    (${values})`
  }).join(',\n')
  
  return `INSERT INTO ${tableName} (${headersList}) VALUES\n${valuesList};`
}

function sanitizeColumnName(name: string): string {
  return name
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9_]/g, '_') // Keep Chinese characters, English letters, numbers, underscore
    .replace(/^[0-9]/, '_$&') // Prefix with underscore if starts with number
}

function formatValue(value: any): string {
  if (value === null || value === undefined || value === '') {
    return 'NULL'
  }
  
  // If it's a number, return as is
  if (typeof value === 'number') {
    return value.toString()
  }
  
  // Check if string represents a number
  if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
    return Number(value).toString()
  }
  
  // For strings, escape single quotes and wrap in single quotes
  const stringValue = String(value).replace(/'/g, "''")
  return `'${stringValue}'`
}
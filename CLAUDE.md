# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Excel2SQL is a privacy-first web application built with Next.js that converts Excel files to Spark SQL statements. All processing happens client-side to ensure data privacy.

## Development Commands
```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS for styling
- **Processing**: Client-side only using xlsx library for Excel parsing
- **Privacy**: All file processing happens in the browser, no server-side data handling
- **Output**: Generates Spark SQL CREATE TABLE and INSERT statements

## Key Components
- `src/app/page.tsx`: Main application page with 4-step workflow
- `src/components/ExcelUploader.tsx`: Drag & drop file upload with privacy notice
- `src/components/SqlOutput.tsx`: SQL display with copy/download functionality
- `src/lib/excelParser.ts`: Excel file parsing using xlsx library
- `src/lib/sqlGenerator.ts`: Spark SQL generation with type inference

## File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main application page
├── components/
│   ├── ExcelUploader.tsx   # File upload component
│   └── SqlOutput.tsx       # SQL output component
└── lib/
    ├── excelParser.ts      # Excel parsing logic
    └── sqlGenerator.ts     # SQL generation logic
```

## Type System
- Uses TypeScript with strict configuration
- Path aliases: `@/*` maps to `./src/*`
- Excel data structure: `ParsedExcelData { data: any[][], headers: string[] }`

## Key Features
1. **4-Step Workflow**: Upload → Preview → Configure → Generate SQL
2. **Type Inference**: Automatically detects INT, DOUBLE, STRING types from data
3. **Privacy First**: Prominent privacy notices, client-side processing only
4. **Spark SQL Format**: Generates CREATE TABLE and INSERT statements
5. **Chinese Character Support**: Handles Chinese column names in SQL generation

## Original Requirements (Chinese)
- Excel CSV 到 SQL 的插件，前端架构使用 next.js
- 所有处理逻辑都在前端处理需要确保隐私
- 可以使用playwright去获取前端界面信息
- 参考网址：https://tableconvert.com/excel-to-sql
- 前端界面尽可能的简洁高效
- 转换的 SQL 类型为 Spark SQL

## Expected SQL Output Format
```sql
CREATE TABLE tableName (
    `id`     INT,
    `name`   STRING,  
    `age`    INT,
    `gender` STRING
);

INSERT INTO tableName (`id`, `name`, `age`, `gender`) VALUES
    (1, 'Roberta', 39, 'M'),
    (2, 'Oliver', 25, 'M'),
    (3, 'Shayna', 18, 'F'),
    (4, 'Fechin', 18, 'M');
```
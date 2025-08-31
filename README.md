# Excel2SQL

一个基于 Next.js 的隐私优先的 Web 应用程序，可将 Excel 文件转换为 Spark SQL 语句。所有处理都在客户端进行，确保数据隐私。

A privacy-first web application built with Next.js that converts Excel files to Spark SQL statements. All processing happens client-side to ensure data privacy.

## ✨ 特性 Features

- **🔒 隐私优先**: 所有文件处理都在浏览器中进行，无服务器端数据处理
- **📊 类型推断**: 自动从数据中检测 INT、DOUBLE、STRING 类型
- **🚀 4步工作流**: 上传 → 预览 → 配置 → 生成 SQL
- **📋 Spark SQL 格式**: 生成 CREATE TABLE 和 INSERT 语句
- **🌏 中文支持**: 支持中文列名的 SQL 生成
- **💾 便捷导出**: 支持复制和下载 SQL 语句

---

- **🔒 Privacy First**: All file processing happens in the browser, no server-side data handling
- **📊 Type Inference**: Automatically detects INT, DOUBLE, STRING types from data
- **🚀 4-Step Workflow**: Upload → Preview → Configure → Generate SQL
- **📋 Spark SQL Format**: Generates CREATE TABLE and INSERT statements
- **🌏 Chinese Support**: Handles Chinese column names in SQL generation
- **💾 Easy Export**: Copy and download SQL statements

## 🛠️ 技术栈 Tech Stack

- **Frontend**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS
- **Excel Processing**: xlsx library
- **Privacy**: Client-side only processing

## 🚀 快速开始 Quick Start

### 安装依赖 Install Dependencies

```bash
npm install
```

### 开发环境 Development

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

Open your browser and visit [http://localhost:3000](http://localhost:3000)

### 生产构建 Production Build

```bash
npm run build
npm run start
```

### 代码检查 Linting

```bash
npm run lint
```

## 📁 项目结构 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # 根布局和元数据 Root layout with metadata
│   └── page.tsx            # 主应用页面 Main application page
├── components/
│   ├── ExcelUploader.tsx   # 文件上传组件 File upload component
│   └── SqlOutput.tsx       # SQL输出组件 SQL output component
└── lib/
    ├── excelParser.ts      # Excel解析逻辑 Excel parsing logic
    └── sqlGenerator.ts     # SQL生成逻辑 SQL generation logic
```

## 📖 使用方法 How to Use

1. **上传文件 Upload**: 拖拽或选择 Excel，csv 文件
2. **预览数据 Preview**: 查看解析的数据和列标题
3. **配置表名 Configure**: 设置 SQL 表名
4. **生成 SQL Generate**: 获取 Spark SQL 语句

## 📋 SQL 输出示例 SQL Output Example

```sql
CREATE TABLE my_table (
    `id`     INT,
    `name`   STRING,  
    `age`    INT,
    `gender` STRING
);

INSERT INTO my_table (`id`, `name`, `age`, `gender`) VALUES
    (1, 'Alice', 25, 'F'),
    (2, 'Bob', 30, 'M'),
    (3, '张三', 28, 'M');
```

## 🔧 开发命令 Development Commands

| 命令 Command    | 描述 Description                        |
| --------------- | --------------------------------------- |
| `npm run dev`   | 启动开发服务器 Start development server |
| `npm run build` | 构建生产版本 Build for production       |
| `npm run start` | 启动生产服务器 Start production server  |
| `npm run lint`  | 运行代码检查 Run ESLint                 |

## 🎯 核心功能 Core Features

### 隐私保护 Privacy Protection
- 所有数据处理都在客户端完成
- 文件不会上传到服务器
- 无数据收集或存储

### 智能类型推断 Smart Type Inference
- 自动识别数字类型（INT/DOUBLE）
- 字符串类型自动处理
- 支持中文和特殊字符

### 用户友好界面 User-Friendly Interface
- 简洁直观的 4 步流程
- 实时预览功能
- 一键复制和下载

## 🌐 部署 Deployment

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/excel2sql)

### 手动部署 Manual Deployment

```bash
# 构建应用
npm run build

# 启动生产服务器
npm run start
```

## 🤝 贡献 Contributing

欢迎提交 Issue 和 Pull Request！

Welcome to submit Issues and Pull Requests!

## 📄 许可证 License

MIT License

## 🔗 相关链接 Related Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Spark SQL Documentation](https://spark.apache.org/docs/latest/sql-ref.html)
- [xlsx Library](https://sheetjs.com/)

---

Made with ❤️ for privacy-conscious data processing
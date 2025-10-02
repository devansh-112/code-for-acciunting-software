# LedgerLine Accounting App

LedgerLine is a full-stack accounting software starter template built with Next.js, React, and Tailwind CSS. It's designed to be a clean, modular boilerplate for building a full-fledged accounting application.

## Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 18, and TypeScript.
- **Stylish UI**: Professionally designed UI using Tailwind CSS and shadcn/ui.
- **Responsive Layout**: A beautiful, responsive layout that works on all devices.
- **Dashboard**: An overview of financial health with KPI cards and charts.
- **Invoice & Expense Management**: CRUD functionality for invoices and expenses.
- **AI-Powered Reports**: Generate financial report summaries using Google's Gemini model.
- **Reusable Components**: A library of reusable components like Data Tables, Cards, and more.
- **Server Actions**: Modern data mutations with Next.js Server Actions.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Running the Development Server

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the app**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Project Structure

- `src/app/(app)`: Contains the main application pages (Dashboard, Invoices, etc.).
- `src/components`: Shared React components.
- `src/components/ui`: UI components from shadcn/ui.
- `src/lib`: Utility functions, type definitions, and mock data.
- `src/app/api`: API routes.
- `src/ai`: Genkit AI flows for features like report summarization.

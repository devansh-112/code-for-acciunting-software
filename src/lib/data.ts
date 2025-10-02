import { Invoice, Expense, Account, InventoryItem } from './types';

export const kpiData = [
  {
    title: 'Total Revenue',
    value: '₹0',
    change: '+0% from last month',
    icon: 'DollarSign',
  },
  {
    title: 'Total Expenses',
    value: '₹0',
    change: '+0% from last month',
    icon: 'CreditCard',
  },
  {
    title: 'Net Income',
    value: '₹0',
    change: '+0% from last month',
    icon: 'BarChart3',
  },
  {
    title: 'Invoices Pending',
    value: '0',
    change: '0 from last month',
    icon: 'FileText',
  },
];

export const chartData = [
  { name: 'Jan', income: 0, expense: 0 },
  { name: 'Feb', income: 0, expense: 0 },
  { name: 'Mar', income: 0, expense: 0 },
  { name: 'Apr', income: 0, expense: 0 },
  { name: 'May', income: 0, expense: 0 },
  { name: 'Jun', income: 0, expense: 0 },
  { name: 'Jul', income: 0, expense: 0 },
  { name: 'Aug', income: 0, expense: 0 },
  { name: 'Sep', income: 0, expense: 0 },
  { name: 'Oct', income: 0, expense: 0 },
  { name: 'Nov', income: 0, expense: 0 },
  { name: 'Dec', income: 0, expense: 0 },
];

export const invoices: Invoice[] = [];

export const expenses: Expense[] = [];

export const accounts: Account[] = [];

export const inventoryItems: InventoryItem[] = [];

export const reportText = `
Financial Report for Q1 2024

Executive Summary:
[Enter your executive summary here. Provide a brief overview of the company's financial performance for the quarter.]

Revenue:
[Detail your revenue sources here. e.g., product sales, service fees, etc.]

Expenses:
[List your key expense categories. e.g., COGS, Marketing, R&D, Salaries, etc.]

Net Income:
[Calculate and present your net income for the quarter.]

Balance Sheet Highlights:
- Total Assets: [Value]
- Total Liabilities: [Value]
- Total Equity: [Value]

Outlook for Q2 2024:
[Describe your financial projections and strategic goals for the next quarter.]
`;

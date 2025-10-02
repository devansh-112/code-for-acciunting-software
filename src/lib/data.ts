
import { Invoice, Expense, Account, InventoryItem, CompanyDetails } from './types';

export const kpiData = [
  {
    title: 'Total Revenue',
    value: '₹12,45,000',
    change: '+12.5%',
    icon: 'DollarSign',
  },
  {
    title: 'Total Expenses',
    value: '₹6,80,000',
    change: '+8.2%',
    icon: 'CreditCard',
  },
  {
    title: 'Net Income',
    value: '₹5,65,000',
    change: '+15.3%',
    icon: 'BarChart3',
  },
  {
    title: 'Invoices Pending',
    value: '3',
    change: '-2',
    icon: 'FileText',
  },
];

export const chartData = [
  { name: 'Jan', income: 150000, expense: 80000 },
  { name: 'Feb', income: 180000, expense: 95000 },
  { name: 'Mar', income: 220000, expense: 110000 },
  { name: 'Apr', income: 200000, expense: 105000 },
  { name: 'May', income: 250000, expense: 130000 },
  { name: 'Jun', income: 280000, expense: 140000 },
  { name: 'Jul', income: 300000, expense: 160000 },
  { name: 'Aug', income: 280000, expense: 150000 },
  { name: 'Sep', income: 320000, expense: 170000 },
  { name: 'Oct', income: 350000, expense: 180000 },
  { name: 'Nov', income: 330000, expense: 175000 },
  { name: 'Dec', income: 400000, expense: 200000 },
];

export const invoices: Invoice[] = [
  // Sample invoice data
];
export const expenses: Expense[] = [
  // Sample expense data
];
export const accounts: Account[] = [
    // Sample account data
];
export const inventory: InventoryItem[] = [
    // Sample inventory data
];

export let companyDetails: CompanyDetails = {
  name: 'JAGDAMBA ELECTRONICS INDIA',
  gstin: '07AZSPG4196Q1ZC',
  address: 'SALES OFFICE:- 56B/12A, RAMA ROAD INDUSTRIAL AREA, DELHI - 110015',
  email: 'info.jagma@gmail.com',
  phone: '9999033749, 9811288585',
  bankDetails: {
    name: 'AXIS BANK',
    branch: 'SHAKTI NAGAR',
    accountNumber: '919020042795558',
    ifsc: 'UTIB0000054'
  },
  terms: [
    'Goods once sold will not be taken back.',
    'Interest @ 18% p.a. will be charged if the payment is not made with in the stipulated time.',
    'Subject to \'Delhi\' Jurisdiction only.'
  ]
};

export function setCompanyDetails(newDetails: CompanyDetails) {
  companyDetails = newDetails;
}


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

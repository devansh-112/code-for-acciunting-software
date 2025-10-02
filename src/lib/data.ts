import { Invoice, Expense, Account, InventoryItem } from './types';

export const kpiData = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: 'DollarSign',
  },
  {
    title: 'Total Expenses',
    value: '$12,789.45',
    change: '+15.2% from last month',
    icon: 'CreditCard',
  },
  {
    title: 'Net Income',
    value: '$32,442.44',
    change: '+22.5% from last month',
    icon: 'BarChart3',
  },
  {
    title: 'Invoices Pending',
    value: '12',
    change: '-5 from last month',
    icon: 'FileText',
  },
];

export const chartData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 5000, expense: 6800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4200, expense: 3200 },
  { name: 'Sep', income: 3100, expense: 2800 },
  { name: 'Oct', income: 4500, expense: 4100 },
  { name: 'Nov', income: 3800, expense: 3200 },
  { name: 'Dec', income: 4300, expense: 4000 },
];

export const invoices: Invoice[] = [
  { id: 'INV-001', customer: 'Acme Inc.', amount: 2000, status: 'paid', date: '2023-10-15', email: 'contact@acme.inc' },
  { id: 'INV-002', customer: 'Stark Industries', amount: 5500, status: 'pending', date: '2023-11-01', email: 'tony@stark.com' },
  { id: 'INV-003', customer: 'Wayne Enterprises', amount: 12000, status: 'overdue', date: '2023-09-20', email: 'bruce@wayne.com' },
  { id: 'INV-004', customer: 'Globex Corp.', amount: 750, status: 'paid', date: '2023-10-25', email: 'info@globex.com' },
  { id: 'INV-005', customer: 'Cyberdyne Systems', amount: 3200, status: 'pending', date: '2023-11-10', email: 'hr@cyberdyne.com' },
  { id: 'INV-006', customer: 'Ollivanders', amount: 500, status: 'paid', date: '2023-10-30', email: 'sales@ollivanders.co.uk' },
  { id: 'INV-007', customer: 'Gekko & Co', amount: 25000, status: 'overdue', date: '2023-08-12', email: 'gordon@gekko.com' },
];

export const expenses: Expense[] = [
    { id: 'EXP-001', vendor: 'Cloud Services Inc', amount: 150.00, status: 'paid', date: '2023-11-01', category: 'Software' },
    { id: 'EXP-002', vendor: 'Office Supplies Co', amount: 75.50, status: 'paid', date: '2023-11-02', category: 'Office Supplies' },
    { id: 'EXP-003', vendor: 'Stellar Marketing', amount: 1200.00, status: 'pending', date: '2023-11-05', category: 'Marketing' },
    { id: 'EXP-004', vendor: 'City Electric', amount: 230.75, status: 'unpaid', date: '2023-10-28', category: 'Utilities' },
    { id: 'EXP-005', vendor: 'Transpo Logistics', amount: 450.00, status: 'paid', date: '2023-11-03', category: 'Shipping' },
    { id: 'EXP-006', vendor: 'Legal Eagles LLP', amount: 3000.00, status: 'pending', date: '2023-11-10', category: 'Legal' },
    { id: 'EXP-007', vendor: 'The Grand Cafe', amount: 125.20, status: 'paid', date: '2023-11-04', category: 'Meals & Entertainment' },
];

export const accounts: Account[] = [
  { id: 'ACC-001', name: 'Cash', type: 'asset', balance: 50000.00 },
  { id: 'ACC-002', name: 'Accounts Receivable', type: 'asset', balance: 12500.00 },
  { id: 'ACC-003', name: 'Inventory', type: 'asset', balance: 35000.00 },
  { id: 'ACC-004', name: 'Accounts Payable', type: 'liability', balance: 8000.00 },
  { id: 'ACC-005', name: 'Sales Revenue', type: 'revenue', balance: 150000.00 },
  { id: 'ACC-006', name: 'Cost of Goods Sold', type: 'expense', balance: 75000.00 },
  { id: 'ACC-007', name: 'Owner\'s Equity', type: 'equity', balance: 64500.00 },
];

export const inventoryItems: InventoryItem[] = [
    { sku: 'WID-001', name: 'Standard Widget', quantity: 150, price: 25.00 },
    { sku: 'WID-002', name: 'Premium Widget', quantity: 75, price: 50.00 },
    { sku: 'GAD-001', name: 'Gizmo', quantity: 200, price: 15.00 },
    { sku: 'GAD-002', name: 'Super Gizmo', quantity: 100, price: 45.00 },
    { sku: 'DOO-001', name: 'Doodad', quantity: 500, price: 5.00 },
];

export const reportText = `
Financial Report for Q4 2023

Executive Summary:
The fourth quarter of 2023 has been a period of significant growth and strategic realignment for the company. We saw a robust increase in revenue, primarily driven by the successful launch of our new product line, "InnovateX." Despite an increase in operational expenses related to marketing and R&D for InnovateX, our net income has exceeded projections, indicating strong market acceptance and efficient cost management.

Revenue:
Total revenue for Q4 2023 reached $45,231.89, a 20.1% increase from Q3 2023. This growth is largely attributed to:
- Sales of InnovateX: $22,000
- Core Product Sales: $18,231.89
- Service & Maintenance Contracts: $5,000

Expenses:
Total expenses for the quarter amounted to $12,789.45. Key expense categories include:
- Cost of Goods Sold (COGS): $4,500
- Marketing & Advertising: $3,500
- Research & Development (R&D): $2,000
- Salaries & Benefits: $1,500
- General & Administrative: $1,289.45

Net Income:
Net income for Q4 2023 stands at $32,442.44, representing a 22.5% increase compared to the previous quarter. This healthy profit margin underscores the company's strong financial position and the profitability of our new strategic direction.

Balance Sheet Highlights:
- Total Assets: $150,000
- Total Liabilities: $45,000
- Total Equity: $105,000

Outlook for Q1 2024:
We anticipate continued growth in Q1 2024, with a focus on expanding the market reach of InnovateX and optimizing our supply chain to reduce COGS. We project a 15% increase in revenue for the upcoming quarter.
`;

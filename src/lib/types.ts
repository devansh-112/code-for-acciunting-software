export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  email: string;
  gstin?: string;
};

export type Expense = {
  id: string;
  category: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'unpaid';
};

export type Account = {
  id: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
};

export type InventoryItem = {
  sku: string;
  name: string;
  quantity: number;
  price: number;
};

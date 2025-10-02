export type InvoiceItem = {
  description: string;
  hsn: string;
  quantity: number;
  unit: string;
  price: number;
};

export type InvoiceParty = {
  name: string;
  address: string;
  gstin: string;
}

export type Invoice = {
  id: string;
  billedTo: InvoiceParty;
  shippedTo: InvoiceParty;
  date: string;
  placeOfSupply: string;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
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

export type CompanyDetails = {
  name: string;
  gstin: string;
  address: string;
  email: string;
  phone: string;
  bankDetails: {
    name: string;
    branch: string;
    accountNumber: string;
    ifsc: string;
  };
  terms: string[];
};

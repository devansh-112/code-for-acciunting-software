

export type InvoiceItem = {
  sku: string;
  description: string;
  hsn: string;
  quantity: number;
  unit: string;
  price: number;
  gstRate: number;
};

export type InvoiceParty = {
  name: string;
  address: string;
  gstin?: string;
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
  id: string; // Changed from sku to id for key prop
  sku: string;
  name: string;
  hsn?: string;
  gstRate?: number;
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

// Context Types

export type AccountContextType = {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
};

export type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
};

export type InventoryContextType = {
  inventoryItems: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryQuantity: (sku: string, quantityChange: number) => void;
};

export type InvoiceContextType = {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  deleteInvoice: (id: string) => void;
};

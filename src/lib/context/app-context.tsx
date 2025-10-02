
"use client";

import React, { ReactNode } from 'react';
import { AccountProvider } from './account-context';
import { ExpenseProvider } from './expense-context';
import { InventoryProvider } from './inventory-context';
import { InvoiceProvider } from './invoice-context';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AccountProvider>
      <ExpenseProvider>
        <InventoryProvider>
          <InvoiceProvider>
            {children}
          </InvoiceProvider>
        </InventoryProvider>
      </ExpenseProvider>
    </AccountProvider>
  );
};


"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useInvoiceService } from '@/lib/services/invoice-service';
import { useInventoryContext } from './inventory-context';
import { InvoiceContextType } from '@/lib/types';

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { updateInventoryQuantity } = useInventoryContext();
  const invoiceService = useInvoiceService(updateInventoryQuantity);

  return (
    <InvoiceContext.Provider value={invoiceService}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};

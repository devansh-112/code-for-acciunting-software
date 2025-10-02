
"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useExpenseService } from '@/lib/services/expense-service';
import { ExpenseContextType } from '@/lib/types';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const expenseService = useExpenseService();

  return (
    <ExpenseContext.Provider value={expenseService}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

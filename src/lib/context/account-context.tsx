
"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useAccountService } from '@/lib/services/account-service';
import { AccountContextType } from '@/lib/types';

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const accountService = useAccountService();

  return (
    <AccountContext.Provider value={accountService}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};

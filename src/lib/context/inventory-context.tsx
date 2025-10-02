
"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useInventoryService } from '@/lib/services/inventory-service';
import { InventoryContextType } from '@/lib/types';

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const inventoryService = useInventoryService();

  return (
    <InventoryContext.Provider value={inventoryService}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return context;
};


'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { inventoryItems as initialInventory } from '@/lib/data';
import { columns } from './columns';
import { CreateInventoryItemForm } from '@/components/forms/create-inventory-item-form';
import { InventoryItem } from '@/lib/types';

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState(initialInventory);

  const addInventoryItem = (item: InventoryItem) => {
    setInventoryItems(prev => [...prev, item]);
  };

  const updateInventoryItem = (sku: string, quantity: number) => {
    setInventoryItems(prev => prev.map(item => item.sku === sku ? { ...item, quantity: item.quantity + quantity } : item));
  };


  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Inventory
        </h1>
        <p className="text-muted-foreground">
          Track and manage your product inventory.
        </p>
      </div>
      <DataTable 
        columns={columns} 
        data={inventoryItems} 
        searchKey="name" 
        createFormComponent={(props) => <CreateInventoryItemForm {...props} onSubmit={addInventoryItem} />}
      />
    </div>
  );
}

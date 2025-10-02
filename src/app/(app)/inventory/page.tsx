
'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { inventory as initialInventory } from '@/lib/data';
import { CreateInventoryItemForm } from '@/components/forms/create-inventory-item-form';
import { InventoryItem } from '@/lib/types';

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventory);

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: item.sku, // Use SKU as ID for simplicity in this non-DB version
    };
    setInventoryItems([...inventoryItems, newItem]);
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

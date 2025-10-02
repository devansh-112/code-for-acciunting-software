
'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateInventoryItemForm } from '@/components/forms/create-inventory-item-form';
import { useInventoryContext } from '@/lib/context/inventory-context';

export default function InventoryPage() {
  const { inventoryItems, addInventoryItem } = useInventoryContext();

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

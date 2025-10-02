import { DataTable } from '@/components/data-table/data-table';
import { inventoryItems } from '@/lib/data';
import { columns } from './columns';
import { CreateInventoryItemForm } from '@/components/forms/create-inventory-item-form';

export default function InventoryPage() {
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
      <DataTable columns={columns} data={inventoryItems} searchKey="name" createFormComponent={CreateInventoryItemForm} />
    </div>
  );
}

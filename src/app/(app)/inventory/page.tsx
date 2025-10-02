'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateInventoryItemForm } from '@/components/forms/create-inventory-item-form';
import { InventoryItem } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function InventoryPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  const inventoryRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/inventory`);
  }, [firestore, user]);

  const { data: inventoryItems, isLoading } = useCollection<InventoryItem>(inventoryRef);

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'userId'>) => {
    if (!inventoryRef) return;
    addDocumentNonBlocking(inventoryRef, { ...item, userId: user!.uid });
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
        data={isLoading ? [] : inventoryItems || []} 
        searchKey="name" 
        createFormComponent={(props) => <CreateInventoryItemForm {...props} onSubmit={addInventoryItem} />}
      />
    </div>
  );
}

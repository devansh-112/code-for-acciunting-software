'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { Invoice, InventoryItem } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function InvoicesPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  const invoicesRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/invoices`);
  }, [firestore, user]);

  const inventoryRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/inventory`);
  }, [firestore, user]);

  const { data: invoices, isLoading: isLoadingInvoices } = useCollection<Invoice>(invoicesRef);
  const { data: inventoryItems, isLoading: isLoadingInventory } = useCollection<InventoryItem>(inventoryRef);


  const addInvoice = (invoice: Omit<Invoice, 'id' | 'userId'>) => {
    if (!invoicesRef || !inventoryItems || !user) return;

    // Update inventory
    invoice.items.forEach(item => {
      const inventoryItem = inventoryItems.find(invItem => invItem.sku === item.sku);
      if (inventoryItem) {
        const itemRef = doc(firestore, `users/${user.uid}/inventory/${inventoryItem.id}`);
        const newQuantity = inventoryItem.quantity - item.quantity;
        updateDocumentNonBlocking(itemRef, { quantity: newQuantity });
      }
    });

    // Add invoice
    addDocumentNonBlocking(invoicesRef, { ...invoice, userId: user!.uid });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Invoices
        </h1>
        <p className="text-muted-foreground">
          Create and manage customer invoices.
        </p>
      </div>
      <DataTable 
        columns={columns} 
        data={isLoadingInvoices ? [] : invoices || []} 
        searchKey="customer" 
        createFormComponent={(props) => (
          <CreateInvoiceForm 
            {...props} 
            onSubmit={addInvoice} 
            inventoryItems={isLoadingInventory ? [] : inventoryItems || []} 
          />
        )}
      />
    </div>
  );
}

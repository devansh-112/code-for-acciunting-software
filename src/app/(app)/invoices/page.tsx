
'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { getColumns } from './columns';
import { invoices as initialInvoices, inventory as initialInventory } from '@/lib/data';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { Invoice, InventoryItem } from '@/lib/types';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventory);

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = {
      ...invoice,
      id: `INV-${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
    };
    
    // Update inventory
    const updatedInventory = [...inventoryItems];
    newInvoice.items.forEach(item => {
      const inventoryItemIndex = updatedInventory.findIndex(invItem => invItem.sku === item.sku);
      if (inventoryItemIndex > -1) {
        updatedInventory[inventoryItemIndex].quantity -= item.quantity;
      }
    });
    setInventoryItems(updatedInventory);

    setInvoices([newInvoice, ...invoices]);
  };

  const deleteInvoice = (id: string) => {
    // Note: This doesn't add back to inventory, for simplicity
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  }

  const columns = getColumns(deleteInvoice);

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
        data={invoices} 
        searchKey="billedTo" 
        createFormComponent={(props) => <CreateInvoiceForm {...props} onSubmit={addInvoice} inventoryItems={inventoryItems} />}
      />
    </div>
  );
}

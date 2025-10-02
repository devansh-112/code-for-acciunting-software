
'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { invoices as initialInvoices, inventoryItems as initialInventory } from '@/lib/data';
import { columns } from './columns';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { Invoice, InventoryItem } from '@/lib/types';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [inventoryItems, setInventoryItems] = useState(initialInventory);

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    // Update inventory
    const newInventory = [...inventoryItems];
    invoice.items.forEach(item => {
      const inventoryItemIndex = newInventory.findIndex(invItem => invItem.sku === item.sku);
      if (inventoryItemIndex !== -1) {
        newInventory[inventoryItemIndex].quantity -= item.quantity;
      }
    });
    setInventoryItems(newInventory);

    // Add invoice
    setInvoices(prev => [...prev, { ...invoice, id: `INV-${Date.now()}` }]);
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
        data={invoices} 
        searchKey="customer" 
        createFormComponent={(props) => <CreateInvoiceForm {...props} onSubmit={addInvoice} inventoryItems={inventoryItems} />}
      />
    </div>
  );
}

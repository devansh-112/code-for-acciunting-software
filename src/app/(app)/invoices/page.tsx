'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { invoices as initialInvoices } from '@/lib/data';
import { columns } from './columns';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { Invoice } from '@/lib/types';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
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
        createFormComponent={(props) => <CreateInvoiceForm {...props} onSubmit={addInvoice} />}
      />
    </div>
  );
}

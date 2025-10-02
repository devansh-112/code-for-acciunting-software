
'use client';

import { DataTable } from '@/components/data-table/data-table';
import { getColumns } from './columns';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { useInvoiceContext } from '@/lib/context/invoice-context';
import { useInventoryContext } from '@/lib/context/inventory-context';

export default function InvoicesPage() {
  const { invoices, addInvoice, deleteInvoice } = useInvoiceContext();
  const { inventoryItems } = useInventoryContext();

  const handleAddInvoice = (invoice: Omit<import("@/lib/types").Invoice, "id">) => {
    addInvoice(invoice);
  };
  
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
        createFormComponent={(props) => <CreateInvoiceForm {...props} onSubmit={handleAddInvoice} inventoryItems={inventoryItems} />}
      />
    </div>
  );
}

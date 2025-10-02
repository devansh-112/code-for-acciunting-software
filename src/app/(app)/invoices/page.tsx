import { DataTable } from '@/components/data-table/data-table';
import { invoices } from '@/lib/data';
import { columns } from './columns';

export default function InvoicesPage() {
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
      <DataTable columns={columns} data={invoices} searchKey="customer" />
    </div>
  );
}

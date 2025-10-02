import { DataTable } from '@/components/data-table/data-table';
import { accounts } from '@/lib/data';
import { columns } from './columns';

export default function AccountsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Chart of Accounts
        </h1>
        <p className="text-muted-foreground">
          Manage your assets, liabilities, equity, revenue, and expenses.
        </p>
      </div>
      <DataTable columns={columns} data={accounts} searchKey="name" />
    </div>
  );
}


'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { useAccountContext } from '@/lib/context/account-context';

export default function AccountsPage() {
  const { accounts, addAccount } = useAccountContext();

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
      <DataTable 
        columns={columns} 
        data={accounts} 
        searchKey="name" 
        createFormComponent={(props) => <CreateAccountForm {...props} onSubmit={addAccount} />}
      />
    </div>
  );
}

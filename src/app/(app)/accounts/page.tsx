'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { accounts as initialAccounts } from '@/lib/data';
import { columns } from './columns';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { Account } from '@/lib/types';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);

  const addAccount = (account: Omit<Account, 'id'>) => {
    setAccounts(prev => [...prev, { ...account, id: `ACC-${Date.now()}` }]);
  };

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

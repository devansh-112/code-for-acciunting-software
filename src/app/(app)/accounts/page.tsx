
'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { accounts as initialAccounts } from '@/lib/data';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { Account } from '@/lib/types';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = {
      ...account,
      id: `ACC-${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
    };
    setAccounts([...accounts, newAccount]);
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

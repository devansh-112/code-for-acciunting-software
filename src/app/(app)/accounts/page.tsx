'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { Account } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AccountsPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  const accountsRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/accounts`);
  }, [firestore, user]);

  const { data: accounts, isLoading } = useCollection<Account>(accountsRef);

  const addAccount = (account: Omit<Account, 'id' | 'userId'>) => {
    if (!accountsRef) return;
    addDocumentNonBlocking(accountsRef, { ...account, userId: user!.uid });
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
        data={isLoading ? [] : accounts || []} 
        searchKey="name" 
        createFormComponent={(props) => <CreateAccountForm {...props} onSubmit={addAccount} />}
      />
    </div>
  );
}

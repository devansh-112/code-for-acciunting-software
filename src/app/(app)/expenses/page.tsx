'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateExpenseForm } from '@/components/forms/create-expense-form';
import { Expense } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function ExpensesPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  const expensesRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/expenses`);
  }, [firestore, user]);

  const { data: expenses, isLoading } = useCollection<Expense>(expensesRef);

  const addExpense = (expense: Omit<Expense, 'id' | 'userId'>) => {
    if (!expensesRef) return;
    addDocumentNonBlocking(expensesRef, { ...expense, userId: user!.uid });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Expenses
        </h1>
        <p className="text-muted-foreground">
          Track and manage your business expenses.
        </p>
      </div>
      <DataTable 
        columns={columns} 
        data={isLoading ? [] : expenses || []} 
        searchKey="vendor" 
        createFormComponent={(props) => <CreateExpenseForm {...props} onSubmit={addExpense} />} 
      />
    </div>
  );
}

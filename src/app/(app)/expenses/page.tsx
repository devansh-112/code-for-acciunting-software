
'use client';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';
import { CreateExpenseForm } from '@/components/forms/create-expense-form';
import { useExpenseContext } from '@/lib/context/expense-context';

export default function ExpensesPage() {
  const { expenses, addExpense } = useExpenseContext();

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
        data={expenses} 
        searchKey="vendor" 
        createFormComponent={(props) => <CreateExpenseForm {...props} onSubmit={addExpense} />} 
      />
    </div>
  );
}

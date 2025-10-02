'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { expenses as initialExpenses } from '@/lib/data';
import { columns } from './columns';
import { CreateExpenseForm } from '@/components/forms/create-expense-form';
import { Expense } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: `EXP-${Date.now()}` }]);
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
        data={expenses} 
        searchKey="vendor" 
        createFormComponent={(props) => <CreateExpenseForm {...props} onSubmit={addExpense} />} 
      />
    </div>
  );
}

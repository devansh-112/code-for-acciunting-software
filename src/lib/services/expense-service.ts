
import { Expense } from '@/lib/types';
import { expenses as initialExpenses } from '@/lib/data';
import { useState, useEffect } from 'react';

export const useExpenseService = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setExpenses(initialExpenses);
        setIsLoaded(true);
    }, []);

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense = {
            ...expense,
            id: `EXP-${Date.now()}`,
        };
        setExpenses(prev => [...prev, newExpense]);
    };

    return { expenses, addExpense, isLoaded };
};

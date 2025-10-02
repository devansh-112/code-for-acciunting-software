
import { Account } from '@/lib/types';
import { accounts as initialAccounts } from '@/lib/data';
import { useState, useEffect } from 'react';

export const useAccountService = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // In a real app, this would be a database call.
        // For now, we'll use the mock data and simulate a load.
        setAccounts(initialAccounts);
        setIsLoaded(true);
    }, []);

    const addAccount = (account: Omit<Account, 'id'>) => {
        const newAccount = {
            ...account,
            id: `ACC-${Date.now()}`,
        };
        setAccounts(prev => [...prev, newAccount]);
    };

    return { accounts, addAccount, isLoaded };
};

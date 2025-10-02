
import { Invoice } from '@/lib/types';
import { invoices as initialInvoices } from '@/lib/data';
import { useState, useEffect } from 'react';

export const useInvoiceService = (
    updateInventoryQuantity: (sku: string, quantityChange: number) => void
) => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setInvoices(initialInvoices);
        setIsLoaded(true);
    }, []);

    const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
        const newInvoice = {
            ...invoice,
            id: `INV-${Date.now()}`,
        };
        
        // Update inventory
        newInvoice.items.forEach(item => {
            updateInventoryQuantity(item.sku, -item.quantity);
        });

        setInvoices(prev => [newInvoice, ...prev]);
    };

    const deleteInvoice = (id: string) => {
        const invoiceToDelete = invoices.find(inv => inv.id === id);
        if (invoiceToDelete) {
             // Add back to inventory
            invoiceToDelete.items.forEach(item => {
                updateInventoryQuantity(item.sku, item.quantity);
            });
        }
        setInvoices(prev => prev.filter(invoice => invoice.id !== id));
    };

    return { invoices, addInvoice, deleteInvoice, isLoaded };
};

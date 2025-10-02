
import { InventoryItem } from '@/lib/types';
import { inventory as initialInventory } from '@/lib/data';
import { useState, useEffect } from 'react';

export const useInventoryService = () => {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setInventoryItems(initialInventory);
        setIsLoaded(true);
    }, []);

    const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
        const newItem = {
            ...item,
            id: item.sku,
        };
        setInventoryItems(prev => [...prev, newItem]);
    };

    const updateInventoryQuantity = (sku: string, quantityChange: number) => {
        setInventoryItems(prev => {
            const updatedItems = [...prev];
            const itemIndex = updatedItems.findIndex(item => item.sku === sku);
            if (itemIndex > -1) {
                updatedItems[itemIndex].quantity += quantityChange;
            }
            return updatedItems;
        });
    };

    return { inventoryItems, addInventoryItem, updateInventoryQuantity, isLoaded };
};

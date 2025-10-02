
'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import { InventoryItem } from '@/lib/types';


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  createFormComponent?: React.ComponentType<{ setOpen: (open: boolean) => void, inventoryItems?: InventoryItem[] }>;
  formProps?: any;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  createFormComponent: CreateFormComponent,
  formProps
}: DataTableToolbarProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const dataForForm = searchKey === 'customer' ? formProps.inventoryItems : table.options.data;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] bg-card"
        />
      </div>
      {CreateFormComponent && (
         <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-8">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New</DialogTitle>
            </DialogHeader>
            <CreateFormComponent setOpen={setOpen} inventoryItems={dataForForm} {...formProps} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

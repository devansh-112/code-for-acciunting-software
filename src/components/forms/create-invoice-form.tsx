
"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { PlusCircle, Trash, Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Invoice, InventoryItem } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

const lineItemSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(1, "Description is required"),
  hsn: z.string().min(1, "HSN/SAC is required"),
  quantity: z.coerce.number().min(0.01, "Quantity must be > 0"),
  unit: z.string().min(1, "Unit is required"),
  price: z.coerce.number().min(0.01, "Price must be > 0"),
  gstRate: z.coerce.number().min(0),
});

const formSchema = z.object({
  billedTo: z.object({
    name: z.string().min(1, "Customer name is required"),
    address: z.string().min(1, "Customer address is required"),
    gstin: z.string().min(1, "Customer GSTIN is required"),
  }),
  shippedTo: z.object({
    name: z.string().min(1, "Recipient name is required"),
    address: z.string().min(1, "Recipient address is required"),
    gstin: z.string().min(1, "Recipient GSTIN is required"),
  }),
  placeOfSupply: z.string().min(1, "Place of supply is required"),
  status: z.enum(["paid", "pending", "overdue"]),
  date: z.string().min(1, "Date is required"),
  items: z.array(lineItemSchema).min(1, "Invoice must have at least one item"),
})

type CreateInvoiceFormProps = {
  setOpen: (open: boolean) => void;
  onSubmit: (values: Omit<Invoice, 'id'>) => void;
  inventoryItems: InventoryItem[];
};

export function CreateInvoiceForm({ setOpen, onSubmit, inventoryItems }: CreateInvoiceFormProps) {
  const [sameAsBilledTo, setSameAsBilledTo] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billedTo: { name: "", address: "", gstin: "" },
      shippedTo: { name: "", address: "", gstin: "" },
      placeOfSupply: "",
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      items: [{ sku: "", description: "", hsn: "", quantity: 1, unit: "Pcs", price: 0, gstRate: 18 }],
    },
  })

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items"
  });
  
  const billedToValues = form.watch("billedTo");

  React.useEffect(() => {
    if (sameAsBilledTo) {
      form.setValue("shippedTo", billedToValues);
    }
  }, [billedToValues, sameAsBilledTo, form]);

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values as Omit<Invoice, 'id'>);
    form.reset();
    setOpen(false);
  }

  const handleItemSelect = (index: number, sku: string) => {
    const selectedItem = inventoryItems.find(item => item.sku === sku);
    if (selectedItem) {
      update(index, {
        sku: selectedItem.sku,
        description: selectedItem.name,
        hsn: selectedItem.hsn || '',
        price: selectedItem.price,
        gstRate: selectedItem.gstRate || 18,
        quantity: 1,
        unit: 'Pcs',
      });
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Billed To</h3>
            <FormField control={form.control} name="billedTo.name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Customer Name" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="billedTo.address" render={({ field }) => (
              <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="Customer Address" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="billedTo.gstin" render={({ field }) => (
              <FormItem><FormLabel>GSTIN/UIN</FormLabel><FormControl><Input placeholder="Customer GSTIN" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <h3 className="font-medium">Shipped To</h3>
                <div className="flex items-center space-x-2">
                    <Checkbox id="sameAsBilledTo" checked={sameAsBilledTo} onCheckedChange={(checked) => setSameAsBilledTo(checked as boolean)} />
                    <label htmlFor="sameAsBilledTo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Same as Billed To
                    </label>
                </div>
             </div>
             <FormField control={form.control} name="shippedTo.name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Recipient Name" {...field} disabled={sameAsBilledTo} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="shippedTo.address" render={({ field }) => (
              <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="Recipient Address" {...field} disabled={sameAsBilledTo} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="shippedTo.gstin" render={({ field }) => (
              <FormItem><FormLabel>GSTIN/UIN</FormLabel><FormControl><Input placeholder="Recipient GSTIN" {...field} disabled={sameAsBilledTo} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.control} name="placeOfSupply" render={({ field }) => (
                <FormItem><FormLabel>Place of Supply</FormLabel><FormControl><Input placeholder="e.g., Rajasthan" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Invoice Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )} />
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Invoice Items</h3>
          <div className="space-y-4">
            {fields.map((field, index) => {
              const selectedItem = inventoryItems.find(item => item.sku === form.watch(`items.${index}.sku`));
              return (
              <div key={field.id} className="grid grid-cols-12 gap-2 items-start">
                
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Description</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? inventoryItems.find(
                                      (item) => item.name === field.value
                                    )?.name
                                  : "Select item"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                             <Command>
                               <CommandInput placeholder="Search items..." />
                               <CommandList>
                                <CommandEmpty>No item found.</CommandEmpty>
                                <CommandGroup>
                                  {inventoryItems.map((item) => (
                                    <CommandItem
                                      value={item.name}
                                      key={item.sku}
                                      onSelect={() => handleItemSelect(index, item.sku)}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          item.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <div>
                                        <div>{item.name}</div>
                                        <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                             </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField control={form.control} name={`items.${index}.hsn`} render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel className="sr-only">HSN</FormLabel><FormControl><Input placeholder="HSN/SAC" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                  <FormItem className="col-span-1"><FormLabel className="sr-only">Qty</FormLabel><FormControl><Input type="number" placeholder="Qty" {...field} max={selectedItem?.quantity} /></FormControl></FormItem>
                )} />
                 <FormField control={form.control} name={`items.${index}.unit`} render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel className="sr-only">Unit</FormLabel><FormControl><Input placeholder="Unit" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel className="sr-only">Price</FormLabel><FormControl><Input type="number" placeholder="Price" {...field} /></FormControl></FormItem>
                )} />
                <div className="col-span-2 flex items-center gap-2">
                    <div className="font-medium text-sm self-center pt-2">
                        {`₹${(form.watch(`items.${index}.quantity`) * form.watch(`items.${index}.price`)).toFixed(2)}`}
                    </div>
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
                </div>
              </div>
            )})}
          </div>
           <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ sku: "", description: "", hsn: "", quantity: 1, unit: "Pcs", price: 0, gstRate: 18 })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
        </div>


        <Button type="submit">Create Invoice</Button>
      </form>
    </Form>
  )
}

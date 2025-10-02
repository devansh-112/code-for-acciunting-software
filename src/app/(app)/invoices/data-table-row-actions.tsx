
'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Download, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Invoice } from '@/lib/types';


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const invoice = row.original as Invoice;

  const downloadInvoice = () => {
    const doc = new jsPDF();
    
    doc.text('Invoice', 20, 20);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 30);
    doc.text(`Customer: ${invoice.customer}`, 20, 40);
    doc.text(`Email: ${invoice.email}`, 20, 50);
    if (invoice.gstin) {
      doc.text(`GSTIN: ${invoice.gstin}`, 20, 60);
    }
    doc.text(`Date: ${invoice.date}`, 20, 70);
    doc.text(`Status: ${invoice.status}`, 20, 80);

    const subtotal = invoice.amount;
    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const total = subtotal + gstAmount;

    (doc as any).autoTable({
        startY: 90,
        head: [['Description', 'Amount']],
        body: [
            ['Subtotal', new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)],
            [`GST (18%)`, new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(gstAmount)],
            ['Total Amount', new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)],
        ],
    });

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `invoice-${invoice.id}.pdf`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadInvoice}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

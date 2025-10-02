
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
import { companyDetails } from '@/lib/data';


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const invoice = row.original as Invoice;

  const downloadInvoice = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(10);
    doc.text(`GSTIN: ${companyDetails.gstin}`, 14, 10);
    doc.text('Original Copy', pageWidth - 14, 10, { align: 'right' });

    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(companyDetails.name, pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(companyDetails.address, pageWidth / 2, 26, { align: 'center' });
    doc.text(`Tel: ${companyDetails.phone} | Email: ${companyDetails.email}`, pageWidth / 2, 32, { align: 'center' });

    doc.line(14, 38, pageWidth - 14, 38);

    // Invoice Details
    doc.setFontSize(10);
    doc.text(`Invoice No.: ${invoice.id}`, 14, 45);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 14, 50);
    doc.text(`Place of Supply: ${invoice.placeOfSupply}`, 14, 55);

    // Billing and Shipping
    doc.setFont(undefined, 'bold');
    doc.text('Billed to:', 14, 65);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.billedTo.name, 14, 70);
    doc.text(invoice.billedTo.address, 14, 75);
    doc.text(`GSTIN/UIN: ${invoice.billedTo.gstin}`, 14, 80);

    doc.setFont(undefined, 'bold');
    doc.text('Shipped to:', pageWidth / 2 + 10, 65);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.shippedTo.name, pageWidth / 2 + 10, 70);
    doc.text(invoice.shippedTo.address, pageWidth / 2 + 10, 75);
    doc.text(`GSTIN/UIN: ${invoice.shippedTo.gstin}`, pageWidth / 2 + 10, 80);

    // Items Table
    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const total = subtotal + gstAmount;

    (doc as any).autoTable({
        startY: 85,
        head: [['S.N.', 'Description of Goods', 'HSN/SAC', 'Qty.', 'Unit', 'Price', 'Amount (INR)']],
        body: invoice.items.map((item, index) => [
            index + 1,
            item.description,
            item.hsn,
            item.quantity,
            item.unit,
            item.price.toFixed(2),
            (item.quantity * item.price).toFixed(2),
        ]),
        theme: 'grid',
        headStyles: { fillColor: [240, 240, 240], textColor: 20 },
        styles: { fontSize: 9 },
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Totals
    doc.setFontSize(10);
    doc.text('Subtotal', pageWidth - 50, finalY + 10);
    doc.text(subtotal.toFixed(2), pageWidth - 14, finalY + 10, { align: 'right' });
    doc.text(`IGST @ 18%`, pageWidth - 50, finalY + 15);
    doc.text(gstAmount.toFixed(2), pageWidth - 14, finalY + 15, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text('Grand Total', pageWidth - 50, finalY + 20);
    doc.text(total.toFixed(2), pageWidth - 14, finalY + 20, { align: 'right' });

    // Bank Details
    let currentY = finalY + 30;
    doc.setFont(undefined, 'bold');
    doc.text('Bank Details:', 14, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(`Bank: ${companyDetails.bankDetails.name}`, 14, currentY + 5);
    doc.text(`A/C No.: ${companyDetails.bankDetails.accountNumber}`, 14, currentY + 10);
    doc.text(`Branch: ${companyDetails.bankDetails.branch}`, 14, currentY + 15);
    doc.text(`IFS Code: ${companyDetails.bankDetails.ifsc}`, 14, currentY + 20);

    // Terms & Signature
    currentY += 30;
    doc.setFont(undefined, 'bold');
    doc.text('Terms & Conditions:', 14, currentY);
    doc.setFont(undefined, 'normal');
    companyDetails.terms.forEach((term, i) => {
        doc.text(`${i + 1}. ${term}`, 14, currentY + 5 + (i * 5));
    });
    
    doc.text('Receiver\'s Signature', pageWidth / 2, currentY + 15);
    doc.text(`For ${companyDetails.name}`, pageWidth - 14, currentY + 15, { align: 'right' });
    doc.text('Authorised Signatory', pageWidth - 14, currentY + 30, { align: 'right' });


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

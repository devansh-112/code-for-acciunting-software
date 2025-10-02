'use client';

import { StatCard } from '@/components/stat-card';
import { OverviewChart } from '@/components/overview-chart';
import { kpiData } from '@/lib/data';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { invoices } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [recentInvoices, setRecentInvoices] = useState(invoices.slice(0, 5));

  useEffect(() => {
    setRecentInvoices(invoices.slice(0, 5));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your finances.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => {
          const Icon = Icons[kpi.icon as keyof typeof Icons] as LucideIcon;
          return <StatCard key={kpi.title} {...kpi} icon={Icon} />;
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <OverviewChart />
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Invoices</CardTitle>
            <CardDescription>
              The latest 5 invoices created.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {recentInvoices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="font-medium">{invoice.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === 'paid' ? 'secondary' : invoice.status === 'pending' ? 'outline' : 'destructive'
                          }
                          className="capitalize"
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(invoice.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
             ) : (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  No recent invoices.
                </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

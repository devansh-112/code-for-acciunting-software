'use client';

import { StatCard } from '@/components/stat-card';
import { OverviewChart } from '@/components/overview-chart';
import { kpiData as initialKpiData } from '@/lib/data';
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
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Invoice, Expense } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();
  const [kpiData, setKpiData] = useState(initialKpiData);

  const invoicesRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/invoices`);
  }, [firestore, user]);

  const expensesRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/expenses`);
  }, [firestore, user]);

  const { data: invoices } = useCollection<Invoice>(invoicesRef);
  const { data: expenses } = useCollection<Expense>(expensesRef);

  useEffect(() => {
    if (invoices && expenses) {
      const totalRevenue = invoices.reduce((sum, inv) => sum + inv.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);
      const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const netIncome = totalRevenue - totalExpenses;
      const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;

      setKpiData([
        { title: 'Total Revenue', value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalRevenue), change: '', icon: 'DollarSign' },
        { title: 'Total Expenses', value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalExpenses), change: '', icon: 'CreditCard' },
        { title: 'Net Income', value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(netIncome), change: '', icon: 'BarChart3' },
        { title: 'Invoices Pending', value: pendingInvoices.toString(), change: '', icon: 'FileText' },
      ]);
    }
  }, [invoices, expenses]);

  const recentInvoices = invoices?.slice(0, 5) || [];

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
                        <div className="font-medium">{invoice.billedTo.name}</div>
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
                         {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0))}
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

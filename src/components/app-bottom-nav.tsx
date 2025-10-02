
'use client';

import {
  LayoutDashboard,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  Landmark,
  Package,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/invoices', icon: FileText, label: 'Invoices' },
  { href: '/expenses', icon: Receipt, label: 'Expenses' },
  { href: '/inventory', icon: Package, label: 'Inventory' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted group ${pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'}`}
              >
                  <item.icon className="w-5 h-5 mb-2" />
                  <span className="text-xs">{item.label}</span>
              </Link>
            ))}
        </div>
    </div>
  );
}


import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppProvider } from '@/lib/context/app-context';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <AppHeader />
            <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
            <AppBottomNav />
          </div>
        </div>
      </SidebarProvider>
    </AppProvider>
  );
}

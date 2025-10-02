import { ReportGenerator } from '@/components/report-generator';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Reports
        </h1>
        <p className="text-muted-foreground">
          Generate and analyze your financial reports with AI assistance.
        </p>
      </div>
      <ReportGenerator />
    </div>
  );
}

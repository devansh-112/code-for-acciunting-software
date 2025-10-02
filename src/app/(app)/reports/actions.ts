'use server';

import { generateReportSummary } from '@/ai/flows/generate-report-summary';

export async function getReportSummary(reportText: string) {
  try {
    const result = await generateReportSummary({ reportText });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Error generating report summary:', error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}

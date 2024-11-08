export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateDateDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function addDays(date: string, days: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}

export function addMonths(date: string, months: number): string {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result.toISOString().split('T')[0];
}

export function addYears(date: string, years: number): string {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result.toISOString().split('T')[0];
}
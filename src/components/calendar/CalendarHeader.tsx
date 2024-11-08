import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'month' | 'week' | 'agenda';
  onViewChange: (view: 'month' | 'week' | 'agenda') => void;
  onDateChange: (date: Date) => void;
}

export function CalendarHeader({ currentDate, view, onViewChange, onDateChange }: CalendarHeaderProps) {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {currentDate.toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {(['month', 'week', 'agenda'] as const).map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
              view === v
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
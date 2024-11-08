import { CalendarEvent } from './CalendarView';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function MonthView({ currentDate, events, onEventClick }: MonthViewProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: Array<{ date: Date; events: CalendarEvent[] }> = [];
    
    // Add previous month's days
    for (let i = 0; i < startingDay; i++) {
      const date = new Date(year, month, -startingDay + i + 1);
      days.push({ 
        date,
        events: events.filter(e => e.date === date.toISOString().split('T')[0])
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ 
        date,
        events: events.filter(e => e.date === date.toISOString().split('T')[0])
      });
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ 
        date,
        events: events.filter(e => e.date === date.toISOString().split('T')[0])
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = currentDate.getMonth();

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="bg-gray-50 dark:bg-gray-800 p-2 text-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </span>
        </div>
      ))}
      
      {days.map(({ date, events }, index) => {
        const isToday = date.toISOString().split('T')[0] === today;
        const isCurrentMonth = date.getMonth() === currentMonth;
        
        return (
          <div
            key={index}
            className={`min-h-[100px] bg-white dark:bg-gray-800 p-2 ${
              !isCurrentMonth ? 'opacity-50' : ''
            }`}
          >
            <div className={`text-sm font-medium mb-1 ${
              isToday
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {date.getDate()}
            </div>
            <div className="space-y-1">
              {events.map((event, idx) => (
                <button
                  key={idx}
                  onClick={() => onEventClick(event)}
                  className={`w-full text-left p-1 rounded text-xs ${
                    event.type === 'warranty-expiry'
                      ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                      : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  <div className="truncate">{event.product.name}</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
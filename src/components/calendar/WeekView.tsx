import { CalendarEvent } from './CalendarView';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const days = [];
  const currentDateStr = new Date().toISOString().split('T')[0];

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(dateStr);
    const isToday = dateStr === currentDateStr;

    days.push(
      <div key={i} className={`flex-1 min-h-[200px] border-r last:border-r-0 ${
        isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'
      }`}>
        <div className="p-2 border-b sticky top-0 bg-inherit">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="p-2 space-y-1">
          {dayEvents.map((event, idx) => (
            <button
              key={idx}
              onClick={() => onEventClick(event)}
              className={`w-full text-left p-2 rounded-md text-sm ${
                event.type === 'warranty-expiry'
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                  : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
              }`}
            >
              <div className="font-medium truncate">{event.product.name}</div>
              <div className="text-xs opacity-75">
                {event.type === 'warranty-expiry' ? 'Warranty Expiry' : 'Service Due'}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex border-l border-t border-b rounded-lg overflow-hidden">
      {days}
    </div>
  );
}
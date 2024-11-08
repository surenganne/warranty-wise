import { Calendar, AlertTriangle, Wrench } from 'lucide-react';
import { CalendarEvent } from './CalendarView';

interface AgendaViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function AgendaView({ events, onEventClick }: AgendaViewProps) {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .slice(0, 10);

  const groupedEvents = upcomingEvents.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event, idx) => (
              <button
                key={idx}
                onClick={() => onEventClick(event)}
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 p-1.5 rounded-full ${
                    event.type === 'warranty-expiry'
                      ? 'bg-red-100 dark:bg-red-900/50'
                      : 'bg-blue-100 dark:bg-blue-900/50'
                  }`}>
                    {event.type === 'warranty-expiry' ? (
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    ) : (
                      <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {event.product.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.type === 'warranty-expiry' ? 'Warranty Expiry' : 'Service Due'}
                      {event.service && ` - ${event.service.description}`}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {upcomingEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
        </div>
      )}
    </div>
  );
}
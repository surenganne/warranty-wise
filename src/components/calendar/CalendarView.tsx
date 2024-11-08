import { useState } from 'react';
import { AlertTriangle, Calendar, Wrench } from 'lucide-react';
import { CalendarHeader } from './CalendarHeader';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { AgendaView } from './AgendaView';
import { EventDetails } from './EventDetails';
import { Product } from '../../types';

interface CalendarViewProps {
  products: Product[];
}

export type CalendarEvent = {
  date: string;
  type: 'warranty-expiry' | 'service-due';
  product: Product;
  service?: {
    description: string;
    interval: number;
  };
};

export function CalendarView({ products }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const events = products.flatMap(product => {
    const events: CalendarEvent[] = [];
    
    // Add warranty expiry event
    if (product.warrantyExpiry) {
      events.push({
        date: product.warrantyExpiry,
        type: 'warranty-expiry',
        product
      });
    }

    // Add service due events
    if (product.serviceSchedule) {
      events.push({
        date: product.serviceSchedule.nextDue,
        type: 'service-due',
        product,
        service: {
          description: product.serviceSchedule.description,
          interval: product.serviceSchedule.intervalDays
        }
      });
    }

    return events;
  });

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return eventDate >= startOfMonth && eventDate <= endOfMonth;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onDateChange={setCurrentDate}
        />
        
        {view === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        )}
        
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        )}
        
        {view === 'agenda' && (
          <AgendaView
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        )}

        {selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}
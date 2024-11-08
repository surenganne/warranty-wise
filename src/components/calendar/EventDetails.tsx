import { X } from 'lucide-react';
import { CalendarEvent } from './CalendarView';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Event Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Product
              </label>
              <div className="mt-1 text-gray-900 dark:text-white">
                {event.product.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Event Type
              </label>
              <div className="mt-1 text-gray-900 dark:text-white">
                {event.type === 'warranty-expiry' ? 'Warranty Expiry' : 'Service Due'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Date
              </label>
              <div className="mt-1 text-gray-900 dark:text-white">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            {event.service && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Service Details
                </label>
                <div className="mt-1 text-gray-900 dark:text-white">
                  {event.service.description}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Interval: Every {event.service.interval} days
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
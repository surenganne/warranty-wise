import React, { useState } from 'react';
import { Calendar, Plus, Wrench, DollarSign, Clock } from 'lucide-react';
import { ServiceRecord } from '../types/product';

interface ServiceHistoryProps {
  records: ServiceRecord[];
  onAddService: (record: Omit<ServiceRecord, 'id'>) => void;
}

export function ServiceHistory({ records, onAddService }: ServiceHistoryProps) {
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'maintenance' as const,
    description: '',
    cost: 0,
    provider: '',
    nextServiceDue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddService(newService);
    setIsAddingService(false);
    setNewService({
      date: new Date().toISOString().split('T')[0],
      type: 'maintenance',
      description: '',
      cost: 0,
      provider: '',
      nextServiceDue: ''
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Service History</h3>
        <button
          onClick={() => setIsAddingService(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Service
        </button>
      </div>

      {isAddingService && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newService.date}
                onChange={e => setNewService({ ...newService, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newService.type}
                onChange={e => setNewService({ ...newService, type: e.target.value as 'maintenance' | 'repair' | 'inspection' })}
              >
                <option value="maintenance">Maintenance</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                required
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newService.description}
                onChange={e => setNewService({ ...newService, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cost</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  value={newService.cost}
                  onChange={e => setNewService({ ...newService, cost: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Provider</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newService.provider}
                onChange={e => setNewService({ ...newService, provider: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Next Service Due</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newService.nextServiceDue}
                onChange={e => setNewService({ ...newService, nextServiceDue: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddingService(false)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No service records yet</p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {record.type === 'maintenance' && <Wrench className="h-5 w-5 text-blue-500 mr-2" />}
                  {record.type === 'repair' && <Wrench className="h-5 w-5 text-red-500 mr-2" />}
                  {record.type === 'inspection' && <Wrench className="h-5 w-5 text-green-500 mr-2" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {record.type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{record.description}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  ${record.cost.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(record.date)}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {record.provider}
                  </div>
                </div>
                {record.nextServiceDue && (
                  <div className="flex items-center mt-2">
                    <Clock className="h-4 w-4 mr-1" />
                    Next service due: {formatDate(record.nextServiceDue)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
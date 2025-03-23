import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Schedule } from '../../types';

export const BusTimings: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [busStops, setBusStops] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Clock className="mr-2 text-blue-600" size={24} />
        Bus Timings & Schedules
      </h2>
      
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus Stop</label>
              <select className="input-field">
                <option value="">Select bus stop</option>
                {busStops.map((stop, index) => (
                  <option key={index} value={stop}>{stop}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select className="input-field">
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select className="input-field">
                <option value="all">All Day</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 12 AM)</option>
                <option value="night">Night (12 AM - 6 AM)</option>
              </select>
            </div>
            
            <button className="btn-primary">
              Show Timings
            </button>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bus No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedules.map((schedule, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schedule.routeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Route name will be populated from database */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.arrivalTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.departureTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        schedule.status === 'on-time' ? 'bg-green-100 text-green-800' :
                        schedule.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {schedule.status === 'delayed' ? `Delayed (${schedule.delay}min)` : schedule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalResults > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button 
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button 
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setCurrentPage(page => page + 1)}
                  disabled={currentPage * resultsPerPage >= totalResults}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{Math.min(1 + (currentPage - 1) * resultsPerPage, totalResults)}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * resultsPerPage, totalResults)}</span> of{' '}
                    <span className="font-medium">{totalResults}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                    >
                      ←
                    </button>
                    {/* Page numbers will be dynamically generated based on totalResults */}
                    <button 
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={() => setCurrentPage(page => page + 1)}
                      disabled={currentPage * resultsPerPage >= totalResults}
                    >
                      →
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
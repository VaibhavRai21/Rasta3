import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { Bus, MapPin, BellRing } from "lucide-react";

export const RouteFinder: React.FC = () => {

  const [selectedStart, setSelectedStart] = useState<[number, number] | undefined>(undefined);
  const [selectedEnd, setSelectedEnd] = useState<[number, number] | undefined>(undefined);
  const [busStops, setBusStops] = useState<[number, number][]>([]);

  // Example bus stops (replace with API data if needed)
  const exampleBusStops: [number, number][] = [
    [13.0675, 80.217], 
    [13.0605, 80.245], 
    [13.0705, 80.265]
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Bus className="mr-2 text-blue-600" size={24} />
        Bus Route Finder
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Left Side: Form Inputs */}
        <div className="md:col-span-1">
          <div className="space-y-4">
            {/* Starting Point */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Starting Point</label>
              <select 
                className="input-field"
                onChange={(e) => {
                  const value = e.target.value.split(",").map(Number) as [number, number];
                  setSelectedStart(value);
                }}
              >
                <option value="">Select starting point</option>
                <option value="13.06745,80.20566">Chennai Central</option>
                <option value="13.0827,80.2707">Egmore</option>
              </select>
            </div>
            
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <select 
                className="input-field"
                onChange={(e) => {
                  const value = e.target.value.split(",").map(Number) as [number, number];
                  setSelectedEnd(value);
                }}
              >
                <option value="">Select destination</option>
                <option value="13.0358,80.2442">Guindy</option>
                <option value="12.9716,77.5946">Bangalore</option>
              </select>
            </div>
            
            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Travel</label>
              <input type="date" className="input-field" placeholder="dd-mm-yyyy" />
            </div>
            
            {/* Travel Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time of Travel</label>
              <select className="input-field">
                <option value="">Select time</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 12 AM)</option>
                <option value="night">Night (12 AM - 6 AM)</option>
              </select>
            </div>
            
            <button className="btn-primary" onClick={() => setBusStops(exampleBusStops)}>
              Find Routes
            </button>
          </div>
        </div>
        
        {/* Right Side: Map & Route Details */}
        <div className="md:col-span-2">
          {/* Map Component */}
          <MapComponent start={selectedStart} end={selectedEnd} busStops={busStops} />

          {/* Route Information */}
          <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Route Information</h3>
            {selectedStart && selectedEnd ? (
              <div className="route-details">
                <p className="text-gray-700 text-sm">
                  Route from <strong>{selectedStart.toString()}</strong> to <strong>{selectedEnd.toString()}</strong>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a route to view detailed information</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

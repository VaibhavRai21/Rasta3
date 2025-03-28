import React from 'react';
import { MapPin, Info, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif mb-4">Rasta - TN Bus Navigator</h3>
            <p className="text-gray-300 font-serif text-sm">
              Bus route navigator and tracker for Tamil Nadu State Transport Corporation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif mb-4">Devs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Abhijit Harsh</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Prakhar Jain</a></li>
              <li><a href="https://github.com/VaibhavRai21" className="text-gray-300 hover:text-white">Vaibhav Rai</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center font-serif text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                SRMIST , Kattankulathur ,Chengalpattu, Tamil Nadu
              </li>
              <li className="flex items-center font-serif text-gray-300">
                <Info className="h-5 w-5 mr-2" />
                Phone number: 7989613318
              </li>
              <li className="flex items-center font-serif text-gray-300">
                <Settings className="h-5 w-5 mr-2" />
                Support: ah3812@srmist.edu.in
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
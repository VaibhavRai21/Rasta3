import React from 'react';
import { Bus, Navigation, MapPin, Clock, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onMenuClick }) => {
  return (
    <header className="bg-indigo-900 text-white font-serif shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Bus className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">Rasta - TN Bus Navigator</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <button 
              className={`nav-link ${activeTab === 'route-finder' ? 'nav-link-active' : 'nav-link-inactive'}`}
              onClick={() => onTabChange('route-finder')}
            >
              <span className="flex items-center">
                <Navigation className="h-5 w-5 mr-1" />
                Route Finder
              </span>
            </button>
            <button 
              className={`nav-link ${activeTab === 'live-tracking' ? 'nav-link-active' : 'nav-link-inactive'}`}
              onClick={() => onTabChange('live-tracking')}
            >
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                Live Tracking
              </span>
            </button>
            <button 
              className={`nav-link ${activeTab === 'timings' ? 'nav-link-active' : 'nav-link-inactive'}`}
              onClick={() => onTabChange('timings')}
            >
              <span className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                Bus Timings
              </span>
            </button>
          </div>
          <button 
            className="md:hidden text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
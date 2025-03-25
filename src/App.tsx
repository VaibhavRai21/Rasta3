import React, { useState } from 'react';
console.log("App.tsx is rendering!");
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RouteFinder } from './components/tabs/RouteFinder';
import { BusTimings } from './components/tabs/BusTimings';
import './styles/main.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('route-finder');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'route-finder':
        return <RouteFinder />;
      case 'timings':
        return <BusTimings />;
      default:
        return <p className="text-center text-gray-600">Select a tab to view content</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onMenuClick={toggleSidebar}
      />
      
      <div className="flex flex-1 relative">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
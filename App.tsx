
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlannerView from './components/PlannerView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import AboutView from './components/AboutView';
import TermsView from './components/TermsView';
import PrivacyView from './components/PrivacyView';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('planner');

  const renderView = () => {
    switch (currentView) {
      case 'planner':
        return <PlannerView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'about':
        return <AboutView />;
      case 'terms':
        return <TermsView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <PlannerView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PlannerView from './components/PlannerView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import AboutView from './components/AboutView';
import TermsView from './components/TermsView';
import PrivacyView from './components/PrivacyView';
import type { View } from './types';

const App: React.FC = () => {
  const getViewFromHash = (): View => {
    const hash = window.location.hash.slice(1);
    const validViews: View[] = ['planner', 'analytics', 'settings', 'about', 'terms', 'privacy'];
    if (validViews.includes(hash as View)) {
      return hash as View;
    }
    return 'planner';
  };

  const [currentView, setCurrentView] = useState<View>(getViewFromHash());

  useEffect(() => {
    // On mount, if there's no hash, silently update the URL to reflect the default view.
    // This uses replaceState to avoid triggering an extra hashchange event on load.
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#planner');
    }

    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


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
      <Sidebar currentView={currentView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;

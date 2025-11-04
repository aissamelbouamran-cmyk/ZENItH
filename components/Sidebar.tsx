
import React from 'react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems: { id: View; name: string; icon: React.ReactNode }[] = [
    { id: 'planner', name: 'Planner', icon: <CalendarIcon /> },
    { id: 'analytics', name: 'Analytics', icon: <ChartIcon /> },
    { id: 'settings', name: 'Accounts', icon: <SettingsIcon /> },
  ];

  const legalItems: { id: View; name: string; icon: React.ReactNode }[] = [
    { id: 'about', name: 'About', icon: <InfoIcon /> },
    { id: 'terms', name: 'Terms of Service', icon: <FileTextIcon /> },
    { id: 'privacy', name: 'Privacy Policy', icon: <ShieldIcon /> },
  ];

  return (
    <div className="w-16 sm:w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="flex items-center justify-center sm:justify-start p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="text-white bg-indigo-500 p-2 rounded-lg">
          <ZapIcon />
        </div>
        <h1 className="hidden sm:block text-xl font-bold ml-3 text-gray-800 dark:text-white">Zenith</h1>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <nav className="px-2 sm:px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-center sm:justify-start p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline ml-4">{item.name}</span>
            </button>
          ))}
        </nav>
        <div>
            <div className="px-4">
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <nav className="px-2 sm:px-4 py-4 space-y-2">
                {legalItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center justify-center sm:justify-start p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentView === item.id
                            ? 'bg-indigo-500 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {item.icon}
                        <span className="hidden sm:inline ml-4">{item.name}</span>
                    </button>
                ))}
            </nav>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
         <div className="flex items-center">
             <img className="h-10 w-10 rounded-full" src="https://picsum.photos/100" alt="User Avatar"/>
             <div className="hidden sm:block ml-3">
                 <p className="text-sm font-semibold text-gray-800 dark:text-white">Jane Doe</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
             </div>
         </div>
      </div>
    </div>
  );
};

// SVG Icons
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.4l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="16" y2="12"></line><line x1="12" x2="12.01" y1="8" y2="8"></line></svg>
);
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);


export default Sidebar;
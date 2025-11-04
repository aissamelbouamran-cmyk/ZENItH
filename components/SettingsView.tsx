
import React, { useState, useEffect } from 'react';
import { getSocialAccounts, toggleAccountConnection } from '../services/mockApiService';
import type { SocialAccount } from '../types';
import PlatformIcon from './PlatformIcon';

const SettingsView: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const fetchedAccounts = await getSocialAccounts();
      setAccounts(fetchedAccounts);
    };
    fetchAccounts();
  }, []);

  const handleToggleConnection = async (accountId: string) => {
    const updatedAccount = await toggleAccountConnection(accountId);
    setAccounts(accounts.map(acc => acc.id === accountId ? updatedAccount : acc));
  };

  return (
    <div>
       <header className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Connected Accounts</h1>
          <p className="text-md text-gray-500 dark:text-gray-400">Manage your social media profiles.</p>
      </header>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {accounts.map((account) => (
            <li key={account.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PlatformIcon platform={account.platform} className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{account.platform}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {account.isConnected ? `@${account.username}` : 'Not Connected'}
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleToggleConnection(account.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      account.isConnected
                        ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900'
                        : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'
                    }`}
                  >
                    {account.isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsView;

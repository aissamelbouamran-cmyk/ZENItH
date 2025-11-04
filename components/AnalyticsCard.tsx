
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, trend }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
      <div className="mt-1 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        <span className={`ml-2 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default AnalyticsCard;

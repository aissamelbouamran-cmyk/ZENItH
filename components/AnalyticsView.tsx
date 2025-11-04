
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getAnalyticsData } from '../services/mockApiService';
import type { AnalyticsData } from '../types';
import AnalyticsCard from './AnalyticsCard';

const AnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAnalyticsData();
      setAnalytics(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !analytics) {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
  }

  return (
    <div>
      <header className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-md text-gray-500 dark:text-gray-400">Your social media performance at a glance.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <AnalyticsCard title="Total Impressions" value={analytics.totalImpressions.toLocaleString()} trend="+12.5%" />
        <AnalyticsCard title="Total Likes" value={analytics.totalLikes.toLocaleString()} trend="+8.2%" />
        <AnalyticsCard title="Total Comments" value={analytics.totalComments.toLocaleString()} trend="-1.5%" />
        <AnalyticsCard title="Total Shares" value={analytics.totalShares.toLocaleString()} trend="+5.7%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.engagementOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
              <XAxis dataKey="date" stroke="rgb(156 163 175)" />
              <YAxis stroke="rgb(156 163 175)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: 'rgba(128, 128, 128, 0.5)',
                  color: 'white',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Posts by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.postsByPlatform}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
              <XAxis dataKey="platform" stroke="rgb(156 163 175)" />
              <YAxis stroke="rgb(156 163 175)" />
               <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: 'rgba(128, 128, 128, 0.5)',
                  color: 'white',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;

import React from 'react';
import type { Post } from '../types';
import { PostStatus } from '../types';
import PlatformIcon from './PlatformIcon';

interface ContentCalendarProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const STATUS_COLORS: Record<PostStatus, { bg: string; text: string; border: string }> = {
  [PostStatus.Scheduled]: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-500' },
  [PostStatus.Published]: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300', border: 'border-green-500' },
  [PostStatus.Draft]: { bg: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-800 dark:text-gray-300', border: 'border-gray-500' },
  [PostStatus.Error]: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300', border: 'border-red-500' },
};

const ContentCalendar: React.FC<ContentCalendarProps> = ({ posts, onSelectPost, currentDate, setCurrentDate }) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const days = Array.from({ length: startDay + daysInMonth }, (_, i) => {
    if (i < startDay) return null;
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), i - startDay + 1);
  });
  
  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };
  
  const postsByDate: { [key: string]: Post[] } = {};
  posts.forEach(post => {
    const dateKey = post.scheduledAt.toDateString();
    if (!postsByDate[dateKey]) {
      postsByDate[dateKey] = [];
    }
    postsByDate[dateKey].push(post);
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">&lt;</button>
        <h2 className="text-xl font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-px flex-grow bg-gray-200 dark:bg-gray-700">
        {weekDays.map(day => (
          <div key={day} className="text-center font-medium text-sm py-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{day}</div>
        ))}
        {days.map((day, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-2 min-h-[120px] overflow-y-auto">
            {day && (
              <>
                <span className="text-sm font-medium">{day.getDate()}</span>
                <div className="mt-1 space-y-1">
                  {(postsByDate[day.toDateString()] || []).map(post => (
                    <div 
                      key={post.id} 
                      onClick={() => onSelectPost(post)}
                      className={`p-1.5 rounded-md cursor-pointer text-xs ${STATUS_COLORS[post.status].bg} ${STATUS_COLORS[post.status].text} border-l-4 ${STATUS_COLORS[post.status].border}`}
                    >
                      <p className="font-semibold truncate">{post.content}</p>
                      <div className="flex items-center mt-1 space-x-1">
                         {post.mediaUrl && <PaperClipIcon className="h-3 w-3 text-gray-500 dark:text-gray-400" />}
                        {post.platforms.map(p => <PlatformIcon key={p} platform={p} className="h-4 w-4 opacity-70" />)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaperClipIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
);


export default ContentCalendar;

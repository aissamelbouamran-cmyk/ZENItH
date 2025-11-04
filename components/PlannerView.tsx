import React, { useState, useEffect } from 'react';
import { getPosts, savePost, savePosts } from '../services/mockApiService';
import type { Post } from '../types';
import ContentCalendar from './ContentCalendar';
import PostEditorModal from './PostEditorModal';
import CsvImporter from './CsvImporter';

const PlannerView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const fetchAndSetPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchAndSetPosts();
  }, []);

  const handleCreatePost = (date?: Date) => {
    setSelectedPost(null);
    setIsEditorOpen(true);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditorOpen(true);
  };

  const handleSavePost = async (postToSave: Post) => {
    await savePost(postToSave);
    await fetchAndSetPosts(); // Refetch to ensure data consistency
    setIsEditorOpen(false);
    setSelectedPost(null);
  };

  const handleCsvImport = async (newPosts: Post[]) => {
    if (newPosts.length > 0) {
      await savePosts(newPosts);
      await fetchAndSetPosts(); // Refetch to ensure data consistency
    }
    setIsImporterOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Planner</h1>
            <p className="text-md text-gray-500 dark:text-gray-400">Drag, drop, and schedule your content with ease.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsImporterOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
             <UploadIcon/>
            <span className="ml-2">Import CSV</span>
          </button>
          <button
            onClick={() => handleCreatePost()}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700"
          >
            <PlusIcon />
            <span className="ml-2">Create Post</span>
          </button>
        </div>
      </header>

      <div className="flex-grow mt-6">
        <ContentCalendar 
            posts={posts} 
            onSelectPost={handleSelectPost} 
            currentDate={calendarDate} 
            setCurrentDate={setCalendarDate}
        />
      </div>

      {isEditorOpen && (
        <PostEditorModal
          post={selectedPost}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSavePost}
        />
      )}

      {isImporterOpen && (
        <CsvImporter
          onClose={() => setIsImporterOpen(false)}
          onImport={handleCsvImport}
        />
      )}
    </div>
  );
};

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>;

export default PlannerView;
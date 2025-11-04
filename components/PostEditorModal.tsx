
import React, { useState, useEffect } from 'react';
import { generatePostIdea } from '../services/geminiService';
import type { Post, SocialPlatform } from '../types';
import { PostStatus } from '../types';
import { SocialPlatform as SPEnum } from '../types';
import PlatformIcon from './PlatformIcon';

interface PostEditorModalProps {
  post: Post | null;
  onClose: () => void;
  onSave: (post: Post) => void;
}

const PostEditorModal: React.FC<PostEditorModalProps> = ({ post, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [status, setStatus] = useState<PostStatus>(PostStatus.Scheduled);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setPlatforms(post.platforms);
      const dt = new Date(post.scheduledAt);
      // Format to yyyy-MM-ddThh:mm
      const localISOString = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      setScheduledAt(localISOString);
      setStatus(post.status);
    } else {
      // Defaults for new post
       const now = new Date();
       const localISOString = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
       setScheduledAt(localISOString);
    }
  }, [post]);

  const handlePlatformToggle = (platform: SocialPlatform) => {
    setPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };
  
  const handleGenerateIdea = async () => {
      setIsGenerating(true);
      try {
          const idea = await generatePostIdea(content || "a new product launch");
          setContent(idea);
      } catch (error) {
          console.error("Failed to generate post idea:", error);
          // Here you could set an error message to display to the user
      } finally {
          setIsGenerating(false);
      }
  };

  const handleSave = () => {
    if (!content || platforms.length === 0 || !scheduledAt) {
      alert('Please fill all fields');
      return;
    }
    const postToSave: Post = {
      id: post?.id || Date.now().toString(),
      content,
      platforms,
      scheduledAt: new Date(scheduledAt),
      status,
    };
    onSave(postToSave);
  };

  const allPlatforms = Object.values(SPEnum);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{post ? 'Edit Post' : 'Create Post'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {allPlatforms.map(p => (
                <button
                  key={p}
                  onClick={() => handlePlatformToggle(p)}
                  className={`px-3 py-2 text-sm rounded-full flex items-center border ${
                    platforms.includes(p) ? 'bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-500 dark:text-indigo-300' : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                  }`}
                >
                  <PlatformIcon platform={p} className="h-4 w-4 mr-2"/>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="What do you want to share?"
            />
            <button onClick={handleGenerateIdea} disabled={isGenerating} className="mt-2 flex items-center px-3 py-1.5 text-xs font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-indigo-300">
                {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Date</label>
              <input
                type="datetime-local"
                id="scheduledAt"
                value={scheduledAt}
                onChange={e => setScheduledAt(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
               <select
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value as PostStatus)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              >
                {Object.values(PostStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Save Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostEditorModal;

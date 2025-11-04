
export enum SocialPlatform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  X = 'X',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  isConnected: boolean;
}

export enum PostStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Published = 'Published',
  Error = 'Error',
}

export interface Post {
  id: string;
  platforms: SocialPlatform[];
  content: string;
  mediaUrl?: string; // URL to an image or video
  status: PostStatus;
  scheduledAt: Date;
  analytics?: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
  };
}

export type View = 'planner' | 'analytics' | 'settings' | 'about' | 'terms' | 'privacy';

export interface AnalyticsData {
  totalImpressions: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementOverTime: { date: string; engagement: number }[];
  postsByPlatform: { platform: SocialPlatform; count: number }[];
}
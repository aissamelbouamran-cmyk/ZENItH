import type { Post, SocialAccount, AnalyticsData, SocialPlatform } from '../types';
import { PostStatus, SocialPlatform as SPEnum } from '../types';

let mockPosts: Post[] = [
  {
    id: '1',
    platforms: [SPEnum.Facebook, SPEnum.Instagram],
    content: 'Excited to launch our new product next week! Stay tuned for more details. #newproduct #launch',
    status: PostStatus.Scheduled,
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)),
    analytics: { likes: 120, comments: 15, shares: 8, impressions: 5400 },
  },
  {
    id: '2',
    platforms: [SPEnum.X],
    content: 'Quick update: Our servers will be down for maintenance tonight at 2 AM EST.',
    status: PostStatus.Published,
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    analytics: { likes: 45, comments: 5, shares: 2, impressions: 2300 },
  },
  {
    id: '3',
    platforms: [SPEnum.LinkedIn],
    content: 'We are hiring! Looking for a Senior Frontend Engineer to join our team. Apply now!',
    status: PostStatus.Published,
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    analytics: { likes: 250, comments: 30, shares: 25, impressions: 15000 },
  },
  {
    id: '4',
    platforms: [SPEnum.TikTok],
    content: 'Behind the scenes of our latest video shoot!',
    status: PostStatus.Draft,
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 5)),
  }
];

let mockAccounts: SocialAccount[] = [
    { id: 'acc1', platform: SPEnum.Facebook, username: 'zenith_official', isConnected: true },
    { id: 'acc2', platform: SPEnum.Instagram, username: 'zenith.social', isConnected: true },
    { id: 'acc3', platform: SPEnum.X, username: 'ZenithSocial', isConnected: false },
    { id: 'acc4', platform: SPEnum.LinkedIn, username: 'zenith-inc', isConnected: true },
    { id: 'acc5', platform: SPEnum.TikTok, username: 'zenithtoks', isConnected: false },
    { id: 'acc6', platform: SPEnum.YouTube, username: 'ZenithChannel', isConnected: false },
];

// --- MOCK API FUNCTIONS ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getPosts = async (): Promise<Post[]> => {
  await delay(500);
  return [...mockPosts];
};

export const savePost = async (post: Post): Promise<Post> => {
  await delay(300);
  const existingIndex = mockPosts.findIndex(p => p.id === post.id);
  if (existingIndex > -1) {
    mockPosts[existingIndex] = post;
  } else {
    mockPosts.push(post);
  }
  return post;
};

export const savePosts = async (posts: Post[]): Promise<Post[]> => {
    await delay(300);
    mockPosts.push(...posts);
    return posts;
};

export const getSocialAccounts = async (): Promise<SocialAccount[]> => {
    await delay(400);
    return [...mockAccounts];
};

export const toggleAccountConnection = async (accountId: string): Promise<SocialAccount> => {
    await delay(600);
    const account = mockAccounts.find(acc => acc.id === accountId);
    if (!account) throw new Error('Account not found');
    account.isConnected = !account.isConnected;
    if(account.isConnected) {
        // Mock success message
        console.log(`OAuth successful for ${account.platform}!`);
    }
    return {...account};
};

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
    await delay(1000);
    
    const publishedPosts = mockPosts.filter(p => p.status === PostStatus.Published && p.analytics);
    
    const totals = publishedPosts.reduce((acc, post) => {
        acc.totalImpressions += post.analytics!.impressions;
        acc.totalLikes += post.analytics!.likes;
        acc.totalComments += post.analytics!.comments;
        acc.totalShares += post.analytics!.shares;
        return acc;
    }, { totalImpressions: 0, totalLikes: 0, totalComments: 0, totalShares: 0 });

    const engagementOverTime = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            engagement: Math.floor(Math.random() * (500 - 100 + 1) + 100),
        };
    }).reverse();
    
    const postsByPlatform: { platform: SocialPlatform, count: number }[] = [];
    const platformCounts: { [key in SocialPlatform]?: number } = {};
    
    mockPosts.forEach(post => {
        post.platforms.forEach(platform => {
            platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        });
    });

    for (const platform in platformCounts) {
        postsByPlatform.push({ platform: platform as SocialPlatform, count: platformCounts[platform as SocialPlatform]! });
    }

    return { ...totals, engagementOverTime, postsByPlatform };
};
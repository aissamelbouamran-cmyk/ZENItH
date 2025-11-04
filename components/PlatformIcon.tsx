
import React from 'react';
import { PLATFORM_ICONS, PLATFORM_COLORS } from '../constants';
import type { SocialPlatform } from '../types';

interface PlatformIconProps {
  platform: SocialPlatform;
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = 'h-6 w-6' }) => {
    const colorClass = PLATFORM_COLORS[platform] || 'bg-gray-500';

    return (
        <div className={`${className} ${colorClass} text-white rounded-full flex items-center justify-center p-1`}>
            {PLATFORM_ICONS[platform]}
        </div>
    );
};

export default PlatformIcon;

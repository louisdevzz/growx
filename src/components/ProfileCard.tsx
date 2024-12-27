import React from 'react';
import { Profile } from '../types/profile';
import { VerifiedBadge } from './ui/VerifiedBadge'; 
import { FundingBox } from './FundingBox';
import { ProfileTabs } from './ProfileTabs';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="max-w-2xl card-hover">
      {/* Banner */}
      <div className="h-48 relative">
        <img 
          src={profile.bannerImage} 
          alt={`${profile.name} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="w-16 h-16 rounded-full border-4 border-white -mt-10"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              {profile.isVerified && <VerifiedBadge />}
            </div>
            <p className="text-gray-600">{profile.handle}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center mt-4 space-x-4 text-sm text-gray-600">
          <span>{profile.stats.followers} Followers</span>
          <span>{profile.stats.following} Following</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{profile.type}</span>
        </div>

        {/* Funding Box */}
        <div className="mt-4">
          <FundingBox amount={profile.funding.amount} donors={profile.funding.donors} />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <ProfileTabs profile={profile} />
        </div>
      </div>
    </div>
  );
}; 
import React from 'react';
import { Profile } from '../../types/profile';
import { ProfileCard } from './ProfileCard';

// Example data
const exampleProfile: Profile = {
  id: 'food-bank-wallet',
  name: 'Food Bank Wallet',
  handle: '@vt.foodbank.neo',
  isVerified: true,
  avatar: '/path/to/avatar.png',
  bannerImage: '/path/to/money-tree-banner.png',
  type: 'Public Good',
  socialLinks: {
    website: 'https://...',
    discord: 'https://...'
  },
  stats: {
    followers: 6,
    following: 1
  },
  funding: {
    amount: 176.35,
    donors: 16
  },
  overview: 'Redistributed all funds to approved public goods on Pollock registry',
  publicGoodReason: 'Automatically gives back to public goods',
  teamMembers: [],
  githubRepos: [],
  smartContracts: []
};

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ProfileCard profile={exampleProfile} />
      </div>
    </div>
  );
}; 
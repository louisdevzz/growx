import { FundingDonation, FundingStats } from '@/types/funding';

export const fundingStats: FundingStats = {
  totalDonated: 35.20,
  uniqueDonors: 16,
  totalMatched: 0.00
};

export const fundingDonations: FundingDonation[] = [
  {
    id: '1',
    donorId: 'figitalclub.near',
    donorName: 'figitalclub.near',
    donorAvatar: '/avatars/figitalclub.jpg',
    amount: 0.2,
    type: 'Direct donation',
    timestamp: '38d ago'
  },
  {
    id: '2',
    donorId: 'amichael.near',
    donorName: 'amichael.near',
    donorAvatar: '/avatars/amichael.jpg',
    amount: 0.1,
    type: 'Direct donation',
    timestamp: '78d ago'
  },
  {
    id: '3',
    donorId: 'mpround.near',
    donorName: 'mpround.near',
    donorAvatar: '/avatars/mpround.jpg',
    amount: 0.1,
    type: 'Direct donation',
    timestamp: '82d ago'
  },
  {
    id: '4',
    donorId: 'potlock.near',
    donorName: 'potlock.near',
    donorAvatar: '/avatars/potlock.jpg',
    amount: 0.3,
    type: 'Direct donation',
    timestamp: '95d ago'
  },
  // Add more sample donations as needed
]; 
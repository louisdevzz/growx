export interface FundingDonation {
  id: string;
  donorId: string;
  donorName: string;
  donorAvatar: string;
  amount: number;
  type: 'Direct donation';
  timestamp: string;
}

export interface FundingStats {
  totalDonated: number;
  uniqueDonors: number;
  totalMatched: number;
} 
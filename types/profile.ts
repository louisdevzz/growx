export interface SocialLinks {
  website?: string;
  twitter?: string;
  github?: string;
  discord?: string;
}

export interface ProfileStats {
  followers: number;
  following: number;
}

export interface FundingStats {
  amount: number;
  donors: number;
}

export interface TeamMember {
  name: string;
  avatar?: string;
  role?: string;
}

export interface Profile {
  id: string;
  name: string;
  handle: string;
  isVerified: boolean;
  avatar: string;
  bannerImage: string;
  type: 'Public Good' | 'Public Grant';
  socialLinks: SocialLinks;
  stats: ProfileStats;
  funding: FundingStats;
  
  // About section
  overview?: string;
  publicGoodReason?: string;
  teamMembers?: TeamMember[];
  githubRepos?: string[];
  smartContracts?: string[];
} 
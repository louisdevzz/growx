export interface Project {

  // Basic Info (Required)
  name: string;
  slug?: string;
  description: string;
  image: string;
  bannerImage?: string; // Separate banner image if different from card image
  tags: string[];
  
  // Financial Info
  amount: number;
  currency: string;
  donors?: number;
  
  // Status & Social
  isApproved?: boolean;
  followers?: number;
  following?: number;
  
  // Detail Page Info
  overview?: string | string[];
  why?: string;
  teamMembers?: {
    image?: string;
    name?: string;
    role?: string;
  }[];
  fundingSources?: string[];
  address?: string;
  ownerAddress?: string;
  
  // Social Links
  socialLinks?: {
    website?: string;
    twitter?: string;
    github?: string;
    discord?: string;
  };
} 
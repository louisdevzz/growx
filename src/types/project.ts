export interface ProjectProps {
  _id?: string;
  projectId?: string;
  name: string;
  description: string;
  coverImage: string;
  profileImage: string;
  category: string;
  chain: string;
  fundingSources: string[];
  socialLinks: {
    type: string;
    url: string;
  }[];
  createdAt: string;
  amount?: number;
  currency?: string;
  raised?: boolean;
  href?: string;
  donors?: number;
  daysLeft?: number | string;
  index?: number;
  slug?: string;
  why?: string;
  address?: string;
  ownerAddress?: string;
}
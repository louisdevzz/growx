export interface Project {
  id: string;
  title: string;
  handle?: string;
  description: string;
  image: string;
  tags: string[];
  amount: number;
  currency: string;
  raised?: boolean;
  donors?: number;
  isApproved?: boolean;
  followers?: number;
  following?: number;
  whyPublicGood?: string;
  teamMembers?: string;
  githubRepos?: string;
  smartContracts?: string;
  overview?: string[];
}

export const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Food Bank Wallet",
    handle: "@v1.foodbank.near",
    description: "Redistributed all funds to approved public goods on Potlock registry. Used by YEAR of CHEF for auto-redistribution of royalties",
    image: "/assets/projects/nft1.png",
    tags: ["Health"],
    amount: 35.20,
    currency: "NEAR",
    donors: 18,
    isApproved: true,
    followers: 6,
    following: 1,
    whyPublicGood: "Automatically gives back to public goods",
    teamMembers: "No team members to display",
    githubRepos: "None provided",
    smartContracts: "None provided",
    overview: [
      "Redistributed all funds to approved public goods on Potlock registry",
      "Used by YEAR of CHEF for auto-redistribution of royalties"
    ]
  },
  {
    id: "2",
    title: "YEAR OF THE CHEF",
    handle: "@yearofthechef.near",
    description: "NFT series of 2024 hand drawn design chef NFTs for public goods supporters",
    image: "/assets/projects/nft2.png",
    tags: ["Health"],
    amount: 497.26,
    currency: "NEAR",
    donors: 42,
    isApproved: true,
    followers: 12,
    following: 3,
    whyPublicGood: "Supporting public goods through NFT art",
    teamMembers: "Chef Artists Collective",
    githubRepos: "None provided",
    smartContracts: "yearofthechef.near",
    overview: [
      "Limited edition NFT collection featuring hand-drawn chef designs",
      "Portion of sales automatically redistributed to public goods",
      "Supporting the intersection of art and public goods funding"
    ]
  },
  {
    id: "3",
    title: "PotLock",
    handle: "@potlock.near",
    description: "PotLock is bringing funding to the table. First public goods funding platform to...",
    image: "/assets/projects/nft3.png",
    tags: ["Health"],
    amount: 624.48,
    currency: "NEAR",
    donors: 156,
    isApproved: true,
    followers: 89,
    following: 24,
    whyPublicGood: "Platform enabling public goods funding",
    teamMembers: "PotLock Core Team",
    githubRepos: "github.com/PotLock",
    smartContracts: "potlock.near",
    overview: [
      "First public goods funding platform on NEAR",
      "Enabling transparent and efficient distribution of funds",
      "Building infrastructure for sustainable public goods funding"
    ]
  }
];
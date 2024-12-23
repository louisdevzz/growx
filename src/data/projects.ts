export interface Project {
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
    title: "Food Bank Wallet",
    handle: "@v1.foodbank.near",
    description: "Redistributed all funds to approved public goods on Potlock registry. Used by YEAR of CHEF for auto-redistribution of royalties",
    image: "/images/food-bank-banner.png",
    tags: ["Public Good"],
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
    title: "Support Plastic Free Oceans",
    description: "Support this project to have 90% of the floating ocean plastic removed by 2040...",
    image: "/images/plastic-free.png",
    tags: ["Climate", "Social Impact", "NonProfit", "Public Good"],
    amount: 0.20,
    currency: "NEAR",
    raised: true
  }
];
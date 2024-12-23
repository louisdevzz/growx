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
    image: "https://ipfs.near.social/ipfs/bafkreie3uy6ihgj37ctnpvqvm5svfmlfeatuvzbzxmu5vtn35spv6x7s4u",
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
    title: "YEAR OF THE CHEF",
    handle: "yearofthechef",
    description: "🐉 The free mint of 2024 hand-drawn dragon-chef NFTs for public goods supporters...",
    image: "https://ipfs.near.social/ipfs/bafkreihmhep3svtsrihtyrgozms2a57idj7qlfsexifzm3wfwxbzwir6w4",
    tags: ["Public Good", "NFT"],
    amount: 457.26,
    currency: "NEAR",
    raised: true,
    donors: 20,
    followers: 10,
    following: 2,
  },
  {
    title: "PotLock",
    handle: "potlock",
    description: "PotLock is bringing funding to the table. First public goods funding platform bu...",
    image: "https://ipfs.near.social/ipfs/bafkreianlsqm4fvjk57uzhodrtzwaqg7gbw2kvgq37sqs5cre343zcvdce",
    tags: ["Public Good", "Platform"],
    amount: 824.48,
    currency: "NEAR",
    raised: true,
    donors: 30,
    followers: 15,
    following: 3,
  }
];
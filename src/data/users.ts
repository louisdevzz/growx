export interface User {
  name: string;
  bio: string;
  address: string;
  coverImage: string;
  profileImage: string;
  socialLinks: {
    type: string;
    url: string;
  }[];
  walletAddress: string;
  donations: {
    amount: number;
    tokenAmount: number;
  };
  rank?: number; // Optional vì sẽ được tính toán dựa trên amount
}

export const users: User[] = [
  {
    name: "nearbigbrain",
    bio: "Lead blockchain developer and early crypto adopter. Passionate about decentralized finance and web3 technologies.",
    address: "789 DeFi Lane, Crypto Hub",
    coverImage: "/assets/covers/cover3.jpg",
    profileImage: "/assets/investors/avt.jpg",
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/nearbigbrain" },
      { type: "github", url: "https://github.com/nearbigbrain" }
    ],
    walletAddress: "0x9012...3456",
    donations: {
      amount: 3744.00,
      tokenAmount: 731.25
    }
  },
  {
    name: "Rhyme Taylor",
    bio: "Helping creatives build sustainable projects in the web3 space. Focus on community-driven initiatives.",
    address: "321 Innovation Street, Tech Valley",
    coverImage: "/assets/covers/cover4.jpg",
    profileImage: "/assets/investors/avt.jpg",
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/rhymetaylor" },
      { type: "telegram", url: "https://t.me/rhymetaylor" }
    ],
    walletAddress: "0x3456...7890",
    donations: {
      amount: 2033.79,
      tokenAmount: 397.23
    }
  },
  {
    name: "Illia",
    bio: "Bringing 1B users to web3. Focused on creating accessible blockchain solutions for mainstream adoption.",
    address: "654 Blockchain Road, Crypto City",
    coverImage: "/assets/covers/cover5.jpg",
    profileImage: "/assets/investors/avt.jpg",
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/illia" },
      { type: "website", url: "https://illia.dev" }
    ],
    walletAddress: "0x7890...1234",
    donations: {
      amount: 1747.20,
      tokenAmount: 341.25
    }
  },
  {
    name: "Alice Web3",
    bio: "Web3 educator and community builder. Supporting projects that bridge traditional finance with DeFi.",
    address: "123 Crypto Street, Digital City",
    coverImage: "/assets/covers/cover1.jpg",
    profileImage: "/assets/investors/avt.jpg",
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/aliceweb3" },
      { type: "github", url: "https://github.com/aliceweb3" }
    ],
    walletAddress: "0x1234...5678",
    donations: {
      amount: 1500.50,
      tokenAmount: 293.45
    }
  },
  {
    name: "CryptoBuilder",
    bio: "Building the future of decentralized applications. Focused on scalability and user experience.",
    address: "456 DeFi Avenue, Crypto Valley",
    coverImage: "/assets/covers/cover2.jpg",
    profileImage: "/assets/investors/avt.jpg",
    socialLinks: [
      { type: "twitter", url: "https://twitter.com/cryptobuilder" },
      { type: "telegram", url: "https://t.me/cryptobuilder" }
    ],
    walletAddress: "0x5678...9012",
    donations: {
      amount: 1250.75,
      tokenAmount: 244.68
    }
  }
];

// Helper function để lấy danh sách top donors
export const getTopDonors = (limit: number = 3) => {
  return [...users]
    .sort((a, b) => b.donations.amount - a.donations.amount)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }))
    .slice(0, limit);
};

// Helper function để lấy tất cả donors đã được sắp xếp
export const getAllDonors = () => {
  return [...users]
    .sort((a, b) => b.donations.amount - a.donations.amount)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
};

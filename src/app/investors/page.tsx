import Header from '@/components/Header'
import DonorCard from '@/components/DonorCard'
import DonorList from '@/components/DonorList'
import type { Donor } from '@/components/DonorList'

const topDonors = [
  {
    rank: 2,
    name: "Rhyme Taylor",
    amount: 2033.79,
    imageUrl: "/assets/investors/avt.jpg",
    description: "Helping creatives build...",
    tokenAmount: 397.23
  },
  {
    rank: 1,
    name: "nearbigbrain",
    amount: 3744.00,
    imageUrl: "/assets/investors/avt.jpg",
    description: "",
    tokenAmount: 731.25
  },
  {
    rank: 3,
    name: "Illia",
    amount: 1747.20,
    imageUrl: "/assets/investors/avt.jpg",
    description: "Bringing 1B users to...",
    tokenAmount: 341.25
  }
]

const allDonors: Donor[] = [
  {
    rank: 1,
    name: "nearbigbrain",
    amount: 3744.00,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 731.25
  },
  {
    rank: 2,
    name: "Rhyme Taylor",
    amount: 2033.79,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 397.23
  },
  {
    rank: 3,
    name: "Illia",
    amount: 1747.20,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 341.25
  },
  {
    rank: 4,
    name: "Alice Web3",
    amount: 1500.50,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 293.45
  },
  {
    rank: 5,
    name: "CryptoBuilder",
    amount: 1250.75,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 244.68
  },
  {
    rank: 6,
    name: "DevDAO",
    amount: 1100.25,
    imageUrl: "/assets/investors/avt.jpg",
    tokenAmount: 215.34
  }
]

export default function DonorsPage() {
  return (
    <div className="container min-h-screen">
      <Header />
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Investors leaderboard</h1>
        
        {/* Top Donors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topDonors.map((donor) => (
            <DonorCard
              key={donor.rank}
              name={donor.name}
              amount={donor.amount}
              imageUrl={donor.imageUrl}
            />
          ))}
        </div>

        {/* Time Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">LEADERBOARD</span>
            <span className="text-primary">1129</span>
          </div>
          <div className="flex gap-2">
            {['All Time', '1Y', '1M', '1W', '24H'].map((period) => (
              <button
                key={period}
                className="px-4 py-2 rounded-full hover:bg-gray-100 text-sm"
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Donors List */}
        <div className="bg-white rounded-lg shadow-sm">
          <DonorList donors={allDonors} />
        </div>
      </div>
    </div>
  )
}

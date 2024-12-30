import Header from '@/components/Header'
import DonorCard from '@/components/DonorCard'
import Link from 'next/link'
import { getTopDonors, getAllDonors } from '@/data/users'

export default function DonorsPage() {
  const topDonors = getTopDonors(3) // Lấy top 3 donors
  const allDonors = getAllDonors() // Lấy tất cả donors đã sắp xếp

  return (
    <div className="container min-h-screen">
      <Header />
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Investors leaderboard</h1>
        
        {/* Top Donors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topDonors.map((donor) => (
            <Link 
              href={`/users/${encodeURIComponent(donor.name)}`} 
              key={donor.rank}
            >
              <DonorCard
                name={donor.name}
                amount={donor.donations.amount}
                imageUrl={donor.profileImage}
              />
            </Link>
          ))}
        </div>

        {/* Time Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">LEADERBOARD</span>
            <span className="text-primary">{allDonors.length}</span>
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
          <div className="divide-y">
            {allDonors.map((donor) => (
              <Link 
                href={`/users/${encodeURIComponent(donor.name)}`}
                key={donor.rank}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-8">#{donor.rank}</span>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={donor.profileImage} 
                      alt={donor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{donor.name}</h3>
                    <p className="text-sm text-gray-500">{donor.bio.substring(0, 60)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${donor.donations.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{donor.donations.tokenAmount} tokens</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

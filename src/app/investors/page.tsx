import Header from '@/components/Header';
import TopDonorsCarousel from '@/components/TopDonorsCarousel';
import Link from 'next/link';
import { getTopDonors, getAllDonors } from '@/data/users';

export default function DonorsPage() {
  const topDonors = getTopDonors(3) || [];
  const allDonors = getAllDonors() || [];

  return (
    <div className="container min-h-screen">
      <Header />
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Investors Leaderboard</h1>

        {/* Top Donors Carousel */}
        <div className="mb-8 ">
          <TopDonorsCarousel topDonors={topDonors} />
        </div>

        {/* Donors List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {allDonors.map((donor) => (
              <Link
                href={`/users/${encodeURIComponent(donor.name)}`}
                key={donor.rank}
                className="flex items-center shadow-md justify-between p-4 hover:shadow-lg hover:bg-gray-50 transition-all md:active:bg-gray-100 transition-colors md:active:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-8">#{donor.rank}</span>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={donor.profileImage || '/default-avatar.png'}
                      alt={donor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{donor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {donor.bio?.substring(0, 60)}...
                    </p>
                  </div>
                </div>
                <div className="text-right text-gray-900">
                  <p className="font-medium text-gray-500">${donor.donations.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {donor.donations.tokenAmount} tokens
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

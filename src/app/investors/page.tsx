"use client"
import Header from '@/components/Header'
import DonorCard from '@/components/DonorCard'
import Link from 'next/link'
import { getTopDonors, getAllDonors } from '@/data/users'
import { useEffect, useCallback, useState, useMemo } from 'react'

export default function DonorsPage() {
  const [investors,setInvestors] = useState<any[]>([])
  
  const fetchInvestors = useCallback(async () => {
    try {
      const response = await fetch('/api/investors');
      const data = await response.json();
      
      // Filter unique investors by address, combine donations, and only include those with donations > 0
      const uniqueInvestors = Object.values(
        data.data.reduce((acc: any, investor: any) => {
          if (!acc[investor.address]) {
            acc[investor.address] = { ...investor };
          } else {
            // Add up the donations for the same address
            acc[investor.address].amountDonated += investor.amountDonated;
          }
          return acc;
        }, {})
      ).filter((investor: any) => investor.amountDonated > 0); // Filter out investors with 0 donations

      setInvestors(uniqueInvestors);
    } catch(error) {
      console.log("error", error)
    }
  }, []);

  useEffect(() => {
    fetchInvestors();
  }, [fetchInvestors]);

  console.log("investors",investors)

  const topInvestors = useMemo(() => {
    return investors.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 3);
  }, [investors]);

  const getInitials = (name: string) => {
    return name.slice(2, 5).toUpperCase();
  }

  return (
    <div className="container min-h-screen">
      <Header />
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Investors leaderboard</h1>
        
        {/* Top Donors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topInvestors.map((investor,index) => (
            <Link 
              href={`/users/${investor.address}`} 
              key={index}
            >
              <DonorCard
                name={investor.address}
                amount={investor.amountDonated}
                imageUrl={investor.profileImage}
              />
            </Link>
          ))}
        </div>

        {/* Time Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">LEADERBOARD</span>
            <span className="text-primary">{investors.length}</span>
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
            {investors.map((donor,index) => (
              <Link 
                href={`/users/${donor.address}`}
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                  <div className="w-10 h-10 border-2 border-gray-200 p-2 rounded-full overflow-hidden">
                    {donor.profileImage ? (
                      <img
                        src={donor.profileImage}
                        alt={donor.address}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white text-gray-600 text-sm font-medium">
                        {getInitials(donor.address)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{donor.address}</h3>
                    {/* <p className="text-sm text-gray-500">{donor.bio.substring(0, 60)}...</p> */}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${donor.amountDonated.toFixed(2)}</p>
                  {/* <p className="text-sm text-gray-500">{donor.donations.tokenAmount} tokens</p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

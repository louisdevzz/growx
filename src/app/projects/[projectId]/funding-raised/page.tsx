"use client"

import { fundingStats, fundingDonations } from '@/data/funding';
import { useState } from 'react';

const FundingRaisedTab = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = fundingDonations.filter(donation =>
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8">
      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Potlock Funding</h2>
        <div className="flex gap-8">
          <div>
            <span className="text-xl font-semibold">{fundingStats.totalDonated}Ⓝ</span>
            <span className="text-gray-600 ml-2">(~${(fundingStats.totalDonated * 191.14).toFixed(2)})</span>
            <div className="text-sm text-gray-600">Donated</div>
          </div>
          <div>
            <span className="text-xl font-semibold">{fundingStats.uniqueDonors}</span>
            <div className="text-sm text-gray-600">Unique donors</div>
          </div>
          <div>
            <span className="text-xl font-semibold">{fundingStats.totalMatched}Ⓝ</span>
            <div className="text-sm text-gray-600">Total Matched</div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="border rounded-lg">
        {/* Table Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h3 className="font-medium">Funding Source</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search funding"
                className="pl-8 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">Amount</span>
            <button className="flex items-center gap-1">
              Date <span>↓</span>
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredDonations.map(donation => (
            <div key={donation.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={donation.donorAvatar}
                  alt={donation.donorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{donation.donorName}</div>
                  <div className="text-sm text-gray-600">{donation.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1">
                  <span>Ⓝ</span>
                  <span>{donation.amount}</span>
                </div>
                <div className="text-sm text-gray-600 w-24 text-right">
                  {donation.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FundingRaisedTab; 
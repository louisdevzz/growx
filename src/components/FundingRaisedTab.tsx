"use client"

import { fundingStats, fundingDonations } from '@/data/funding';
import { useState } from 'react';
import { ProjectProps } from '@/types/project';

const getInitials = (name: string) => {
  return name
    .split('.')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const FundingRaisedTab = ({project}: {project: ProjectProps}) => {
  if (!project) {
    return <div>Project not found</div>;
  }

  const [searchTerm, setSearchTerm] = useState<string|null>(null);

  const filteredDonations = fundingDonations.filter(donation =>
    donation.donorName.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <div className="py-8 sm:py-8">
      {/* Stats Section */}
      <div className="mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{project.name} Funding</h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div>
            <span className="text-lg sm:text-xl font-semibold">{fundingStats.totalDonated}</span>
            <span className="text-gray-600 ml-2 text-sm sm:text-base">(~${(fundingStats.totalDonated * 191.14).toFixed(2)})</span>
            <div className="text-xs sm:text-sm text-gray-600">Donated</div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-semibold">{fundingStats.uniqueDonors}</span>
            <div className="text-xs sm:text-sm text-gray-600">Unique donors</div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="border rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-2 items-center p-3 sm:p-4 border-b gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium whitespace-nowrap">Donors</h3>
          
            <div className="relative">
              <input
                type="text"
                placeholder="Search donors"
                className="w-full pl-8 pr-2 py-1 sm:py-2 border rounded-lg text-sm"
                value={searchTerm || ''}
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
          <div className="text-right font-medium">Amount</div>

        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredDonations.map(donation => (
            <div key={donation.id} className="grid grid-cols-2 items-center p-3 sm:p-4 gap-4">
              <div className="flex items-center gap-2 sm:gap-3">

                <div>
                  <div className="font-medium text-sm sm:text-base">{donation.donorName}</div>
                  
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xs sm:text-sm">{donation.amount}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

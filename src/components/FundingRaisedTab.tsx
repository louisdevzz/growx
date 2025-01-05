"use client"

import { useState, useEffect, useCallback } from 'react';
import { ProjectProps } from '@/types/project';
import { PROJECT_CONTRACT_ABI,PROJECT_CONTRACT_ADDRESS } from '@/lib/ABI';

// Add helper function to truncate addresses
const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface DonorInfo {
  donor: string;
  amount: string;
}

export const FundingRaisedTab = (
  {project, investorsInOutRounds, fundsRaisedOutRound, ethPrice, address}: 
  {project: ProjectProps, investorsInOutRounds: string[], fundsRaisedOutRound: string, ethPrice: number, address: `0x${string}`}
) => {
  if (!project) {
    return <div>Project not found</div>;
  }
  const [donorInfos, setDonorInfos] = useState<DonorInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const uniqueInvestors = Array.from(new Set(investorsInOutRounds));
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filteredDonors = donorInfos.filter(info =>
    info.donor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchFundsInRoundOfInvestor = async (address: `0x${string}`, projectId: string) => {
    try {
      const response = await fetch(`https://scanv2-testnet.ancient8.gg/api/v2/smart-contracts/${PROJECT_CONTRACT_ADDRESS}/query-read-method`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "args": [
            address,
            projectId
          ],
          "method_id": "29b897eb",
          "contract_type": "regular"
        }),
      })

      const data = await response.json();
      return data.result.output[0].value;
    } catch (error) {
      console.error("Error fetching funds:", error);
      return "0";
    }
  }

  const getDonorInfos = useCallback(async () => {
    const infos: DonorInfo[] = [];
    for (const investor of uniqueInvestors) {
      const amount = await fetchFundsInRoundOfInvestor(investor as `0x${string}`, project.projectId || "");
      infos.push({
        donor: investor,
        amount: amount
      });
    }
    setDonorInfos(infos);
  },[uniqueInvestors, project.projectId])

  useEffect(() => { 
    getDonorInfos()
  },[getDonorInfos])

  return (
    <div className="py-4 md:py-6 px-2 md:px-4">
      {/* Stats Section */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{project.name} Funding</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-semibold">
                {(Number(fundsRaisedOutRound)/10**18).toFixed(4)}
              </span>
              <span className="text-sm md:text-base text-gray-600">
                (~${((Number(fundsRaisedOutRound)/10**18) * ethPrice).toFixed(2)})
              </span>
            </div>
            <div className="text-sm text-gray-600">Donated</div>
          </div>
          <div>
            <span className="text-lg md:text-xl font-semibold">{uniqueInvestors.length}</span>
            <div className="text-sm text-gray-600">Unique donors</div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Table Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Donors</h3>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search donors"
                className="w-full pl-8 pr-3 py-1.5 border rounded-lg text-sm"
                value={searchTerm}
                onChange={handleSearch}
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
          <div className="hidden sm:block">
            <span className="font-medium">Amount</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredDonors.map((donorInfo, index) => (
            <div key={index} className="flex items-center justify-between p-3">
              <div className="flex-1">
                <div className="font-medium text-sm">{truncateAddress(donorInfo.donor)}</div>
              </div>
              <div className="text-right ml-3">
                <span className="text-sm">{(Number(donorInfo.amount) / 10**18).toFixed(4)} ETH</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
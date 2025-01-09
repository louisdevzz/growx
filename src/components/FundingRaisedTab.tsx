"use client"

import { useState, useEffect, useCallback } from 'react';
import { ProjectProps } from '@/types/project';
import { PROJECT_CONTRACT_ABI,PROJECT_CONTRACT_ADDRESS } from '@/lib/ABI';

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
  const [searchTerm, setSearchTerm] = useState<string|null>(null);

  const uniqueInvestors = Array.from(new Set(investorsInOutRounds));
  
  const filteredDonors = donorInfos.filter(info =>
    info.donor.toLowerCase().includes(searchTerm?.toLowerCase() || '')
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
      // console.log("data",data)
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
  },[])

  useEffect(() => { 
    getDonorInfos()
  },[getDonorInfos])




  return (
    <div className="py-8">
      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">{project.name} Funding</h2>
        <div className="flex gap-8">
          <div>
            <span className="text-xl font-semibold">{Number(fundsRaisedOutRound)/10**18}</span>
            <span className="text-gray-600 ml-2">(~${((Number(fundsRaisedOutRound)/10**18) * ethPrice).toFixed(4)})</span>
            <div className="text-sm text-gray-600">Donated</div>
          </div>
          <div>
            <span className="text-xl font-semibold">{uniqueInvestors.length}</span>
            <div className="text-sm text-gray-600">Unique donors</div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="flex flex-col border rounded-lg">
        {/* Table Header */}
        <div className="flex p-4 border-b ">
          <div className="flex flex-row items-center gap-4 w-full ">
            <h3 className="font-medium">Donors</h3>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search donors"
              className="flex flex-initial w-full  pl-8  py-2 border rounded-lg"
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
          
          <div className="flex flex-initial items-end max-w-[100px]">
            <span className="font-medium w-full text-right">Amount</span>
            {/* <button className="flex items-center gap-1 w-24 justify-end">
              Date <span>↓</span>
            </button> */}
          </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredDonors.map((donorInfo, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="font-medium">{donorInfo.donor
                                  ? `${donorInfo.donor.slice(0, 5)}...${donorInfo.donor.slice(-6)}`
                                  : "None provided"
                  
                  }</div>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-30 text-right">
                  <span>{Number(donorInfo.amount) / 10**18} ETH</span>
                </div>
                {/* <div className="text-sm text-gray-600 w-24 text-right">
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
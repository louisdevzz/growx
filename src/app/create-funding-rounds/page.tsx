'use client'
import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { ROUND_MANAGEMENT_CONTRACT, ROUND_MANAGEMENT_CONTRACT_ABI } from '@/lib/ABI';
import { NextPage } from 'next';

const CreateFundingRound: NextPage = () => {

  const { address } = useAccount()
  const [roundName, setRoundName] = useState<string|null>(null);
  const [roundDescription, setRoundDescription] = useState<string|null>(null);
  const [roundCategory, setRoundCategory] = useState<string|null>(null);
  const [roundChain, setRoundChain] = useState<string|null>(null);
  const [startDate, setStartDate] = useState<string|null>(null);
  const [endDate, setEndDate] = useState<string|null>(null);
  const [addressReceived, setAddressReceived] = useState<string|null>(null);
  const router = useRouter();
  const { writeContractAsync } = useWriteContract()
  const [duration, setDuration] = useState<number|null>(null);


  const { refetch: refetchRoundId } = useReadContract({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    functionName: 'getCurrentRoundId',
    args: [],
  })


  const uploadRound = async (roundId: string) => {
    // console.log(roundId)
    if (!roundName || !roundCategory || !roundDescription  || !startDate || !endDate) {
      // toast.error('Please fill in all required fields');
      return;
    }

    const startDateFormat = new Date(startDate).getTime()/1000;
    const endDateFormat = new Date(endDate).getTime()/1000;

    try {
      const response = await fetch('/api/rounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roundId: roundId,
          slug: roundName.toLowerCase().replace(/\s+/g, '-'),
          name: roundName,
          category: roundCategory,
          description: roundDescription,
          chain: roundChain,
          startDate: startDateFormat,
          endDate: endDateFormat,
          duration: endDateFormat - startDateFormat,
          ownerAddress: address,
          address: addressReceived,
          amountRaised: 0,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Funding round created successfully');
        router.push('/funding-rounds');
      } else {
        throw new Error(data.error || 'Failed to create funding round');
      }
    } catch (error) {
      console.error('Funding round creation error:', error);
      toast.error('Failed to create funding round');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roundName || !roundCategory || !roundDescription  || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const startDateFormat = new Date(startDate).getTime()/1000;
    const endDateFormat = new Date(endDate).getTime()/1000;
    const duration = endDateFormat - startDateFormat;
    setDuration(duration)

    const loadingToast = toast.loading('Creating funding round...');
    try {
      await writeContractAsync({
        address: ROUND_MANAGEMENT_CONTRACT,
        abi: ROUND_MANAGEMENT_CONTRACT_ABI,
        functionName: 'createRound',
        args: [roundName,roundDescription, [], BigInt(duration)]
      });
      toast.loading('Please wait creating funding round...', { duration: 2000,id: loadingToast });
    } catch (error) {
      toast.error('Failed to create funding round', { id: loadingToast });
    }
    
  };

  useWatchContractEvent({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    eventName: 'RoundCreated',
    args: roundName && duration ? [roundName, BigInt(duration)] : undefined,
    onLogs(logs) {
      console.log("logs",logs)
      refetchRoundId().then((result) => {
        //console.log("result",result)
        if (result.data) {
          uploadRound(result.data)
        }
      })
    }
  });

  return (
    <div className='min-h-screen bg-white container'>
      <Header />
      <main className="flex items-start justify-center p-6">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 bg-[#FDF7F3] rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-4">Create New Funding Round</h1>
            <p className="text-gray-600 text-lg">Set up a new funding round to match donations for qualified projects.</p>
          </div>

          <form onSubmit={handleSubmit} className="border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <label className="font-medium text-lg">Round details</label>
                <span className="text-red-500 text-xs">Required</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Round name</label>
                  <input
                    type="text"
                    placeholder="Enter round name"
                    onChange={(e) => setRoundName(e.target.value)}
                    value={roundName || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select category</label>
                  <div className="relative">
                    <select 
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 appearance-none"
                      onChange={(e) => setRoundCategory(e.target.value)}
                      value={roundCategory || ''}
                    >
                      <option value="">Choose category</option>
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="dao">DAO</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="gaming">Gaming</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Round description</label>
                  <textarea
                    placeholder="Describe your funding round"
                    onChange={(e) => setRoundDescription(e.target.value)}
                    value={roundDescription || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 h-32"
                  />
                </div>



                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start date</label>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate || ''}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End date</label>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate || ''}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium text-lg">Address receiving funds</label>
                <span className="text-gray-500 text-sm">Optional</span>
              </div>
              <div className="flex gap-4">
                <div className="relative w-1/3">
                  <select 
                    className="w-full p-3 border rounded-xl bg-gray-50 appearance-none"
                    onChange={(e) => setRoundChain(e.target.value)}
                    value={roundChain || ''}
                  >
                    <option value="">Add chain</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                    <option value="optimism">Optimism</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={addressReceived || ''}
                  onChange={(e) => setAddressReceived(e.target.value)}
                  className="w-2/3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-12">
              <Link 
                href="/funding-rounds"  
                className="px-6 py-3 border rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Create funding round
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreateFundingRound;
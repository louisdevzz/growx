"use client"

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useCallback, useEffect, useState, useRef } from 'react';
import { HomeTab } from '@/components/HomeTab';
import { FundingRoundTab } from '@/components/FundingRound';
import { FundingRaisedTab } from '@/components/FundingRaisedTab';
import { useAccount, useReadContract,useWriteContract } from "wagmi";
import Link from "next/link";
import { INVESTOR_MANAGEMENT_CONTRACT, INVESTOR_MANAGEMENT_CONTRACT_ABI, PROJECT_CONTRACT_ABI } from "@/lib/ABI";
import { PROJECT_CONTRACT_ADDRESS } from "@/lib/ABI";
import { formatEther } from "viem";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [project, setProject] = useState<any>(null);
  const startTime = useRef<number>(Date.now());
  const {address} = useAccount();
  const lastActivityTime = useRef<number>(Date.now());
  const [projectId, setProjectId] = useState<string|null>(null);
  const [showDonateModal, setShowDonateModal] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<string|null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const { writeContractAsync, isSuccess,data:txData,isPending } = useWriteContract()

  const {data: fundsRaisedOutRound, refetch: refetchFundsRaisedOutRound} = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'getFundsRaisedOutRound',
    args: [projectId||""],
    query: {
      enabled: !!projectId
    }
  })

  const fetchProject = useCallback(async () => {
    const response = await fetch(`/api/projects/findBySlug`, {
      method: 'POST',
      body: JSON.stringify({ slug: slug })
    });
    const project = await response.json();
    //console.log(project);
    setProject(project);
    setProjectId(project.projectId);
  }, [slug]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    const updateLastActivity = () => {
      lastActivityTime.current = Date.now();
    };

    const sendAnalyticsData = () => {
      if (project && address) {
        const timeSpent = Math.floor((lastActivityTime.current - startTime.current) / 1000);
        
        const analyticsData = {
          projectId: project._id,
          projectName: project.name,
          timeSpent,
          address: address,
          startTime: startTime.current,
          endTime: lastActivityTime.current,
          timestamp: Date.now(),
          amount: project.amount || 0,
          category: project.category || 'Unknown',
        };

        // Sử dụng sendBeacon để đảm bảo dữ liệu được gửi trước khi trang đóng
        if (timeSpent > 1) {
          navigator.sendBeacon('/api/analytics', JSON.stringify(analyticsData));
        }
      }
    };

    window.addEventListener('mousemove', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);
    window.addEventListener('scroll', updateLastActivity);
    window.addEventListener('click', updateLastActivity);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (project && address) {
        sendAnalyticsData();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      // Gửi analytics khi component unmount
      if (project && address) {
        sendAnalyticsData();
      }
      
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mousemove', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
      window.removeEventListener('scroll', updateLastActivity);
      window.removeEventListener('click', updateLastActivity);
    };
  }, [project, address, slug]);

  const fetchEthPrice = useCallback(async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error('Error fetching ETH price:', error);
    }
  }, []);

  useEffect(() => {
    // Fetch initial price
    fetchEthPrice();
    
    // Update price every 60 seconds
    const interval = setInterval(fetchEthPrice, 60000);
    
    return () => clearInterval(interval);
  }, [fetchEthPrice]);

  if (!project) {
    return <LoadingSpinner />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pots':
        return <FundingRoundTab />;
      case 'funding':
        return <FundingRaisedTab project={project} />;
      case 'home':
      default:
        return <HomeTab project={project}/>;
    }
  };

  const handleConfirmDonation = () => {
    if(donationAmount && Number(donationAmount) > 0) {
      setShowConfirmModal(true);
      setShowDonateModal(false);
    }else{
      toast.error("Please enter a valid donation amount");
    }
  }

  const handleDonate = async () => {
    if(donationAmount && Number(donationAmount) > 0) {
      const amount = Number(donationAmount) * 10**18;
      await writeContractAsync({
        address: INVESTOR_MANAGEMENT_CONTRACT,
        abi: INVESTOR_MANAGEMENT_CONTRACT_ABI,
        functionName: 'fundProjectOutRound',
        args: [projectId||""],
        value: BigInt(amount)
      });
      toast.success("Donation successful");
      setShowConfirmModal(false);
      refetchFundsRaisedOutRound();
    }
  }

  // console.log("donationAmount",donationAmount*10**18)

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
            
            {/* Banner Image Container - Updated height and padding */}
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden mt-4 sm:mt-5 rounded-lg shadow-lg">
              <img 
                src={project.coverImage} 
                alt={project.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Profile Section - Added container and responsive padding */}
            <div className="container md:mx-auto max-w-[1440px] ">
              <div className="sm:px-8">
                {/* Avatar and Stats - Updated sizes */}
                <div className="flex items-start gap-3 sm:gap-4 -mt-12 sm:-mt-14 relative z-10">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl">
                    <img 
                      src={project.profileImage} 
                      alt={project.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-12 sm:mt-16 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium shadow">
                      APPROVED
                    </span>
                  </div>
                </div>

                {/* Project Title and Info - Made responsive */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-1">{project.name}</h1>
                    <Link 
                      target="_blank" 
                      href={`https://scanv2-testnet.ancient8.gg/address/${project.ownerAddress}`} 
                      className="text-gray-600 text-sm hover:underline hover:text-gray-900 break-all"
                    >
                      @{project.ownerAddress}
                    </Link>
                    <div className="text-gray-600 text-sm">{project.category}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 w-full sm:w-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-semibold">
                        {formatEther(BigInt(fundsRaisedOutRound||0))}
                      </span>
                      <span className="text-gray-600">ETH</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Raised from {project.donors} donors
                    </p>
                    <button 
                      className="mt-2 w-full bg-red-500 text-white rounded-md px-4 py-2 text-sm font-semibold"
                      onClick={() => setShowDonateModal(true)}
                    >
                      Donate
                    </button>
                  </div>
                </div>

                {/* Navigation - Made scrollable on mobile */}
                <div className="mt-6 sm:mt-8 border-b border-gray-200 overflow-x-auto">
                  <nav className="flex gap-6 sm:gap-8 min-w-max pb-1">
                    <button 
                      onClick={() => setActiveTab('home')}
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'home' 
                          ? 'border-b-2 border-gray-900' 
                          : 'text-gray-600'
                      }`}
                    >
                      Home
                    </button>
                    {/* <button 
                      onClick={() => setActiveTab('social')}
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'social' 
                          ? 'border-b-2 border-gray-900' 
                          : 'text-gray-600'
                      }`}
                    >
                      Social Feed
                    </button> */}
                    <button 
                      onClick={() => setActiveTab('pots')}
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'pots' 
                          ? 'border-b-2 border-gray-900' 
                          : 'text-gray-600'
                      }`}
                    >
                      Funding Rounds
                    </button>
                    <button 
                      onClick={() => setActiveTab('funding')}
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'funding' 
                          ? 'border-b-2 border-gray-900' 
                          : 'text-gray-600'
                      }`}
                    >
                      Funding Raised
                    </button>
                  </nav>
                </div>

                {/* Tab content */}
                <div className="mt-4 sm:mt-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>

          {/* Modals - Updated for better mobile experience */}
          {showDonateModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Donate</h2>
                  <button 
                    onClick={() => setShowDonateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="mb-2">How do you want to donate?</p>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg">
                        Direct donation
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2">Amount</p>
                    <div className="flex border rounded-lg overflow-hidden">
                      <input 
                        type="number" 
                        className="flex-1 p-2 outline-none 
                          [&::-webkit-outer-spin-button]:appearance-none 
                          [&::-webkit-inner-spin-button]:appearance-none 
                          [&:-webkit-autofill]:bg-white
                          [-moz-appearance:textfield]"
                        placeholder="0"
                        value={donationAmount || ''}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                      <span className="bg-gray-50 px-3 py-2 text-gray-600 flex items-center">ETH</span>
                    </div>
                  </div>

                  <button 
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={handleConfirmDonation}
                  >
                    Proceed to donate
                  </button>
                </div>
              </div>
            </div>
          )}

          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setShowDonateModal(true);
                    }}
                  >
                    ←
                  </button>
                  <h2 className="text-xl font-semibold">Confirm donation</h2>
                  <button 
                    onClick={() => setShowConfirmModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Total amount</p>
                    <p className="text-lg font-semibold">{donationAmount} ETH</p>
                    <p className="text-gray-600">≈ ${(donationAmount ? (Number(donationAmount) * ethPrice) : 0).toFixed(5)} USD</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-2">Breakdown</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Protocol fee (2.5%)</span>
                        <span>${((donationAmount ? (Number(donationAmount) * ethPrice) : 0) * 0.025).toFixed(5)} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Project allocation (97.5%)</span>
                        <span>${((donationAmount ? (Number(donationAmount) * ethPrice) : 0) * 0.975).toFixed(5)} USD</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    onClick={handleDonate}
                  >
                    Confirm donation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
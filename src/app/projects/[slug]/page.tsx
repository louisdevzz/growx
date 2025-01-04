"use client"

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useCallback, useEffect, useState, useRef } from 'react';
import { HomeTab } from '@/components/HomeTab';
import { FundingRoundTab } from '@/components/FundingRound';
import { FundingRaisedTab } from '@/components/FundingRaisedTab';
import { useAccount, useReadContract,useWatchContractEvent,useWriteContract } from "wagmi";
import Link from "next/link";
import { PROJECT_CONTRACT_ADDRESS,PROJECT_CONTRACT_ABI } from "@/lib/ABI";
import { formatEther } from "viem";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FaTwitter, FaGithub, FaDiscord, FaTelegram, FaMedium, FaGlobe } from "react-icons/fa";

const getSocialIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'twitter':
      return <FaTwitter className="w-6 h-6" />;
    case 'github':
      return <FaGithub className="w-6 h-6" />;
    case 'discord':
      return <FaDiscord className="w-6 h-6" />;
    case 'telegram':
      return <FaTelegram className="w-6 h-6" />;
    case 'medium':
      return <FaMedium className="w-6 h-6" />;
    default:
      return <FaGlobe className="w-6 h-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'defi':
      return 'bg-blue-50 text-blue-600 border border-blue-200';
    case 'nft':
      return 'bg-purple-50 text-purple-600 border border-purple-200';
    case 'gaming':
      return 'bg-green-50 text-green-600 border border-green-200';
    case 'infrastructure':
      return 'bg-orange-50 text-orange-600 border border-orange-200';
    case 'dao':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
    case 'web3':
      return 'bg-indigo-50 text-indigo-600 border border-indigo-200';
    default:
      return 'bg-gray-50 text-gray-600 border border-gray-200';
  }
};

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
  const { writeContractAsync } = useWriteContract()

  const {data: fundsRaisedOutRound, refetch: refetchFundsRaisedOutRound} = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'getFundsOutRound',
    args: [projectId||""],
    query: {
      enabled: !!projectId
    }
  })

  const {data: investorsInOutRound} = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'getInvestorsOutRound',
    args: [projectId||""],
    query: {
      enabled: !!projectId
    }
  })

  useWatchContractEvent({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    eventName: 'Funded',
    args: projectId && address && donationAmount ? [projectId, address, BigInt(Number(donationAmount)*10**18)] : undefined,
    onLogs(logs) {
      console.log("logs",logs)
      clearDonation()
      refetchFundsRaisedOutRound()
    }
  });

  const fetchProject = useCallback(async () => {
    const response = await fetch(`/api/projects/findBySlug`, {
      method: 'POST',
      body: JSON.stringify({ slug: slug })
    });
    const project = await response.json();
    // console.log(project);
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
        return <FundingRaisedTab 
          project={project} 
          investorsInOutRounds={investorsInOutRound as string[] || []} 
          fundsRaisedOutRound={fundsRaisedOutRound?.toString() || "0"} 
          ethPrice={ethPrice}
          address={address as `0x${string}`}
        />;
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

  const clearDonation = () => {
    setDonationAmount(null);
    setShowConfirmModal(false);
    toast.success("Donation successful");
  }

  const saveInvestor = async () => {
    await fetch('/api/investors', {
      method: 'POST',
      body: JSON.stringify({ address, amountDonated: Number(donationAmount)*ethPrice })
    });
  }

  const handleDonate = async () => {
    if(donationAmount && Number(donationAmount) > 0) {
      const amount = Number(donationAmount) * 10**18;
      await writeContractAsync({
        address: PROJECT_CONTRACT_ADDRESS,
        abi: PROJECT_CONTRACT_ABI,
        functionName: 'fundProjectOutRound',
        args: [projectId||""],
        value: BigInt(amount)
      });
      await saveInvestor();
      setShowConfirmModal(false);
      toast.loading("Please wait for the donation to be successful", { duration: 2000 });
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="">
          <div className="w-full">
            <Header />
            
            {/* Banner Image Container */}
            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden mt-5">
              <img 
                src={project.coverImage} 
                alt={project.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Profile Section */}
            <div className="max-w-[1440px] mx-auto">
              <div className="px-4 sm:px-8">
                {/* Avatar and Stats */}
                <div className="flex items-start gap-4 -mt-14 relative z-10">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                    <img 
                      src={project.profileImage} 
                      alt={project.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-16 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      ACTIVE
                    </span>
                    {/* <span className="text-sm text-gray-600">{project.followers} Followers</span>
                    <span className="text-sm text-gray-600">{project.following} Following</span> */}
                  </div>
                </div>

                {/* Project Title and Info */}
                <div className="mt-4 flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold mb-1">{project.name}</h1>
                    <Link target="_blank" href={`https://scanv2-testnet.ancient8.gg/address/${project.ownerAddress}`} className="text-gray-600 text-sm hover:underline hover:text-gray-900">@{project.ownerAddress}</Link>
                    <div className={`inline-flex items-center w-fit px-3 py-1 rounded-lg text-base font-medium uppercase ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </div>
                    <div className="flex items-center gap-4 mt-10">
                      {project.socialLinks.map((link: any, index: number) => (
                        <Link 
                          key={index} 
                          href={link.url} 
                          target="_blank" 
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          title={link.type}
                        >
                          {getSocialIcon(link.type)}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold">{formatEther(BigInt(fundsRaisedOutRound||0))}</span>
                      <span className="text-gray-600">ETH</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Raised from {investorsInOutRound?.length||0} donors
                    </p>
                    <button className="mt-2 w-full bg-red-500 text-white rounded-md px-4 py-2 text-sm font-semibold" onClick={() => setShowDonateModal(true)}>
                      Donate
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 border-b border-gray-200">
                  <nav className="flex gap-8">
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

                {/* Render tab content */}
                {renderTabContent()}
              </div>
            </div>
          </div>
          {/* Donate Modal */}
          {showDonateModal && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowDonateModal(false);
                }
              }}
            >
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
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

          {/* Confirm Modal */}
          {showConfirmModal && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowConfirmModal(false);
                }
              }}
            >
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
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
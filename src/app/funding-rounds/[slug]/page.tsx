'use client'

import Header from '@/components/Header'
import { useParams } from 'next/navigation'
import { featuredProjects } from '@/data/projects'
import ProjectsTab from '@/components/ProjectsTab'
import DonationsTab from '@/components/DonationsTab'
import { useEffect, useState, useCallback } from 'react'
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import { PROJECT_CONTRACT_ABI, PROJECT_CONTRACT_ADDRESS, ROUND_MANAGEMENT_CONTRACT, ROUND_MANAGEMENT_CONTRACT_ABI } from '@/lib/ABI'
import ProjectCard from '@/components/ProjectCard'
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton'


export default function FundingRoundDetail() {
  const { address,isConnected } = useAccount();
  const { slug } = useParams()
  const [round, setRound] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('projects')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [projects, setProjects] = useState<any>(null);
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string|null>(null);
  const [roundId, setRoundId] = useState<string|null>(null);
  const [projectsIsPendings, setProjectsIsPendings] = useState<any[]>([]);
  const [ownerAddresses, setOwnerAddresses] = useState<string[]>([]);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [projectsInRound, setProjectsInRound] = useState<any[]>([]);
  const [showDonateModal, setShowDonateModal] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const { writeContractAsync,error,isError } = useWriteContract()
  // console.log('slug',slug);



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

  const {data: totalFundsInRound} = useReadContract({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    functionName: 'getTotalFundsInRound',
    args: [roundId as `0x${string}`],
    query: {
      enabled: !!roundId
    }
  })
  
  const {data: totalInvestorsInRound} = useReadContract({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    functionName: 'getInvestorsInRound',
    args: [roundId as `0x${string}`],
    query: {
      enabled: !!roundId
    }
  })

  const {data: projectIdsInRound} = useReadContract({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    functionName: 'getProjectsInRound',
    args: [roundId as `0x${string}`],
    query: {
      enabled: !!roundId
    }
  })


  const {data: projectsIsPending} = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'getPendingProjects',
    args: [roundId as `0x${string}`],
    query: {
      enabled: !!roundId
    }
  })

  const {data: managerAddress} = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'manager',
    args: [],
  })

  // console.log('projectsIsPending',projectsIsPending)

  const fetchAddressOfProject = useCallback(async (projectId: string) => {
    // console.log(projectId)
    const response = await fetch('/api/projects/findByProjectId', {
      method: 'POST',
      body: JSON.stringify({ projectId: projectId })
    });
    const data = await response.json();
    // console.log(data)
    return data[0];
  }, [])

  const findProjectInRound = async () => {
    if(!projectIdsInRound) return;
    const projects = [];
    for(const projectId of projectIdsInRound) {
      const project = await fetchAddressOfProject(projectId)
      projects.push(project);
    }
    setProjectsInRound(projects);
  }

  useEffect(() => {
    findProjectInRound();
  }, [projectIdsInRound])

  const findOwnerAddressOfProject = async () => {
    if(!projectsIsPending) return;
    const addresses = [];
    const projects = [];
    for(const projectId of projectsIsPending) {
      const project = await fetchAddressOfProject(projectId)
      addresses.push(project.ownerAddress);
      projects.push(project);
    }
    setOwnerAddresses(addresses);
    setProjectsIsPendings(projects);
  }

  useEffect(() => {
    findOwnerAddressOfProject()
  }, [projectsIsPending])

  useEffect(() => {
    if(isError) {
      console.log(error.message)
    }
  }, [isError,error])

  const fetchRound = useCallback(async () => {
    try {findOwnerAddressOfProject
      setIsLoading(true);
      const response = await fetch(`/api/rounds/findBySlug`, {
        method: 'POST',
        body: JSON.stringify({ slug: slug })
      });
      const round = await response.json();
      // console.log("round",round)
      setRoundId(round.roundId)
      setRound(round);
    } catch (error) {
      console.error('Error fetching round:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchRound();
  }, [fetchRound]);

  const fetchProject = async () => {
    if (!address) return;
    
    try {
      setIsLoadingProject(true);
      const response = await fetch('/api/projects/findByAddress', {
        method: 'POST',
        body: JSON.stringify({ address: address })
      });
      const data = await response.json();
      // console.log(data)
      setProjects(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setIsLoadingProject(false);
    }
  };

  useEffect(() => {
    if (showModal && address) {
      fetchProject();
    }
  }, [showModal, address]);

  const handleAddProject = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    setShowModal(true);
  };

  const handleSelectProject = (projectId: string) => {
    setProjectId(projectId)
  }

  const handleAddProjectToRound = async () => {
    if (!projectId) {
      toast.error('Please select a project first');
      return;
    }
    // console.log(roundId,projectId)
    await writeContractAsync({
      address: PROJECT_CONTRACT_ADDRESS,
      abi: PROJECT_CONTRACT_ABI,
      functionName: 'addProjectToRound',
      args: [roundId||"",projectId||""],
      value: BigInt(100000000)
    });

    setShowModal(false)
    // console.log(projectId)
  }

  const handleApproveProject = async (projectId: string) => {
    try {
      await writeContractAsync({
        address: PROJECT_CONTRACT_ADDRESS,
        abi: PROJECT_CONTRACT_ABI,
        functionName: 'approveProject',
        args: [roundId || "", projectId],
      });
      toast.success('Project approved successfully');
      
      setTimeout(() => {
        handleApproveProjectInRound(projectId);;
      }, 5000);
    } catch (error) {
      toast.error('Failed to approve project');
      console.error(error);
    }
  };

  const handleApproveProjectInRound = async (projectId: string) => {
    await writeContractAsync({
      address: ROUND_MANAGEMENT_CONTRACT,
      abi: ROUND_MANAGEMENT_CONTRACT_ABI,
      functionName: 'addApprovedProject',
      args: [roundId || "", projectId],
    });
  }

  useWatchContractEvent({
    address: ROUND_MANAGEMENT_CONTRACT,
    abi: ROUND_MANAGEMENT_CONTRACT_ABI,
    eventName: 'ProjectAddedToRound',
    args: [roundId || "", projectId],
    onLogs: (logs) => {
      toast.success('Project added to round successfully');
      findOwnerAddressOfProject();
    }
  })

  return (
    <div className="container min-h-screen">
      <Header />
      {/* <ProgressBar /> */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Manager Section */}
          <div className="space-y-6">
          {managerAddress && managerAddress === address && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Round Manager Dashboard</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>You are the manager of this funding round.</p>
                      {projectsIsPending && projectsIsPending.length > 0 && (
                        <button 
                          onClick={() => setShowApproveModal(true)}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Review Pending Projects ({projectsIsPending.length})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {ownerAddresses.length > 0 && ownerAddresses.includes(address as `0x${string}`) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Alert icon */}
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Pending Project{ownerAddresses.length > 1 ? 's' : ''}
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      {ownerAddresses.length} project{ownerAddresses.length > 1 ? 's are' : ' is'} waiting for approval in this funding round.
                    </p>
                    {address && ownerAddresses.includes(address) && (
                      <p className="mt-1 font-medium">
                        Your project is among the pending submissions.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <h1 className="text-4xl font-bold">{round?.name}</h1>
                <p className="text-gray-600">{round?.description}</p>
              </>
            )}
            
            <div className="border-b">
              <div className="flex gap-8">
                <button 
                  className={`px-4 py-2 border-b-2 ${activeTab === 'projects' ? 'border-black font-medium' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </button>
                <button 
                  className={`px-4 py-2 border-b-2 ${activeTab === 'donations' ? 'border-black font-medium' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('donations')}
                >
                  Donations
                </button>
              </div>
            </div>

            {activeTab === 'projects' && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>
                {/* <ProjectsTab 
                  projects={projectsInRound} 
                  setShowDonateModal={setShowDonateModal} 
                  fundsRaisedInRound={Number(fundsRaisedInRound) || 0} 
                  investorsInRound={Number(investorsInRound) || 0} 
                  setProjectId={setProjectId}
                /> */}
                <div className="grid grid-cols-2 gap-4">
                  {isLoading ? (
                    <>
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                    </>
                  ) : (
                    projectsInRound.map((project, index) => (
                      <div className="w-[280px] sm:w-auto flex-shrink-0 sm:flex-shrink" key={project._id}>
                        <ProjectCard
                          {...project}
                          index={index+1}
                          href={`/projects/${project.slug}`}
                          inRound={true}
                          roundId={roundId}
                        />
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'donations' && <DonationsTab />}
          </div>

          {/* Right Column - Fund Info */}
          <div className="space-y-6">
            <div className="group bg-white rounded-lg p-6 shadow-md relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100">
              
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    ~${((Number(totalFundsInRound)/10**18)*ethPrice).toFixed(4) || 0} USD
                  </div>
                  <div className="text-gray-500">raised from {totalInvestorsInRound?.length || 0} donors</div>
                </div>
                {/* <div className="text-gray-500 font-medium">ETH</div> */}
              </div>
              
            </div>

            <button 
              onClick={handleAddProject}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Add my project to this round
            </button>
          </div>
        </div>
        
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
            <div className="bg-white rounded-lg p-6 md:max-w-lg w-full max-h-[80vh] flex flex-col">
              <h2 className="text-2xl font-bold mb-4">Add Your Project</h2>
              
              <div className="space-y-4 flex-1 overflow-y-auto">
                {!address ? (
                  <p className="text-red-500">Please connect your wallet first</p>
                ) : isLoadingProject ? (
                  <p>Loading your project...</p>
                ) : projects ? projects.map((project: any) => (
                    <div onClick={() => handleSelectProject(project.projectId)} className={`p-4 border-2 rounded-md hover:border-gray-400 transition-colors cursor-pointer ${projectId === project.projectId ? 'border-black' : ''}`} key={project._id}>
                      <h3 className="font-bold">{project.name}</h3>
                      <p className="text-gray-600">{project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}</p>
                    </div>
                )) : (
                  <p className="text-gray-600">No project found for your address</p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                {projects && (
                  <button
                    onClick={handleAddProjectToRound}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Add Project
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {showApproveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
            <div className="bg-white rounded-lg p-6 md:max-w-2xl w-full max-h-[80vh] flex flex-col">
              <h2 className="text-2xl font-bold mb-4">Pending Projects</h2>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {projectsIsPendings && projectsIsPendings.map((project: any, index: number) => (
                  <div key={project.projectId} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Project name: {project.name}</p>
                        <p className="text-sm text-gray-600">Owner: {project.ownerAddress}</p>
                      </div>
                      <button
                        onClick={() => handleApproveProject(project.projectId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 
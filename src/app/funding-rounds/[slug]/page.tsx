'use client'

import Header from '@/components/Header'
import { useParams } from 'next/navigation'
import { featuredProjects } from '@/data/projects'
import ProjectsTab from '@/components/ProjectsTab'
import DonationsTab from '@/components/DonationsTab'
import { useEffect, useState, useCallback } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import { ROUND_MANAGEMENT_CONTRACT, ROUND_MANAGEMENT_CONTRACT_ABI } from '@/lib/ABI'

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
  const { writeContractAsync,error,isError } = useWriteContract()
  // console.log('slug',slug);

  useEffect(() => {
    if(isError) {
      console.log(error.message)
    }
  }, [isError,error])

  const fetchRound = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/rounds/findBySlug`, {
        method: 'POST',
        body: JSON.stringify({ slug: slug })
      });
      const round = await response.json();
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
    console.log(roundId,projectId)
    await writeContractAsync({
      address: ROUND_MANAGEMENT_CONTRACT,
      abi: ROUND_MANAGEMENT_CONTRACT_ABI,
      functionName: 'addProjectToRound',
      args: [roundId||"",projectId||""],
      value: BigInt(100000000*10**18)
    });

    // setShowModal(false)
    console.log(projectId)
  }

  return (
    <div className="container min-h-screen">
      <Header />
      {/* <ProgressBar /> */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Left Column - Main Info */}
          <div className="space-y-6">
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
                <ProjectsTab projects={featuredProjects} />
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
                    ~${round?.amountRaised || 0}
                  </div>
                  <div className="text-gray-500">raised from {round?.donors || 0} donors</div>
                </div>
                <div className="text-gray-500 font-medium">ETH</div>
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
      </main>
    </div>
  )
} 
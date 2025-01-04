'use client'

import Header from '@/components/Header'
import { useParams } from 'next/navigation'
import { featuredProjects } from '@/data/projects'
import ProjectsTab from '@/components/ProjectsTab'
import DonationsTab from '@/components/DonationsTab'
import { useEffect, useState, useCallback } from 'react'

export default function FundingRoundDetail() {
  const { slug } = useParams()
  const [round, setRound] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('projects')
  const [isLoading, setIsLoading] = useState(true);

  const fetchRound = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/rounds/findBySlug`, {
        method: 'POST',
        body: JSON.stringify({ slug: slug })
      });
      const round = await response.json();
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

  return (
    <div className="container ">
      <Header />
      <div className="py-4 sm:py-6 lg:py-8">
        {/* Main Content Grid */}
        <div className=" gap-6 lg:gap-8 px-1">
          {/* Left Column - Main Info (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {isLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded w-3/4"></div>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">{round?.name}</h1>
                <p className="text-gray-600 text-sm sm:text-base">{round?.description}</p>
              </>
            )}
            
            {/* Tabs */}
            <div className="border-b mt-6">
              <div className="flex gap-4 sm:gap-8 overflow-x-auto">
                <button 
                  className={`px-3 sm:px-4 py-2 border-b-2 whitespace-nowrap text-sm sm:text-base
                    ${activeTab === 'projects' ? 'border-black font-medium' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </button>
                <button 
                  className={`px-3 sm:px-4 py-2 border-b-2 whitespace-nowrap text-sm sm:text-base
                    ${activeTab === 'donations' ? 'border-black font-medium' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('donations')}
                >
                  Donations
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects"
                    className="w-full px-4 py-2 border rounded-lg text-sm sm:text-base"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>
                <ProjectsTab projects={featuredProjects} />
              </div>
            )}

            {activeTab === 'donations' && <DonationsTab />}
          </div>

          {/* Right Column - Fund Info */}
          <div className=" py-4 space-y-4 sm:space-y-6">
            {/* Fund Stats Card */}
            <div className="group bg-white rounded-lg p-4 sm:p-6 shadow-md relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    ~${round?.amountRaised || 0}
                  </div>
                  <div className="text-gray-500 text-sm sm:text-base">raised from {round?.donors || 0} donors</div>
                </div>
                <div className="text-gray-500 font-medium text-sm sm:text-base">ETH</div>
              </div>
            </div>

            {/* Fund Button */}
            <button className="w-full bg-black text-white py-2 sm:py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium text-sm sm:text-base">
              Fund matching pool
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
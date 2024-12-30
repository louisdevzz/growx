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

  // console.log('slug',slug);

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

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium">
              Fund matching pool
            </button>
            
          </div>
        </div>
      </main>
    </div>
  )
} 
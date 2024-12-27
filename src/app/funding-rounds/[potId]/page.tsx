'use client'

import Header from '@/components/Header'
import { pots } from '@/data/pots'
import { notFound, useParams } from 'next/navigation'
import { featuredProjects } from '@/data/projects'
import ProjectsTab from './ProjectsTab'
import ProgressBar from './ProgressBar'
import DonationsTab from './DonationsTab'
import { useState } from 'react'



export default function PotDetailsPage() {
  const { potId } = useParams()
  const pot = pots.find(p => p.id === potId)
  if (!pot) {
    notFound()
  }

  const [activeTab, setActiveTab] = useState('projects')

  return (
    <>
      <Header />
      <ProgressBar />


      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Left Column - Main Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{pot.title}</h1>
            <p className="text-gray-600">{pot.description}</p>
            
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
                <button className="px-4 py-2 text-gray-500">Applications</button>
                <button className="px-4 py-2 text-gray-500">Sponsors</button>
                <button className="px-4 py-2 text-gray-500">Payouts</button>
                <button className="px-4 py-2 text-gray-500">Settings</button>
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
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"/>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    ~${pot.amount.toFixed(2)}
                  </div>
                  <div className="text-gray-500">raised from {pot.donorsCount} donors</div>
                </div>
                <div className="text-gray-500 font-medium">NEAR</div>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 uppercase mb-2 font-semibold">TOP MATCHING POOL ALLOCATIONS</h3>
                {pot.topAllocations?.map(allocation => (
                  <div 
                    key={allocation.id} 
                    className="flex justify-between items-center py-2 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">#{allocation.rank}</span>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-[1px]" />
                        <img 
                          src={allocation.icon} 
                          className="w-6 h-6 rounded-full relative border-2 border-white"
                        />
                      </div>
                      <span className="font-medium">{allocation.name}</span>
                    </div>
                    <div className="font-medium">{allocation.amount.toFixed(2)} N</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium">
              Fund matching pool
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <span className="text-lg">📋</span> Earn referral fees
            </button>
          </div>
        </div>
      </main>
    </>
  )
} 
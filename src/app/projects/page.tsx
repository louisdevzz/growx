'use client'

import Header from '@/components/Header'
import TokenCard from '@/components/TokenCard'
import { useParams } from 'next/navigation';
import { featuredProjects } from '@/data/projects';

export default function ProjectsPage() {
  const { projectId } = useParams();
  console.log(projectId);
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-6 py-16 text-center">
        <p className="text-gray-600 text-lg mb-4">
          Transforming Funding for Public Goods
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Discover impact projects, donate directly, &<br />
          participate in funding rounds.
        </h1>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Donate Randomly
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Register Your Project
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-900">~$48,578.19</span>
            <span className="text-gray-600">Donated</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-900">3041</span>
            <span className="text-gray-600">Donations</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            FEATURED PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <TokenCard 
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

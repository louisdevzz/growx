"use client"

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { featuredProjects } from "@/data/projects";
import { useState } from 'react';
import HomeTab from './home-tab/page';
import SocialFeedTab from './social-feed/page';
import PotsTab from './pots-tab/page';
import FundingRaisedTab from './funding-raised/page';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  
  // Find the project data based on projectId (using kebab case)
  const project = featuredProjects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === projectId
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'social':
        return <SocialFeedTab />;
      case 'pots':
        return <PotsTab />;
      case 'funding':
        return <FundingRaisedTab />;
      case 'home':
      default:
        return <HomeTab project={project} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="scale-125 origin-top">
        <div className="max-w-5xl mx-auto">
          <Header />
          
          {/* Banner Image Container */}
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Profile Section */}
          <div className="px-6">
            {/* Avatar and Stats */}
            <div className="flex items-start gap-4 -mt-14 relative z-10">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-16 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  APPROVED
                </span>
                <span className="text-sm text-gray-600">{project.followers} Followers</span>
                <span className="text-sm text-gray-600">{project.following} Following</span>
              </div>
            </div>

            {/* Project Title and Info */}
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{project.title}</h1>
                <div className="text-gray-600 text-sm">@{project.handle}</div>
                <div className="text-gray-600 text-sm">Public Good</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">{project.amount}</span>
                  <span className="text-gray-600">NEAR</span>
                </div>
                <p className="text-sm text-gray-600">
                  Raised from {project.donors} donors
                </p>
                <button className="mt-2 w-full bg-red-500 text-white rounded-md px-4 py-2 text-sm">
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
                <button 
                  onClick={() => setActiveTab('social')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'social' 
                      ? 'border-b-2 border-gray-900' 
                      : 'text-gray-600'
                  }`}
                >
                  Social Feed
                </button>
                <button 
                  onClick={() => setActiveTab('pots')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'pots' 
                      ? 'border-b-2 border-gray-900' 
                      : 'text-gray-600'
                  }`}
                >
                  Pots
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
    </div>
  );
}

export default ProjectDetail;
"use client"

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useCallback, useEffect, useState, useRef } from 'react';
import { HomeTab } from '@/components/HomeTab';
import { FundingRoundTab } from '@/components/FundingRound';
import { FundingRaisedTab } from '@/components/FundingRaisedTab';
import { useAccount } from "wagmi";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [project, setProject] = useState<any>(null);
  const startTime = useRef<number>(Date.now());
  const {address} = useAccount();
  const lastActivityTime = useRef<number>(Date.now());

  const fetchProject = useCallback(async () => {
    const response = await fetch(`/api/projects/findBySlug`, {
      method: 'POST',
      body: JSON.stringify({ slug: slug })
    });
    const project = await response.json();
    //console.log(project);
    setProject(project);
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

  if (!project) {
    return <div>Project not found</div>;
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

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="scale-100 origin-top">
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
                      APPROVED
                    </span>
                    {/* <span className="text-sm text-gray-600">{project.followers} Followers</span>
                    <span className="text-sm text-gray-600">{project.following} Following</span> */}
                  </div>
                </div>

                {/* Project Title and Info */}
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-semibold mb-1">{project.name}</h1>
                    <span className="text-gray-600 text-sm">{project.ownerAddress}</span>
                    <div className="text-gray-600 text-sm">{project.category}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold">{project.amount}</span>
                      <span className="text-gray-600">ETH</span>
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
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
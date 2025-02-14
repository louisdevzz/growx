"use client";

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string;
  projectId: string;
  slug: string;
  coverImage: string;
  profileImage: string;
  name: string;
  category: string;
  description: string;
  why: string;
  chain: string | null;
  fundingSources: any[];
  socialLinks: {
    type: string;
    url: string;
    _id: string;
  }[];
  address: string;
  ownerAddress: string;
  createdAt: string;
}

interface ProjectsTabProps {
  projects: Project[],
  setShowDonateModal: (show: boolean) => void,
  fundsRaisedInRound: number,
  investorsInRound: number,
  setProjectId: (projectId: string) => void
}

// Define theme colors array
const THEME_COLORS = [
  {
    gradient: "from-blue-400 to-blue-500",
    text: "text-blue-600"
  },
  {
    gradient: "from-purple-400 to-purple-500",
    text: "text-purple-600"
  },
  {
    gradient: "from-pink-400 to-pink-500",
    text: "text-pink-600"
  },
  {
    gradient: "from-emerald-400 to-emerald-500",
    text: "text-emerald-600"
  },
  {
    gradient: "from-orange-400 to-orange-500",
    text: "text-orange-600"
  },
  {
    gradient: "from-cyan-400 to-cyan-500",
    text: "text-cyan-600"
  }
];

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function ProjectsTab({ projects,setShowDonateModal,fundsRaisedInRound,investorsInRound,setProjectId }: ProjectsTabProps) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project, index) => {
        // Get color theme based on project id
        const colorIndex = parseInt(project.projectId?.substring(0, 6) || '0', 16) % THEME_COLORS.length;
        const { gradient, text } = THEME_COLORS[colorIndex];

        return (
          <div key={project._id} className="block group">
            <div className="relative transform transition-all duration-300 hover:-translate-y-1">
              {/* Gradient border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-75 group-hover:opacity-100`}></div>
              
              <div className="relative bg-white rounded-2xl p-1">
                <div className="relative bg-white rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className={`absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs ${text} font-medium z-10 bg-white/80 backdrop-blur-sm`}>
                    <span>{project.category?.toUpperCase()}</span>
                    <span>#0{index < 10 ? `0${index}` : index}</span>
                  </div>

                  {/* Main image */}
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative h-48">
                      <Image 
                        src={project.coverImage} 
                        alt={project.name}
                        fill
                        priority={index < 3}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Content section */}
                  <div className="p-4">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="font-bold text-gray-800 mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {truncate(project.description, 100)}
                      </p>
                    </Link>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                        style={{ width: '0%' }}
                      />
                    </div>

                    {/* Stats and Donate Button */}
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-bold text-gray-800">{fundsRaisedInRound/10**18} ETH</p>
                        <p className="text-gray-500">{investorsInRound} contributors</p>
                      </div>
                      <button 
                        className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                        onClick={() => {
                          setShowDonateModal(true)
                          setProjectId(project.projectId)
                        }}
                      >
                        Donate Now
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm text-gray-600">Active</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { useParams } from 'next/navigation'
import { featuredProjects } from '@/data/projects'

// Add allProjects or use featuredProjects
const allProjects = featuredProjects; // Use featuredProjects as the source of projects

export default function ProjectsPage() {
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from all projects
  const allTags = Array.from(new Set(allProjects.flatMap(project => project.tags)))

  // Filter projects based on search and tags
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => project.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  console.log(projectId);
  return (
    <main className="min-h-screen flex items-start justify-center">
      <div className="container flex flex-col items-center justify-center">
        <Header />
        
        {/* Search and Filter Section */}
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium">ALL PROJECTS</h2>
              <span className="text-gray-500 text-sm">({filteredProjects.length})</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              {/* Tag filters */}
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev => 
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {/* Search input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full px-10 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

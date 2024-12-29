'use client'

import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton'
import { ProjectProps } from '@/types/project';
export default function Home() {

  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // console.log(projects);

  return (
    <main className="min-h-screen bg-white">
      <div className="container">
        <Header />

        {/* Hero Section */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 opacity-40 rounded-3xl blur-xl"/>
          
          <div className="relative flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-6">
                Support Projects
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                  Making Impact
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Join our community of changemakers. Fund innovative projects, track your impact, and be part of positive change.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/projects">
                  <button className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all">
                    Explore Projects
                  </button>
                </Link>
                <Link href="/create-project">
                  <button className="px-8 py-4 bg-white text-black font-semibold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all">
                    Create Project
                  </button>
                </Link>
              </div>

              {/* Supported By Logos */}
              <div className="mt-16">
                <p className="text-sm text-gray-500 mb-4">Powered by</p>
                <div className="flex items-center gap-8">
                  <Image 
                    src="/assets/logo/a8.png" 
                    alt="Ancient8"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="relative w-[600px] h-[400px]">
              {/* Card 1 */}
              <div className="absolute top-0 right-0 w-72 transform rotate-6 hover:rotate-0 transition-transform float">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-75"></div>
                  <div className="relative bg-white rounded-2xl p-1">
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs text-blue-600 font-medium z-10 bg-white/80 backdrop-blur-sm">
                        <span>FUNDING ROUND</span>
                        <span>Education</span>
                      </div>
                      <Image
                        src="/assets/projects/nft1.png"
                        alt="Education Project"
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">Digital Learning Initiative</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          Bringing digital education tools to underserved communities and empowering future generations.
                        </p>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}/>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-gray-800">65.5 ETH</p>
                            <p className="text-gray-500">24 contributors</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">~$78.60</p>
                            <p className="text-gray-500">USD</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-500">14 days left</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute top-20 right-32 w-72 transform -rotate-3 hover:rotate-0 transition-transform float" 
                   style={{animationDelay: "0.2s"}}>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl blur opacity-75"></div>
                  <div className="relative bg-white rounded-2xl p-1">
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs text-purple-600 font-medium z-10 bg-white/80 backdrop-blur-sm">
                        <span>FUNDING ROUND</span>
                        <span>Healthcare</span>
                      </div>
                      <Image
                        src="/assets/projects/nft2.png"
                        alt="Healthcare Project"
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">Mobile Health Clinics</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          Providing essential healthcare services to remote areas through mobile medical units.
                        </p>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }}/>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-gray-800">120.8 ETH</p>
                            <p className="text-gray-500">38 contributors</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">~$144.96</p>
                            <p className="text-gray-500">USD</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-500">21 days left</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute top-40 right-64 w-72 transform rotate-12 hover:rotate-0 transition-transform float"
                   style={{animationDelay: "0.4s"}}>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-75"></div>
                  <div className="relative bg-white rounded-2xl p-1">
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs text-emerald-600 font-medium z-10 bg-white/80 backdrop-blur-sm">
                        <span>FUNDING ROUND</span>
                        <span>Environment</span>
                      </div>
                      <Image
                        src="/assets/projects/nft3.png"
                        alt="Environment Project"
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">Green Energy Solutions</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          Implementing sustainable energy projects in developing communities to reduce carbon footprint.
                        </p>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}/>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-gray-800">245.6 ETH</p>
                            <p className="text-gray-500">92 contributors</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">~$294.72</p>
                            <p className="text-gray-500">USD</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-500">7 days left</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex gap-16 mt-16">
            <div>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                12.5K+
              </p>
              <p className="text-gray-500">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                150+
              </p>
              <p className="text-gray-500">Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                8.2K+
              </p>
              <p className="text-gray-500">Contributors</p>
            </div>
          </div>
        </div>

        {/* Recently viewed projects */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold">Recently viewed projects</h2>
            <Link 
              href="/projects"
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
            >
              View All
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {isLoading ? (
              <>
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
              </>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  {...project}
                  index={index+1}
                  href={`/projects/${project.slug}`}
                />
              ))
            )}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link 
              href="/projects"
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
            >
              View All
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {isLoading ? (
              <>
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
              </>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  {...project}
                  index={index+1}
                  href={`/projects/${project.slug}`}
                />
              ))
            )}
          </div>
        </section>
        
      </div>
    </main>
  )
}

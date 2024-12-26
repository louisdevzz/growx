import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { featuredProjects } from '@/data/projects'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center">
      
      <div className="container flex flex-col items-center justify-center ">
        <Header />

        <div className="w-full mx-auto pt-10">
          <div className="bg-[#F0F7FF] rounded-3xl p-8 w-full">
            <p className="text-[#2563EB] text-sm font-medium">Empowering Global Impact Through Web3</p>
            <h1 className="text-4xl max-w-2xl my-4 font-medium">
              Support Innovative Projects Making Real-World Impact
            </h1>
            <p className="text-gray-600 max-w-xl mb-8">
              Join our community of changemakers. Fund meaningful projects, track your impact, 
              and be part of the solution.
            </p>
            <div className="flex gap-4 mb-12">
              <button className="px-6 py-3 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors">
                Explore Projects
              </button>
              <Link href="/projects/create" className="px-6 py-3 border border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-colors">
                Submit Project
              </Link>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-[#2563EB] text-2xl font-semibold">$12.5M+</p>
                <p className="text-gray-600 text-sm">Total Funded</p>
              </div>
              <div>
                <p className="text-[#2563EB] text-2xl font-semibold">1,234</p>
                <p className="text-gray-600 text-sm">Active Projects</p>
              </div>
              <div>
                <p className="text-[#2563EB] text-2xl font-semibold">8.2K</p>
                <p className="text-gray-600 text-sm">Contributors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects - Updated layout and spacing */}
        <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="flex items-center justify-between mb-6 text-base font-medium">RECOMMENDED PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </section>

        {/* All Projects - Updated to match Featured Projects layout */}
        <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium">ALL PROJECTS</h2>
              <span className="text-gray-500 text-sm">(266)</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl text-sm hover:bg-gray-50">
                Filter
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 px-2 rounded-full text-xs">1</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search (266) projects"
                  className="w-full px-10 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl text-sm hover:bg-gray-50">
                Sort
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

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
              <Link href="/create-project" className="px-6 py-3 border border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-colors">
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
              <span className="text-gray-500 text-sm"></span>
            </div>
            <Link 
              href="/projects" 
              className="text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium flex items-center gap-1"
            >
              View All
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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

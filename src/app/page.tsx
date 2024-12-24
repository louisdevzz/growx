import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { featuredProjects } from '@/data/projects'

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center">
      
      <div className="container flex flex-col items-center justify-center ">
        <Header />
        
        {/* Hero Section - Updated with responsive padding/margin */}
        <div className="w-full border-b mx-auto px-4">
          <div className="bg-[#FFF5F0] rounded-3xl p-8 w-full ">
            <p className="text-[#E33E3F] text-sm">Transforming Funding for Public Goods</p>
            <h1 className="text-3xl font-serif max-w-2xl my-4">
              Discover impact projects, donate directly, & participate in funding rounds.
            </h1>
            <div className="flex gap-4 mb-8">
              <button className="px-4 py-2 bg-[#E33E3F] text-white rounded-lg hover:bg-[#d63636]">
                Donate Randomly
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Register Your Project
              </button>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-[#E33E3F] text-xl font-medium">-$51,011.7B</p>
                <p className="text-gray-600 text-sm">Donated</p>
              </div>
              <div>
                <p className="text-[#E33E3F] text-xl font-medium">3041</p>
                <p className="text-gray-600 text-sm">Donations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects - Updated layout and spacing */}
        <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="flex items-center justify-between mb-6 text-base font-medium">FEATURED PROJECTS</h2>
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
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
                Filter <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs ml-1">1</span>
              </button>
              <input
                type="search"
                placeholder="Filter projects"
                className="px-3 py-1.5 border border-gray-300 rounded-md w-[240px] text-sm"
              />
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
                Sort
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

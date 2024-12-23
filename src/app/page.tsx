import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { featuredProjects } from '@/data/projects'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#FFF5F0] rounded-3xl mx-24 my-8">
        <section className="px-12 py-12">
          <p className="text-[#E33E3F] text-base mb-4">Transforming Funding for Public Goods</p>
          <h1 className="text-[2.5rem] leading-[3rem] font-serif max-w-2xl mb-8">
            Discover impact projects, donate directly, & participate in funding rounds.
          </h1>
          <div className="flex gap-4 mb-12">
            <button className="px-6 py-3 bg-[#E33E3F] text-white rounded-xl hover:bg-[#d63636]">
              Donate Randomly
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
              Register Your Project
            </button>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-[#E33E3F] text-2xl font-medium">9,359.96N</p>
              <p className="text-gray-600">Donated</p>
            </div>
            <div>
              <p className="text-[#E33E3F] text-2xl font-medium">3041</p>
              <p className="text-gray-600">Donations</p>
            </div>
          </div>
        </section>
      </div>

      {/* Featured Projects - Updated spacing and simplified heading */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-base font-medium mb-6">FEATURED PROJECTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>
      </section>

      {/* All Projects - Updated filter layout */}
      <section className="max-w-7xl mx-auto px-6 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              amount={project.amount}
              currency={project.currency}
              raised={project.raised}
              href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

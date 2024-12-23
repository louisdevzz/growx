import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { featuredProjects } from '@/data/projects'


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-[#E33E3F] mb-4">Transforming Funding for Public Goods</p>
        <h1 className="text-4xl font-serif max-w-2xl mb-8">
          Discover impact projects, donate directly, & participate in funding rounds.
        </h1>
        <div className="flex gap-4 mb-12">
          <button className="donate-btn">Donate Randomly</button>
          <button className="outline-btn">Register Your Project</button>
        </div>
        <div className="flex gap-12">
          <div>
            <p className="text-[#E33E3F] text-2xl font-bold">$48,578.19</p>
            <p className="text-gray-600">Donated</p>
          </div>
          <div>
            <p className="text-[#E33E3F] text-2xl font-bold">3041</p>
            <p className="text-gray-600">Donations</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-lg font-medium mb-8">FEATURED PROJECTS</h2>
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

      {/* All Projects */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">ALL PROJECTS</h2>
            <span className="text-gray-500">266</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                Filter <span className="bg-gray-200 px-2 py-0.5 rounded">1</span>
              </button>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search (266) projects"
                  className="px-4 py-2 border rounded-lg w-[300px]"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  
                </span>
              </div>
            </div>
            <button className="px-4 py-2 border rounded-lg">
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

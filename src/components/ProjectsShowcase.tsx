import { getProjects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ProjectsShowcase() {
  const projects = getProjects().slice(0, 4)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg">Discover innovative projects that are changing the world</p>
          </div>
          <Link 
            href="/projects" 
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            View all projects
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group border-2 border-[#6964fd] rounded-3xl overflow-hidden">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48 rounded-t-xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Funding</p>
                      <p className="text-[#6964fd] font-semibold">
                        ${project.totalFunding.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-[#6964fd] hover:text-[#6964fd]/90 font-medium"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
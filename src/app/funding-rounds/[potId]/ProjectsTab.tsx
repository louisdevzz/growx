import { Project } from '@/data/projects'
import Link from 'next/link'

interface ProjectsTabProps {
  projects: Project[]
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link 
          href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`} 
          key={project.id}
          className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                {project.handle && (
                  <p className="text-sm text-gray-500">{project.handle}</p>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium">{project.amount} {project.currency}</div>
                <div className="text-sm text-gray-500">{project.donors} donors</div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {project.description}
            </p>

            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 
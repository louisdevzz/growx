import { getProjects } from '@/data/projects'
import Link from 'next/link'
import Image from 'next/image'

export default function TrendingProjects() {
  const trendingProjects = getProjects()
    .sort((a, b) => b.totalFunding - a.totalFunding)
    .slice(0, 3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600">Projects that are making waves in the community</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingProjects.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="group border-2 border-[#eefc59] rounded-3xl overflow-hidden">
              <div className="relative bg-white rounded-3xl overflow-hidden">
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white/90 backdrop-blur rounded-full py-1 px-3 flex items-center gap-2">
                    <span className="text-black font-semibold">#{index + 1}</span>
                    <span className="text-sm text-gray-600">Trending</span>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#F7FF9C] text-black text-sm px-4 py-1.5 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3 px-3">
                <h3 className="text-xl font-semibold group-hover:text-black/70 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className=''>
                  <div className="h-1 w-full bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-[#F7FF9C] rounded-full"
                      style={{ width: `${(project.totalFunding / project.targetFunding) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">
                      ${project.totalFunding.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ${project.targetFunding.toLocaleString()} goal
                    </span>
                  </div>
                </div>

                {/* Creator */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 pb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F1F0FF]">
                    <Image
                      src={project.creator.avatar}
                      alt={project.creator.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Created by</span>
                    <span className="text-sm font-medium">{project.creator.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 
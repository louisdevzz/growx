"use client"

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { featuredProjects } from "@/data/projects";

const ProjectDetail = () => {
  const { projectId } = useParams();
  
  // Find the project data based on projectId (using kebab case)
  const project = featuredProjects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === projectId
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="scale-125 origin-top">
        <div className="max-w-5xl mx-auto">
          <Header />
          
          {/* Banner Image Container */}
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Profile Section */}
          <div className="px-6">
            {/* Avatar and Stats */}
            <div className="flex items-start gap-4 -mt-14 relative z-10">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-16 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  APPROVED
                </span>
                <span className="text-sm text-gray-600">{project.followers} Followers</span>
                <span className="text-sm text-gray-600">{project.following} Following</span>
              </div>
            </div>

            {/* Project Title and Info */}
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{project.title}</h1>
                <div className="text-gray-600 text-sm">@{project.handle}</div>
                <div className="text-gray-600 text-sm">Public Good</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">{project.amount}</span>
                  <span className="text-gray-600">NEAR</span>
                </div>
                <p className="text-sm text-gray-600">
                  Raised from {project.donors} donors
                </p>
                <button className="mt-2 w-full bg-red-500 text-white rounded-md px-4 py-2 text-sm">
                  Donate
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="flex gap-8">
                <a href="#" className="border-b-2 border-gray-900 pb-4 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-600 pb-4 text-sm">Social Feed</a>
                <a href="#" className="text-gray-600 pb-4 text-sm">Pots</a>
                <a href="#" className="text-gray-600 pb-4 text-sm">Funding Related</a>
              </nav>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">About {project.title}</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-[200px,1fr] gap-4">
                  <div className="font-medium">Overview</div>
                  <div className="text-gray-600">
                    {project.overview ? (
                      <ul className="list-disc pl-4">
                        {project.overview.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                </div>

                {project.whyPublicGood && (
                  <div className="grid grid-cols-[200px,1fr] gap-4">
                    <div className="font-medium">Why we are a public good</div>
                    <p className="text-gray-600">{project.whyPublicGood}</p>
                  </div>
                )}

                <div className="grid grid-cols-[200px,1fr] gap-4">
                  <div className="font-medium">Team members</div>
                  <p className="text-gray-600">{project.teamMembers || "No team members to display"}</p>
                </div>

                <div className="grid grid-cols-[200px,1fr] gap-4">
                  <div className="font-medium">Github repo(s)</div>
                  <p className="text-gray-600">{project.githubRepos || "None provided"}</p>
                </div>

                <div className="grid grid-cols-[200px,1fr] gap-4">
                  <div className="font-medium">Smart contracts</div>
                  <p className="text-gray-600">{project.smartContracts || "None provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
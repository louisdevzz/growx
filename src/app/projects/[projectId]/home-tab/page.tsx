"use client"

interface HomeTabProps {
  project: {
    title: string;
    overview?: string[];
    description?: string;
    whyPublicGood?: string;
    teamMembers?: string;
    githubRepos?: string;
    smartContracts?: string;
  };
}

const HomeTab = ({ project }: HomeTabProps) => {
  return (
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
  );
}

export default HomeTab; 
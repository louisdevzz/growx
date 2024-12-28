"use client"

import { Project } from '@/types/project';

const HomeTab = ({project}: {project: Project}) => {

  return (
    <div className="mt-8 py-8">
      <h2 className="text-xl font-semibold mb-6">About {project.title}</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-[300px,1fr] gap-4">
          <div className="font-medium">Overview</div>
          <div className="text-gray-600">
            <p>{project.description}</p>
          </div>
        </div>

        {project.why && (
          <div className="grid grid-cols-[300px,1fr] gap-4">
            <div className="font-medium">Why do you want to raise capital?</div>
            <p className="text-gray-600">{project.why}</p>
          </div>
        )}

        {/* <div className="grid grid-cols-[200px,1fr] gap-4">
          <div className="font-medium">Team members</div>
          <p className="text-gray-600">{project.teamMembers || "No team members to display"}</p>
        </div> */}

        <div className="grid grid-cols-[300px,1fr] gap-4">
          <div className="font-medium">Funding sources</div>
          <p className="text-gray-600">{project.fundingSources || "None provided"}</p>
        </div>

        <div className="grid grid-cols-[300px,1fr] gap-4">
          <div className="font-medium">Address receiving funds</div>
          <p className="text-gray-600">{project.address || "None provided"}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeTab; 
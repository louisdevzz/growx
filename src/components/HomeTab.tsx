"use client"

import { ProjectProps } from '@/types/project';
import Link from 'next/link';

export const HomeTab = ({project}: {project: ProjectProps}) => {

  return (
    <div className="mt-4 sm:mt-8 py-4 sm:py-8">
      <h2 className="text-xl font-semibold mb-6">About {project.name}</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="font-medium">Overview</div>
          <div className="text-gray-600">
            <p>{project.description}</p>
          </div>
        </div>

        {project.why && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-medium">Why do you want to raise capital?</div>
            <p className="text-gray-600">{project.why}</p>
          </div>
        )}

        {/* <div className="grid grid-cols-[200px,1fr] gap-4">
          <div className="font-medium">Team members</div>
          <p className="text-gray-600">{project.teamMembers || "No team members to display"}</p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="font-medium">Funding sources</div>
          {
            project.fundingSources ? (
              project.fundingSources.map((source) => (
                <Link target="_blank" href={source} className="text-gray-600 hover:underline hover:text-gray-900">{source}</Link>
              ))
            ) : (
              <p className="text-gray-600">None provided</p>
            )
          }
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="font-medium">Address receiving funds</div>
          <Link 
            target="_blank" 
            href={`https://scanv2-testnet.ancient8.gg/address/${project.address}`} 
            className="text-gray-600 hover:underline hover:text-gray-900 truncate ">
              {project.address
                ? `${project.address.slice(0, 5)}...${project.address.slice(-6)}`
                : "None provided"}</Link>
        </div>
      </div>
      
    </div>
  );
}

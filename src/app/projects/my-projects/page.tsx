'use client'

import Layout from '@/components/Layout'
import { useCallback, useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton'
import { ProjectProps } from '@/types/project';
import { useAccount } from 'wagmi'
import ConnectWalletCard from '@/components/ConnectWalletCard'


export default function MyProjectsPage() {
    const { address,isConnected } = useAccount();
    const [searchTerm, setSearchTerm] = useState<string|null>(null)
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const filteredProjects = useCallback(() => {
        if (!searchTerm) return projects;
        
        return projects.filter((project) => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [projects, searchTerm]);

    const fetchProjects = useCallback(async () => {
        try {
            const response = await fetch('/api/projects/findByAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });
            const data = await response.json();
            // console.log(data)
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false); 
        }
    }, [address]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if(!isConnected) {
        return (
            <Layout>
                <ConnectWalletCard />
            </Layout>
        )
    }

    
    return (
        <Layout>
            <div className="py-6 md:py-10">
                <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex mb-6 w-full">
                    <div className="flex items-center gap-2 justify-start w-full">
                    <h2 className="text-base font-medium">MY PROJECTS</h2>
                    <span className="text-gray-500 text-sm">
                        ({isLoading ? '...' : filteredProjects().length})
                    </span>
                    {/* Search input */}
                    <div className="relative flex-1 max-w-[270px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                        <input
                        type="search"
                        placeholder="Search projects..."
                        className="w-full px-10 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                        value={searchTerm || ''}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {isLoading ? (
                    <>
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                    </>
                    ) : (
                    filteredProjects().length > 0 ? filteredProjects().map((project) => (
                        <ProjectCard
                        key={project._id}
                        {...project}
                        href={`/projects/${project.slug}`}
                        />
                    )) : (
                        <div className="col-span-full text-center text-gray-500">
                        {searchTerm ? `No projects found matching "${searchTerm}"` : 'No projects found'}
                        </div>
                    )
                    )}
                </div>
                </div>
            </div>
        </Layout>
    )
}

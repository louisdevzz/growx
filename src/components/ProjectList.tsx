import ProjectCard from './ProjectCard';
import { featuredProjects } from '../data/projects';

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          href={`/projects/${project.handle || project.title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      ))}
    </div>
  );
} 
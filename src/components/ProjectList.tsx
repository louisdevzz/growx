import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          tags={project.tags}
          amount={project.amount}
          currency={project.currency}
          raised={project.raised}
        />
      ))}
    </div>
  );
} 
export interface Project {
  id: number;
  name: string;
  description: string;
  totalFunding: number;
  targetFunding: number;
  image: string;
  category: string;
  createdAt: string;
  creator: {
    name: string;
    avatar: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    name: "EcoTech Solutions",
    description: "Revolutionary sustainable technology for reducing carbon emissions in urban areas.",
    totalFunding: 500000,
    targetFunding: 1000000,
    image: "/projects/eco-tech.jpg",
    category: "Sustainability",
    createdAt: "2024-03-15",
    creator: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg"
    }
  },
  {
    id: 2,
    name: "HealthAI Assistant",
    description: "AI-powered healthcare assistant for personalized medical recommendations.",
    totalFunding: 350000,
    targetFunding: 500000,
    image: "/projects/health-ai.jpg",
    category: "Healthcare",
    createdAt: "2024-03-14",
    creator: {
      name: "Dr. Michael Chen",
      avatar: "/avatars/michael.jpg"
    }
  },
  {
    id: 3,
    name: "Project Gamma",
    description: "A community-driven project to enhance local education systems.",
    totalFunding: 250000,
    targetFunding: 250000,
    image: "/projects/gamma.jpg",
    category: "Education",
    createdAt: "2024-03-13",
    creator: {
      name: "John Doe",
      avatar: "/avatars/john.jpg"
    }
  },
  {
    id: 4,
    name: "Project Delta",
    description: "A healthcare project designed to improve patient outcomes.",
    totalFunding: 400000,
    targetFunding: 400000,
    image: "/projects/delta.jpg",
    category: "Healthcare",
    createdAt: "2024-03-12",
    creator: {
      name: "Jane Smith",
      avatar: "/avatars/jane.jpg"
    }
  },
  {
    id: 5,
    name: "Project Epsilon",
    description: "A tech startup focused on AI and machine learning innovations.",
    totalFunding: 600000,
    targetFunding: 600000,
    image: "/projects/epsilon.jpg",
    category: "Technology",
    createdAt: "2024-03-11",
    creator: {
      name: "Emily Davis",
      avatar: "/avatars/emily.jpg"
    }
  },
];

export function getProjects(): Project[] {
  return projects;
}
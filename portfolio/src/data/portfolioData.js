import profileAvatar from "../assets/profile.png";
import rawProjects from "./projects";
import commitsByProject from "./commits";
import skillsData from "./skills";
import certificationsData from "./certifications";

export const profile = {
  name: "Alex Morgan",
  username: "alexmorgan",
  title: "Full-Stack Engineer",
  bio: "I build product-focused developer tools, backend systems, and interfaces that stay fast under real load.",
  email: "alex@example.com",
  github: "https://github.com/alexmorgan",
  linkedin: "https://www.linkedin.com/in/alexmorgan",
  twitter: "https://x.com/alexmorgan",
  website: "https://alexmorgan.dev",
  location: "Bengaluru, India",
  availableForWork: true,
  avatar: profileAvatar,
  stats: {
    projects: rawProjects.length,
    contributions: "1.2k+",
    experience: "5 yrs",
    certifications: 6,
  },
};

export const languageColors = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  React: "#61dafb",
  "Node.js": "#3c873a",
  Python: "#3572a5",
  Rust: "#dea584",
  GraphQL: "#e10098",
  PostgreSQL: "#336791",
};

export const skillCategories = skillsData;

export const certifications = certificationsData;

export const achievements = [
  {
    id: "ach-1",
    icon: "🏆",
    title: "Shipped 5 production-grade portfolio repos",
    description: "Built a portfolio set that covers frontend, backend, GraphQL, Rust, and Python workflows.",
    date: "2025",
    highlight: true,
  },
  {
    id: "ach-2",
    icon: "⚡",
    title: "Focused on developer tooling",
    description: "Most recent work centers on observability, auth, caching, and DX-heavy product surfaces.",
    date: "2024",
  },
  {
    id: "ach-3",
    icon: "🧪",
    title: "Testing-first project structure",
    description: "Used Playwright, Vitest, Jest, and benchmark tooling across projects to keep behavior explicit.",
    date: "2024",
  },
];

const repoMeta = {
  devboard: {
    language: "TypeScript",
    stars: 428,
    forks: 61,
    watchers: 39,
    topics: ["dashboard", "websockets", "cicd", "monitoring", "analytics"],
    isPublic: true,
    isFeatured: true,
    license: "MIT",
    updatedAt: "2 days ago",
    createdAt: "Jan 2024",
    defaultBranch: "main",
    openIssues: 12,
    size: "18.4 MB",
  },
  "nexus-auth": {
    language: "TypeScript",
    stars: 387,
    forks: 44,
    watchers: 28,
    topics: ["auth", "oauth", "jwt", "pkce", "sso"],
    isPublic: true,
    isFeatured: true,
    license: "Apache-2.0",
    updatedAt: "5 days ago",
    createdAt: "Sep 2023",
    defaultBranch: "main",
    openIssues: 7,
    size: "9.7 MB",
  },
  "graphql-storm": {
    language: "TypeScript",
    stars: 301,
    forks: 35,
    watchers: 22,
    topics: ["graphql", "schema", "dataloader", "nodejs"],
    isPublic: true,
    isFeatured: true,
    license: "MIT",
    updatedAt: "2 weeks ago",
    createdAt: "Apr 2023",
    defaultBranch: "main",
    openIssues: 5,
    size: "7.1 MB",
  },
  "palette-gen": {
    language: "Python",
    stars: 214,
    forks: 19,
    watchers: 15,
    topics: ["color", "wcag", "design-tokens", "fastapi", "cli"],
    isPublic: true,
    isFeatured: false,
    license: "MIT",
    updatedAt: "1 month ago",
    createdAt: "Jul 2023",
    defaultBranch: "main",
    openIssues: 4,
    size: "11.2 MB",
  },
  "rusty-cache": {
    language: "Rust",
    stars: 356,
    forks: 27,
    watchers: 24,
    topics: ["rust", "cache", "napi", "performance"],
    isPublic: true,
    isFeatured: false,
    license: "MIT",
    updatedAt: "3 weeks ago",
    createdAt: "Nov 2023",
    defaultBranch: "main",
    openIssues: 6,
    size: "5.6 MB",
  },
};

const buildReadme = (project) => {
  const featureLines = project.features.map((feature) => `- ${feature}`).join("\n");
  return `# ${project.name}

## Overview
${project.description}

## Tech Stack
${project.techStack.join(", ")}

## Features
${featureLines}
`;
};

export const projects = rawProjects.map((project) => {
  const meta = repoMeta[project.id] ?? {};

  return {
    ...project,
    ...meta,
    commits: commitsByProject[project.id] ?? [],
    readme: buildReadme(project),
  };
});

export default {
  profile,
  languageColors,
  skillCategories,
  achievements,
  certifications,
  projects,
};

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "UI",
    summary: "Interfaces, component systems, and responsive application shells.",
    skills: [
      { name: "React", level: 93, tag: "Expert" },
      { name: "TypeScript", level: 91, tag: "Expert" },
      { name: "Tailwind CSS", level: 87, tag: "Advanced" },
      { name: "JavaScript", level: 92, tag: "Expert" },
      { name: "Vite", level: 84, tag: "Advanced" },
      { name: "Accessibility", level: 81, tag: "Advanced" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "API",
    summary: "Service design, APIs, authentication, and database-backed systems.",
    skills: [
      { name: "Node.js", level: 90, tag: "Expert" },
      { name: "Fastify", level: 80, tag: "Advanced" },
      { name: "Express", level: 82, tag: "Advanced" },
      { name: "PostgreSQL", level: 84, tag: "Advanced" },
      { name: "Redis", level: 78, tag: "Proficient" },
      { name: "REST API Design", level: 88, tag: "Advanced" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    icon: "OPS",
    summary: "Delivery pipelines, containers, cloud workflows, and reliability work.",
    skills: [
      { name: "Docker", level: 82, tag: "Advanced" },
      { name: "CI/CD", level: 85, tag: "Advanced" },
      { name: "GitHub Actions", level: 83, tag: "Advanced" },
      { name: "AWS", level: 77, tag: "Proficient" },
      { name: "Monitoring", level: 79, tag: "Proficient" },
      { name: "Performance Tuning", level: 81, tag: "Advanced" },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    icon: "CORE",
    summary: "Data flow, performance-focused tools, and core engineering practices.",
    skills: [
      { name: "Rust", level: 74, tag: "Proficient" },
      { name: "GraphQL", level: 79, tag: "Proficient" },
      { name: "Testing", level: 88, tag: "Advanced" },
      { name: "Vitest", level: 84, tag: "Advanced" },
      { name: "Jest", level: 82, tag: "Advanced" },
      { name: "System Design", level: 80, tag: "Advanced" },
    ],
  },
];

export default skillCategories;

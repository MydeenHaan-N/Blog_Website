// ─────────────────────────────────────────────────────────
//  projects.js
//  Static data for all portfolio projects.
//  Each entry maps directly to a RepoCard and RepoDetailPage.
//  Edit this file to add, remove, or update projects.
// ─────────────────────────────────────────────────────────

const projects = [
  {
    id: "devboard",
    name: "devboard",
    description:
      "A real-time developer dashboard for monitoring CI/CD pipelines, deployment status, and team velocity metrics. Built with React and a Node.js microservices backend communicating over WebSockets.",
    techStack: ["React", "TypeScript", "Node.js", "Fastify", "Redis", "PostgreSQL", "WebSockets", "Docker"],
    features: [
      "Live CI/CD pipeline monitoring with instant status updates",
      "Deployment history with one-click rollback UI",
      "Team velocity and throughput analytics",
      "Slack and PagerDuty alerting integrations",
      "Role-based access control for multi-team setups",
      "End-to-end test coverage with Playwright",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },

  {
    id: "nexus-auth",
    name: "nexus-auth",
    description:
      "A drop-in authentication library supporting OAuth 2.0, PKCE, automatic JWT rotation, and multi-tenant SSO. Framework-agnostic, zero runtime dependencies, and under 8 kb gzipped.",
    techStack: ["TypeScript", "OAuth 2.0", "JWT", "PKCE", "Rollup", "Vitest"],
    features: [
      "Full OAuth 2.0 + PKCE flow for public clients",
      "Automatic silent JWT refresh before expiry",
      "Multi-tenant SSO with strict tenant isolation",
      "Framework-agnostic — works with React, Vue, Svelte, or plain JS",
      "Zero runtime dependencies, tree-shakeable ESM output",
      "Comprehensive API documentation with live examples",
    ],
    image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=800&q=80",
  },

  {
    id: "graphql-storm",
    name: "graphql-storm",
    description:
      "A code-first GraphQL schema builder for Node.js with automatic DataLoader generation, N+1 query detection, and per-operation query complexity analysis.",
    techStack: ["TypeScript", "Node.js", "GraphQL", "DataLoader", "Jest"],
    features: [
      "Code-first schema builder with full TypeScript inference",
      "Automatic DataLoader generation from schema relations",
      "Built-in N+1 query detection with actionable warnings",
      "Query complexity scoring and configurable hard limits",
      "Plugin system for custom directives and middleware",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },

  {
    id: "palette-gen",
    name: "palette-gen",
    description:
      "An AI-powered color palette generator using perceptual color theory and WCAG contrast compliance checking. Outputs ready-to-use CSS variables, Tailwind config, and Figma design tokens.",
    techStack: ["Python", "Click", "Oklab", "NumPy", "FastAPI"],
    features: [
      "Perceptual color harmony using the Oklab color model",
      "WCAG AA and AAA contrast ratio checking with fix suggestions",
      "Export palettes as CSS variables, Tailwind config, or Figma tokens",
      "CLI and REST API interfaces",
      "Batch generation for entire design system color scales",
    ],
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
  },

  {
    id: "rusty-cache",
    name: "rusty-cache",
    description:
      "A high-performance in-process caching library written in Rust with LRU and LFU eviction policies, per-entry TTL support, and first-class Node.js bindings via NAPI-RS.",
    techStack: ["Rust", "NAPI-RS", "Node.js", "cargo", "criterion"],
    features: [
      "LRU and LFU eviction policies with O(1) operations",
      "Per-entry TTL with lazy expiration — no background thread",
      "Thread-safe internals via Arc<RwLock> for concurrent reads",
      "NAPI-RS bindings for seamless Node.js integration",
      "Benchmarked with criterion.rs — 3× faster than comparable JS caches",
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
];

export default projects;
import { useParams, NavLink, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  Circle,
  GitBranch,
  Scale,
  AlertCircle,
  Clock,
  Lock,
  Unlock,
  FileText,
  Tag,
  ExternalLink,
  GitCommitHorizontal,
  BookOpen,
  Zap,
  HardDrive,
} from "lucide-react";
import { projects, languageColors, profile } from "../data/portfolioData";
import CommitItem from "../components/CommitItem";

// ─────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────

const fmt = (n) =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n);

// ─────────────────────────────────────────────────────────
//  Micro-components
// ─────────────────────────────────────────────────────────

function SectionBlock({ icon: Icon, title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border-muted)]">
        <Icon size={15} strokeWidth={2} className="text-[var(--color-accent)]" />
        <h2 className="text-[15px] font-semibold text-[var(--color-text)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SidebarRow({ icon: Icon, label, value, valueClass = "" }) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={13}
        strokeWidth={1.8}
        className="text-[var(--color-text-subtle)] mt-0.5 shrink-0"
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-text-subtle)]"
          style={{ fontFamily: "var(--font-mono)" }}>
          {label}
        </span>
        <span className={`text-[13px] text-[var(--color-text)] break-words ${valueClass}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Breadcrumb
// ─────────────────────────────────────────────────────────

function Breadcrumb({ projectName }) {
  return (
    <div className="flex items-center gap-2 text-[13px] mb-6">
      <NavLink
        to="/repos"
        className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
      >
        <ArrowLeft size={13} strokeWidth={2} />
        Repositories
      </NavLink>
      <span className="text-[var(--color-text-subtle)]">/</span>
      <span className="font-semibold text-[var(--color-text)]">{projectName}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Project Header
// ─────────────────────────────────────────────────────────

function ProjectHeader({ project }) {
  const langColor = languageColors[project.language] ?? "#8c959f";

  return (
    <div className="flex flex-col gap-3">

      {/* Title row */}
      <div className="flex flex-wrap items-center gap-2">
        {project.isPublic
          ? <Unlock size={15} strokeWidth={1.8} className="text-[var(--color-text-subtle)]" />
          : <Lock   size={15} strokeWidth={1.8} className="text-[var(--color-text-subtle)]" />
        }
        <h1 className="text-[22px] font-bold text-[var(--color-text)] leading-tight">
          {project.name}
        </h1>
        <span className="pill border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-subtle)] text-[11px]">
          {project.isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* Description */}
      <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
        {project.description}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {project.topics.map((t) => (
          <span
            key={t}
            className="px-2.5 py-[4px] rounded-full text-[11.5px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-4 text-[13px] text-[var(--color-text-muted)] pt-1">
        <span className="flex items-center gap-1.5">
          <Circle size={11} strokeWidth={0} fill={langColor} />
          <span className="font-medium text-[var(--color-text)]">{project.language}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Star size={13} strokeWidth={1.8} />
          <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(project.stars)}</span>
          <span className="text-[var(--color-text-subtle)]">stars</span>
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork size={13} strokeWidth={1.8} />
          <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(project.forks)}</span>
          <span className="text-[var(--color-text-subtle)]">forks</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Eye size={13} strokeWidth={1.8} />
          <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(project.watchers)}</span>
          <span className="text-[var(--color-text-subtle)]">watching</span>
        </span>
        <span className="flex items-center gap-1.5 ml-auto text-[12px]"
          style={{ fontFamily: "var(--font-mono)" }}>
          <Clock size={12} strokeWidth={1.8} />
          Updated {project.updatedAt}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  README / About section
// ─────────────────────────────────────────────────────────

function ReadmeSection({ readme }) {
  // Very lightweight Markdown renderer — handles headings, bold, lists, code
  const renderLine = (line, i) => {
    if (line.startsWith("# "))   return <h1 key={i} className="text-[18px] font-bold text-[var(--color-text)] mt-4 mb-2 pb-2 border-b border-[var(--color-border-muted)]">{line.slice(2)}</h1>;
    if (line.startsWith("## "))  return <h2 key={i} className="text-[15px] font-semibold text-[var(--color-text)] mt-4 mb-1.5">{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="text-[13.5px] font-semibold text-[var(--color-text)] mt-3 mb-1">{line.slice(4)}</h3>;
    if (line.startsWith("- "))   return (
      <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-text-muted)] leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
        {line.slice(2)}
      </li>
    );
    if (line === "")             return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
        {line}
      </p>
    );
  };

  return (
    <SectionBlock icon={BookOpen} title="README">
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-muted)] p-5">
        <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
          {readme.split("\n").map(renderLine)}
        </ul>
      </div>
    </SectionBlock>
  );
}

// ─────────────────────────────────────────────────────────
//  Features section (derived from README bullet list)
// ─────────────────────────────────────────────────────────

function FeaturesSection({ project }) {
  // Extract bullet points from readme as feature list
  const features = project.readme
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2));

  if (!features.length) return null;

  const ICONS = [Zap, Star, GitBranch, Eye, HardDrive, FileText];

  return (
    <SectionBlock icon={Zap} title="Key Features">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feat, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-[var(--color-border-muted)] bg-[var(--color-surface)] hover:border-[var(--color-border)] hover:bg-white transition-all duration-150"
            >
              <div className="w-7 h-7 rounded-md bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
                <Icon size={13} strokeWidth={2} className="text-[var(--color-accent)]" />
              </div>
              <p className="text-[12.5px] text-[var(--color-text-muted)] leading-relaxed pt-0.5">
                {feat}
              </p>
            </div>
          );
        })}
      </div>
    </SectionBlock>
  );
}

// ─────────────────────────────────────────────────────────
//  Commit Timeline section
// ─────────────────────────────────────────────────────────

function CommitTimeline({ commits }) {
  const totalAdditions = commits.reduce((acc, c) => acc + (c.additions ?? 0), 0);
  const totalDeletions = commits.reduce((acc, c) => acc + (c.deletions ?? 0), 0);

  return (
    <SectionBlock icon={GitCommitHorizontal} title="Commit History">

      {/* Summary bar */}
      <div className="flex items-center gap-6 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border-muted)] rounded-xl mb-2">
        <div className="flex items-center gap-2">
          <GitCommitHorizontal size={13} strokeWidth={2} className="text-[var(--color-accent)]" />
          <span className="text-[13px] font-medium text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-mono)" }}>
            {commits.length}
          </span>
          <span className="text-[12px] text-[var(--color-text-subtle)]">commits</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-success)] font-medium">
          <span>+{totalAdditions.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-danger)] font-medium">
          <span>−{totalDeletions.toLocaleString()}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {commits.map((commit, index) => (
          <CommitItem
            key={commit.id}
            commit={commit}
            isLast={index === commits.length - 1}
          />
        ))}
      </div>
    </SectionBlock>
  );
}

// ─────────────────────────────────────────────────────────
//  Right Sidebar
// ─────────────────────────────────────────────────────────

function ProjectSidebar({ project }) {
  const langColor = languageColors[project.language] ?? "#8c959f";

  return (
    <aside className="flex flex-col gap-4">

      {/* About card */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 shadow-[var(--shadow-xs)]">
        <h3 className="text-[13px] font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border-muted)]">
          About
        </h3>
        <div className="flex flex-col gap-4">
          <SidebarRow
            icon={GitBranch}
            label="Default Branch"
            value={project.defaultBranch}
            valueClass="font-mono text-[var(--color-accent)]"
          />
          <SidebarRow
            icon={() => <Circle size={13} strokeWidth={0} fill={langColor} className="mt-0.5 shrink-0" />}
            label="Language"
            value={project.language}
          />
          <SidebarRow
            icon={Scale}
            label="License"
            value={project.license ?? "—"}
          />
          <SidebarRow
            icon={AlertCircle}
            label="Open Issues"
            value={project.openIssues}
          />
          <SidebarRow
            icon={HardDrive}
            label="Size"
            value={project.size ?? "—"}
          />
          <SidebarRow
            icon={Clock}
            label="Created"
            value={project.createdAt}
          />
          <SidebarRow
            icon={Clock}
            label="Updated"
            value={project.updatedAt}
          />
        </div>
      </div>

      {/* Stats card */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 shadow-[var(--shadow-xs)]">
        <h3 className="text-[13px] font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border-muted)]">
          Stats
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Star,    label: "Stars",    value: fmt(project.stars)    },
            { icon: GitFork, label: "Forks",    value: fmt(project.forks)    },
            { icon: Eye,     label: "Watchers", value: fmt(project.watchers) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-muted)]">
              <Icon size={13} strokeWidth={1.8} className="text-[var(--color-text-subtle)]" />
              <span className="text-[16px] font-semibold text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-mono)" }}>
                {value}
              </span>
              <span className="text-[10.5px] text-[var(--color-text-subtle)]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topics card */}
      {project.topics?.length > 0 && (
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 shadow-[var(--shadow-xs)]">
          <div className="flex items-center gap-1.5 mb-3">
            <Tag size={13} strokeWidth={1.8} className="text-[var(--color-text-subtle)]" />
            <h3 className="text-[13px] font-semibold text-[var(--color-text)]">Topics</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.topics.map((t) => (
              <span
                key={t}
                className="px-2.5 py-[4px] rounded-full text-[11.5px] font-medium bg-blue-50 text-blue-600 border border-blue-100 cursor-default hover:bg-blue-100 transition-colors duration-150"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author card */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 shadow-[var(--shadow-xs)]">
        <div className="flex items-center gap-1.5 mb-3">
          <FileText size={13} strokeWidth={1.8} className="text-[var(--color-text-subtle)]" />
          <h3 className="text-[13px] font-semibold text-[var(--color-text)]">Author</h3>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-9 h-9 rounded-full border border-[var(--color-border)]"
          />
          <div>
            <p className="text-[13px] font-semibold text-[var(--color-text)]">{profile.name}</p>
            <p className="text-[11.5px] text-[var(--color-text-subtle)]"
              style={{ fontFamily: "var(--font-mono)" }}>
              @{profile.username}
            </p>
          </div>
          <NavLink
            to="/"
            className="ml-auto text-[11.5px] text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
          >
            Profile <ExternalLink size={10} strokeWidth={2} />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────
//  RepoDetailPage
// ─────────────────────────────────────────────────────────

export default function RepoDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  // 404 guard
  if (!project) return <Navigate to="/repos" replace />;

  return (
    <div className="flex flex-col gap-6 page-enter pb-10">

      {/* ── Breadcrumb ──────────────────────────────── */}
      <Breadcrumb projectName={project.name} />

      {/* ── Project header ──────────────────────────── */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-[var(--shadow-xs)]">
        <ProjectHeader project={project} />
      </div>

      {/* ── Two-column body ─────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Left: main content ──────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-[var(--shadow-xs)]">
            <FeaturesSection project={project} />
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-[var(--shadow-xs)]">
            <ReadmeSection readme={project.readme} />
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-[var(--shadow-xs)]">
            <CommitTimeline commits={project.commits} />
          </div>
        </div>

        {/* ── Right: sidebar ──────────────────────── */}
        <div className="w-full lg:w-72 lg:sticky lg:top-[80px] shrink-0">
          <ProjectSidebar project={project} />
        </div>
      </div>
    </div>
  );
}

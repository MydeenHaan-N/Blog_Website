import { NavLink } from "react-router-dom";
import {
  MapPin,
  Mail,
  ExternalLink,
  FolderGit2,
  Link,
  Star,
  GitFork,
  ArrowRight,
  Trophy,
  BadgeCheck,
  Layers,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import {
  profile,
  skillCategories,
  achievements,
  certifications,
  projects,
  languageColors,
} from "../data/portfolioData";

// ─────────────────────────────────────────────────────────
//  Utility
// ─────────────────────────────────────────────────────────

const fmt = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ─────────────────────────────────────────────────────────
//  Micro components
// ─────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, linkTo, linkLabel }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          strokeWidth={2}
          className="text-[var(--color-accent)]"
        />
        <h2
          className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--color-text)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </h2>
      </div>
      {linkTo && (
        <NavLink
          to={linkTo}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-subtle)]"
        >
          {linkLabel ?? "View all"}
          <ArrowRight size={12} strokeWidth={2} />
        </NavLink>
      )}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[30px] border border-white/85 bg-white/84 p-7 shadow-[var(--shadow-sm)] backdrop-blur-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[var(--shadow-md)] ${className}`}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Section — Profile Header
// ─────────────────────────────────────────────────────────

function ProfileHeader() {
  const SOCIAL = [
    { href: profile.github,            icon: FolderGit2, label: "GitHub"   },
    { href: profile.linkedin,          icon: Link,       label: "LinkedIn" },
    { href: `mailto:${profile.email}`, icon: Mail,     label: "Email"    },
  ];

  return (
    <Card className="relative flex flex-col gap-8 overflow-hidden xl:flex-row xl:items-start">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_center,rgba(34,83,217,0.08),transparent_70%)]" />
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-24 w-24 rounded-[32px] border border-white bg-[linear-gradient(135deg,#e4edff_0%,#f8fbff_100%)] object-cover shadow-[var(--shadow-sm)]"
        />
        {profile.availableForWork && (
          <span
            className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-white bg-[var(--color-success)]"
            title="Open to work"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[var(--color-text)]">
            {profile.name}
          </h1>
          {profile.availableForWork && (
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-[var(--color-success-bg)] px-3 py-1 text-[12px] font-medium text-[var(--color-success)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              Open to work
            </span>
          )}
        </div>

        <p
          className="mb-4 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-subtle)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          @{profile.username} · {profile.title}
        </p>

        <p className="mb-6 max-w-2xl text-[16px] leading-8 text-[var(--color-text-muted)]">
          {profile.bio}
        </p>

        {/* Meta row */}
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--color-text-muted)]">
          {profile.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={12} strokeWidth={1.8} />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
            >
              <ExternalLink size={12} strokeWidth={1.8} />
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        {/* Social + CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {SOCIAL.filter((s) => s.href).map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-subtle)] transition-all duration-150 hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent)]"
            >
              <Icon size={15} strokeWidth={1.8} />
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-primary ml-1 px-6 py-3 text-[14px]"
          >
            <Mail size={13} strokeWidth={2} />
            Hire Me
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid shrink-0 grid-cols-2 gap-x-8 gap-y-5 sm:border-l sm:border-[var(--color-border-muted)] sm:pl-8 xl:min-w-[220px]">
        {Object.entries(profile.stats).map(([key, val]) => (
          <div key={key} className="flex flex-col gap-0.5">
            <span
              className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {val}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
              {key}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
//  Section — Skills
// ─────────────────────────────────────────────────────────

const TAG_STYLES = {
  Expert:     "bg-blue-50   text-blue-700   border-blue-200",
  Advanced:   "bg-indigo-50 text-indigo-700 border-indigo-200",
  Proficient: "bg-slate-50  text-slate-600  border-slate-200",
  Learning:   "bg-amber-50  text-amber-700  border-amber-200",
};

function SkillBar({ name, level, tag }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[var(--color-text)]">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`pill text-[10.5px] border ${TAG_STYLES[tag] ?? TAG_STYLES.Proficient}`}
          >
            {tag}
          </span>
          <span
            className="text-[11.5px] text-[var(--color-text-subtle)] w-8 text-right"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {level}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div className="h-[5px] w-full bg-[var(--color-border-muted)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-700"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <Card>
      <SectionHeader icon={Layers} title="Skills" linkTo="/skills" linkLabel="All skills" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {skillCategories.map((cat) => (
          <div key={cat.id}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
              {cat.icon} {cat.label}
            </p>
            <div className="flex flex-col gap-3">
              {cat.skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
//  Section — Achievements
// ─────────────────────────────────────────────────────────

function AchievementsSection() {
  return (
    <Card>
      <SectionHeader icon={Trophy} title="Achievements" />
      <div className="flex flex-col divide-y divide-[var(--color-border-muted)]">
        {achievements.map((a) => (
          <div key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <span className="text-[20px] leading-none mt-0.5 shrink-0">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="text-[13.5px] font-semibold text-[var(--color-text)]">
                  {a.title}
                </span>
                {a.highlight && (
                  <span className="pill bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-blue-200 text-[10px]">
                    Highlight
                  </span>
                )}
              </div>
              <p className="text-[12.5px] text-[var(--color-text-muted)] leading-relaxed">
                {a.description}
              </p>
            </div>
            <span
              className="text-[11px] text-[var(--color-text-subtle)] shrink-0 mt-0.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {a.date}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
//  Section — Certifications
// ─────────────────────────────────────────────────────────

function CertificationsSection() {
  const PREVIEW = certifications.slice(0, 4);

  return (
    <Card>
      <SectionHeader
        icon={BadgeCheck}
        title="Certifications"
        linkTo="/certifications"
        linkLabel="View all"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PREVIEW.map((cert) => (
          <div
            key={cert.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-[var(--color-border-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-all duration-150"
          >
            {/* Issuer logo */}
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-9 h-9 rounded-md border border-[var(--color-border-muted)] shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-[var(--color-text)] leading-snug mb-0.5 truncate">
                {cert.title}
              </p>
              <p className="text-[11.5px] text-[var(--color-text-muted)] truncate">
                {cert.issuer}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-subtle)]" style={{ fontFamily: "var(--font-mono)" }}>
                  <Calendar size={10} strokeWidth={2} />
                  {cert.date}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[var(--color-success)]">
                  <CheckCircle2 size={10} strokeWidth={2} />
                  {cert.expires === "Lifetime" ? "Lifetime" : `Exp. ${cert.expires}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
//  Section — Pinned Projects
// ─────────────────────────────────────────────────────────

function PinnedRepoCard({ project }) {
  const dotColor = languageColors[project.language] ?? "#8c959f";

  return (
    <NavLink
      to={`/repo/${project.id}`}
      className="block p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)] transition-all duration-200 no-underline group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FolderGit2 size={14} strokeWidth={1.8} className="shrink-0 text-[var(--color-text-subtle)]" />
          <span className="text-[13.5px] font-semibold text-[var(--color-accent)] truncate group-hover:underline">
            {project.name}
          </span>
        </div>
        <span className="pill text-[10px] border border-[var(--color-border)] text-[var(--color-text-subtle)] bg-[var(--color-surface)] shrink-0">
          {project.isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12.5px] text-[var(--color-text-muted)] leading-relaxed mb-3 line-clamp-2">
        {project.description}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.topics.slice(0, 3).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer meta */}
      <div className="flex items-center gap-4 text-[11.5px] text-[var(--color-text-subtle)]">
        <span className="flex items-center gap-1">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/50 shadow-sm"
            style={{ backgroundColor: dotColor }}
          />
          {project.language}
        </span>
        <span className="flex items-center gap-1">
          <Star size={11} strokeWidth={1.8} />
          {fmt(project.stars)}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={11} strokeWidth={1.8} />
          {fmt(project.forks)}
        </span>
        <span className="ml-auto" style={{ fontFamily: "var(--font-mono)" }}>
          {project.updatedAt}
        </span>
      </div>
    </NavLink>
  );
}

function PinnedProjectsSection() {
  const pinned = projects.filter((p) => p.isFeatured);

  return (
    <div>
      <SectionHeader
        icon={FolderGit2}
        title="Pinned Repositories"
        linkTo="/repos"
        linkLabel="All repos"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pinned.map((project) => (
          <PinnedRepoCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  ProfilePage
// ─────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-7 page-enter pb-10">
      <ProfileHeader />
      <SkillsSection />

      {/* Two-column grid for achievements + certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AchievementsSection />
        <CertificationsSection />
      </div>

      <PinnedProjectsSection />
    </div>
  );
}

import { MapPin, Mail, ExternalLink, FolderGit2, Link } from "lucide-react";
import { NavLink } from "react-router-dom";
import { profile, skillCategories } from "../data/portfolioData";

// ─────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: profile.github,            icon: FolderGit2, label: "GitHub"   },
  { href: profile.linkedin,          icon: Link,       label: "LinkedIn" },
  { href: profile.twitter,           icon: Link,       label: "Twitter"  },
  { href: `mailto:${profile.email}`, icon: Mail,     label: "Email"    },
];

// Flatten all skills into a single list, deduplicated, top 10 by level
const TOP_SKILLS = skillCategories
  .flatMap((cat) => cat.skills)
  .sort((a, b) => b.level - a.level)
  .slice(0, 10);

// ─────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────

function Divider() {
  return <hr className="border-none border-t border-[var(--color-border-muted)] my-0" />;
}

function SectionLabel({ children }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

// ── Avatar ────────────────────────────────────────────────
function Avatar() {
  return (
    <div className="relative w-fit">
      <img
        src={profile.avatar}
        alt={`${profile.name} avatar`}
        className="w-[72px] h-[72px] rounded-full border-2 border-[var(--color-border)] shadow-sm object-cover"
        loading="lazy"
      />
      {profile.availableForWork && (
        <span
          className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--color-success)] border-2 border-white"
          title="Open to work"
        />
      )}
    </div>
  );
}

// ── Profile identity block ─────────────────────────────────
function Identity() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-[16px] font-semibold text-[var(--color-text)] leading-tight">
        {profile.name}
      </h2>
      <p
        className="text-[12.5px] text-[var(--color-text-subtle)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        @{profile.username}
      </p>
      <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed mt-1">
        {profile.bio}
      </p>
    </div>
  );
}

// ── Meta (location, website) ──────────────────────────────
function Meta() {
  return (
    <div className="flex flex-col gap-2">
      {profile.location && (
        <div className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-text-muted)]">
          <MapPin size={13} strokeWidth={1.8} className="shrink-0 text-[var(--color-text-subtle)]" />
          {profile.location}
        </div>
      )}
      {profile.website && (
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-accent)] hover:underline w-fit"
        >
          <ExternalLink size={13} strokeWidth={1.8} className="shrink-0" />
          {profile.website.replace(/^https?:\/\//, "")}
        </a>
      )}
    </div>
  );
}

// ── Social links ──────────────────────────────────────────
function SocialLinks() {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {SOCIAL_LINKS.filter(({ href }) => href).map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] transition-all duration-150"
        >
          <Icon size={15} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}

// ── Skills badges ─────────────────────────────────────────
function SkillBadges() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Top Skills</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {TOP_SKILLS.map(({ name, tag }) => (
          <span
            key={name}
            title={`${name} — ${tag}`}
            className="inline-flex items-center px-2.5 py-[4px] rounded-full text-[11.5px] font-medium bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-blue-200 select-none cursor-default transition-all duration-150 hover:bg-blue-100"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {name}
          </span>
        ))}
      </div>
      <NavLink
        to="/skills"
        className="text-[12px] text-[var(--color-accent)] hover:underline w-fit"
      >
        View all skills →
      </NavLink>
    </div>
  );
}

// ── Stats grid ────────────────────────────────────────────
function StatsGrid() {
  const stats = [
    { label: "Projects",       value: profile.stats.projects       },
    { label: "Contributions",  value: profile.stats.contributions  },
    { label: "Experience",     value: profile.stats.experience     },
    { label: "Certifications", value: profile.stats.certifications },
  ];

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Stats</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span
              className="text-[17px] font-medium text-[var(--color-text)] leading-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {value}
            </span>
            <span className="text-[11px] text-[var(--color-text-subtle)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Sidebar
// ─────────────────────────────────────────────────────────

export default function Sidebar() {
  return (
    <aside className="sticky top-[72px] self-start w-64 shrink-0">
      <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[var(--shadow-xs)]">

        {/* ── Profile header ───────────────────────────── */}
        <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
          <Avatar />
          <Identity />
          <Meta />
          <SocialLinks />
        </div>

        <Divider />

        {/* ── Skills ───────────────────────────────────── */}
        <div className="px-5 py-4">
          <SkillBadges />
        </div>

        <Divider />

        {/* ── Stats ────────────────────────────────────── */}
        <div className="px-5 py-4">
          <StatsGrid />
        </div>

        {/* ── Availability footer ───────────────────────── */}
        {profile.availableForWork && (
          <>
            <Divider />
            <div className="px-5 py-3">
              <a
                href={`mailto:${profile.email}`}
                className="w-full btn btn-primary text-[13px] justify-center"
              >
                <Mail size={13} strokeWidth={2} />
                Hire Me
              </a>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

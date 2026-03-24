import { NavLink } from "react-router-dom";
import { Star, GitFork, Eye, Circle, Lock, Unlock } from "lucide-react";
import { languageColors } from "../data/portfolioData";

// ─────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────

const fmt = (n) =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n);

// ─────────────────────────────────────────────────────────
//  RepoCard
// ─────────────────────────────────────────────────────────

export default function RepoCard({ project }) {
  const {
    id,
    name,
    description,
    language,
    stars,
    forks,
    watchers,
    topics,
    isPublic,
    license,
    updatedAt,
  } = project;

  const langColor = languageColors[language] ?? "#8c959f";

  return (
    <NavLink
      to={`/repo/${id}`}
      className="group flex flex-col justify-between gap-4 p-5 bg-white rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-accent)] transition-all duration-200 no-underline"
    >
      {/* ── Top ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3">

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Visibility icon */}
            {isPublic
              ? <Unlock size={13} strokeWidth={1.8} className="shrink-0 text-[var(--color-text-subtle)]" />
              : <Lock    size={13} strokeWidth={1.8} className="shrink-0 text-[var(--color-text-subtle)]" />
            }
            <span className="text-[14px] font-semibold text-[var(--color-accent)] truncate group-hover:underline">
              {name}
            </span>
          </div>

          {/* Public / Private pill */}
          <span
            className={[
              "pill shrink-0 border text-[10.5px]",
              isPublic
                ? "bg-[var(--color-surface)] text-[var(--color-text-subtle)] border-[var(--color-border)]"
                : "bg-amber-50 text-amber-700 border-amber-200",
            ].join(" ")}
          >
            {isPublic ? "Public" : "Private"}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Topics */}
        {topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-[3px] rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
              >
                {topic}
              </span>
            ))}
            {topics.length > 4 && (
              <span className="px-2.5 py-[3px] rounded-full text-[11px] text-[var(--color-text-subtle)] bg-[var(--color-surface)] border border-[var(--color-border-muted)]">
                +{topics.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom meta ──────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--color-border-muted)]">

        {/* Language */}
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
          <Circle
            size={11}
            strokeWidth={0}
            fill={langColor}
            className="shrink-0"
          />
          <span style={{ fontFamily: "var(--font-sans)" }}>{language}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[12px] text-[var(--color-text-subtle)]">
          <span className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors">
            <Star size={12} strokeWidth={1.8} />
            <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(stars)}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={12} strokeWidth={1.8} />
            <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(forks)}</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} strokeWidth={1.8} />
            <span style={{ fontFamily: "var(--font-mono)" }}>{fmt(watchers)}</span>
          </span>
        </div>

        {/* Updated */}
        <span
          className="text-[11px] text-[var(--color-text-subtle)] hidden sm:inline shrink-0"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {updatedAt}
        </span>
      </div>
    </NavLink>
  );
}

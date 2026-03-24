import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, FolderGit2, Star } from "lucide-react";
import { projects, languageColors } from "../data/portfolioData";
import RepoCard from "../components/RepoCard";

// ─────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "updated", label: "Recently updated" },
  { value: "stars",   label: "Most stars"       },
  { value: "forks",   label: "Most forks"       },
  { value: "name",    label: "Name (A–Z)"       },
];

const ALL_LANGUAGES = ["All", ...Object.keys(languageColors)].filter(
  (lang) => lang === "All" || projects.some((p) => p.language === lang)
);

// ─────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────

function PageHeader({ total }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <FolderGit2 size={18} strokeWidth={1.8} className="text-[var(--color-accent)]" />
        <h1 className="text-[18px] font-semibold text-[var(--color-text)]">
          Repositories
        </h1>
        <span
          className="ml-1 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[var(--color-surface)] text-[var(--color-text-subtle)] border border-[var(--color-border)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {total}
        </span>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={14}
        strokeWidth={2}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] pointer-events-none"
      />
      <input
        type="text"
        placeholder="Find a repository…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-9 text-[13.5px]"
      />
    </div>
  );
}

function LanguageFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {ALL_LANGUAGES.map((lang) => {
        const isActive = selected === lang;
        const dotColor = languageColors[lang];

        return (
          <button
            key={lang}
            onClick={() => onChange(lang)}
            className={[
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150 cursor-pointer",
              isActive
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-white text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
            ].join(" ")}
          >
            {dotColor && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? "#fff" : dotColor }}
              />
            )}
            {lang}
          </button>
        );
      })}
    </div>
  );
}

function SortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal size={13} strokeWidth={2} className="text-[var(--color-text-subtle)] shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input w-auto text-[13px] pr-8 cursor-pointer"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatsStrip({ repos }) {
  const totalStars = repos.reduce((acc, p) => acc + p.stars, 0);
  const totalForks = repos.reduce((acc, p) => acc + p.forks, 0);

  const stats = [
    { label: "Repositories", value: repos.length },
    { label: "Total Stars",  value: totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1)}k` : totalStars },
    { label: "Total Forks",  value: totalForks },
  ];

  return (
    <div className="flex items-center gap-6 px-5 py-3 bg-[var(--color-surface)] border border-[var(--color-border-muted)] rounded-xl mb-2">
      {stats.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Star size={13} strokeWidth={1.8} className="text-[var(--color-accent)]" />
          <span
            className="text-[14px] font-semibold text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {value}
          </span>
          <span className="text-[12px] text-[var(--color-text-subtle)]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4 border border-[var(--color-border)]">
        <FolderGit2 size={22} strokeWidth={1.5} className="text-[var(--color-text-subtle)]" />
      </div>
      <p className="text-[15px] font-semibold text-[var(--color-text)] mb-1">
        No repositories found
      </p>
      <p className="text-[13px] text-[var(--color-text-muted)]">
        {query
          ? `No results matching "${query}". Try a different search.`
          : "No repositories match the current filter."}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  RepoListPage
// ─────────────────────────────────────────────────────────

export default function RepoListPage() {
  const [query,    setQuery]    = useState("");
  const [language, setLanguage] = useState("All");
  const [sort,     setSort]     = useState("updated");

  // ── Filter + sort ─────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Language filter
    if (language !== "All") {
      result = result.filter((p) => p.language === language);
    }

    // Sort
    switch (sort) {
      case "stars":
        result.sort((a, b) => b.stars - a.stars);
        break;
      case "forks":
        result.sort((a, b) => b.forks - a.forks);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // "updated" — preserve original order (most recent first)
        break;
    }

    return result;
  }, [query, language, sort]);

  return (
    <div className="flex flex-col gap-5 page-enter pb-8">

      {/* ── Page header ──────────────────────────────── */}
      <PageHeader total={projects.length} />

      {/* ── Stats strip ──────────────────────────────── */}
      <StatsStrip repos={projects} />

      {/* ── Controls ─────────────────────────────────── */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3 shadow-[var(--shadow-xs)]">

        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {/* Language filter */}
        <LanguageFilter selected={language} onChange={setLanguage} />
      </div>

      {/* ── Results count ────────────────────────────── */}
      {(query || language !== "All") && (
        <p className="text-[12.5px] text-[var(--color-text-subtle)] -mt-1 px-1">
          Showing{" "}
          <span className="font-medium text-[var(--color-text)]" style={{ fontFamily: "var(--font-mono)" }}>
            {filtered.length}
          </span>{" "}
          of{" "}
          <span style={{ fontFamily: "var(--font-mono)" }}>{projects.length}</span> repositories
        </p>
      )}

      {/* ── Grid ─────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <RepoCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState query={query} />
      )}
    </div>
  );
}

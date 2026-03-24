import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FolderGit2, Menu, X } from "lucide-react";
import { profile } from "../data/portfolioData";

// ─────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { to: "/",      label: "Profile",       end: true  },
  { to: "/repos", label: "Repositories",  end: false },
];

// ─────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────

/** Returns Tailwind classes for a nav link based on active state */
const linkClass = (isActive) =>
  [
    "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md",
    "text-[13.5px] font-medium transition-all duration-150 no-underline",
    isActive
      ? "text-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]",
  ].join(" ");

// ─────────────────────────────────────────────────────────
//  Navbar
// ─────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)]"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      {/* ── Main bar ─────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">

        {/* Left — Logo + name */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 no-underline shrink-0 group"
        >
          <span className="w-[28px] h-[28px] rounded-[6px] bg-[var(--color-accent)] flex items-center justify-center shadow-sm group-hover:bg-[var(--color-accent-hover)] transition-colors duration-150">
            <FolderGit2 size={15} color="#fff" strokeWidth={2.2} />
          </span>

          <span
            className="text-[15px] font-semibold text-[var(--color-text)] leading-none tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {profile.username}
          </span>

          <span
            className="hidden sm:inline text-[13px] text-[var(--color-text-subtle)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            / portfolio
          </span>
        </NavLink>

        {/* Right — Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => linkClass(isActive)}
            >
              {label}

              {/* Active underline accent */}
              <span
                className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--color-accent)] transition-opacity duration-150"
                style={{
                  opacity: "var(--_active-bar, 0)",
                }}
              />
            </NavLink>
          ))}

          {/* Availability badge */}
          {profile.availableForWork && (
            <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full text-[11px] font-medium bg-[var(--color-success-bg)] text-[var(--color-success)] border border-green-200 select-none">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-success)] animate-pulse" />
              Open to work
            </span>
          )}
        </nav>

        {/* Mobile — hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="sm:hidden p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors duration-150"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────── */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-[var(--color-border-muted)] bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                [
                  linkClass(isActive),
                  "w-full justify-start px-3 py-2 text-[14px]",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}

          {profile.availableForWork && (
            <div className="pt-2 pb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full text-[11px] font-medium bg-[var(--color-success-bg)] text-[var(--color-success)] border border-green-200">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-success)] animate-pulse" />
                Open to work
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

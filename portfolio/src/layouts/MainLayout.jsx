import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  UserCircle,
  FolderGit2,
  Layers,
  Award,
  Link,
  Mail,
  Menu,
  X,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { profile } from "../data/portfolioData";

const NAV_ITEMS = [
  { to: "/", label: "Profile", icon: UserCircle },
  { to: "/repos", label: "Repositories", icon: FolderGit2 },
  { to: "/skills", label: "Skills", icon: Layers },
  { to: "/certs", label: "Certifications", icon: Award },
];

const SOCIAL_LINKS = [
  { href: profile.github, icon: FolderGit2, label: "GitHub" },
  { href: profile.linkedin, icon: Link, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

function Navbar({ onMenuToggle, menuOpen }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/60 bg-white/72 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex h-[78px] max-w-[1380px] items-center justify-between gap-4 px-4 md:px-6">
        <NavLink to="/" className="group flex items-center gap-3 text-[var(--color-text)] no-underline">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2d6df6_0%,#1d4ed8_100%)] shadow-[0_14px_28px_rgba(34,83,217,0.25)]">
            <FolderGit2 size={16} color="#fff" strokeWidth={2.2} />
          </span>
          <div className="flex flex-col">
            <span className="text-[17px] font-semibold tracking-[-0.02em]">{profile.username}</span>
            <span className="hidden text-[12px] text-[var(--color-text-subtle)] sm:inline">
              personal developer portfolio
            </span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2 py-2 shadow-[var(--shadow-xs)] backdrop-blur md:flex">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `nav-link text-[13px] ${isActive ? "active" : ""}`}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {profile.availableForWork && (
            <span className="hidden items-center gap-2 rounded-full border border-green-200/80 bg-[var(--color-success-bg)] px-3.5 py-2 text-[12px] font-medium text-[var(--color-success)] shadow-[var(--shadow-xs)] sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              Open to work
            </span>
          )}

          <button onClick={onMenuToggle} aria-label="Toggle menu" className="btn btn-ghost p-3 md:hidden">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ onClose }) {
  return (
    <aside className="flex w-72 shrink-0 flex-col gap-0">
      <div className="border-b border-[var(--color-border-muted)] p-6">
        <div className="mb-5">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-20 w-20 rounded-[28px] border border-white bg-[linear-gradient(135deg,#e4edff_0%,#f8fbff_100%)] object-cover shadow-[var(--shadow-sm)]"
          />
        </div>

        <h2 className="mb-1 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-text)]">
          {profile.name}
        </h2>
        <p className="mb-3 text-[12.5px] text-[var(--color-text-subtle)]" style={{ fontFamily: "var(--font-mono)" }}>
          @{profile.username}
        </p>
        <p className="mb-5 text-[14px] leading-7 text-[var(--color-text-muted)]">{profile.bio}</p>

        <div className="mb-5 flex items-center gap-2 text-[12.5px] text-[var(--color-text-subtle)]">
          <MapPin size={12} strokeWidth={2} />
          {profile.location}
        </div>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-base flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-subtle)] hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent)]"
            >
              <Icon size={15} strokeWidth={1.8} />
            </a>
          ))}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="transition-base flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-subtle)] hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent)]"
            >
              <ExternalLink size={15} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 p-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onClose}
            className={({ isActive }) => `nav-link w-full text-[13px] ${isActive ? "active" : ""}`}
          >
            <Icon size={15} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-[var(--color-border-muted)] bg-[linear-gradient(180deg,rgba(248,251,255,0)_0%,rgba(248,251,255,0.9)_100%)] p-5">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(profile.stats).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-[20px] font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-mono)" }}>
                {val}
              </span>
              <span className="text-[11px] capitalize tracking-wide text-[var(--color-text-subtle)]">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar onMenuToggle={toggleMobileMenu} menuOpen={mobileMenuOpen} />

      <div className="relative mx-auto flex w-full max-w-[1380px] flex-1 gap-7 px-4 py-8 md:px-6">
        <div className="hidden md:flex">
          <div className="sticky top-[104px] flex h-[calc(100vh-8rem)] w-72 self-start flex-col overflow-y-auto rounded-[30px] border border-white/80 bg-white/82 shadow-[var(--shadow-sm)] backdrop-blur-xl">
            <Sidebar onClose={closeMobileMenu} />
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={closeMobileMenu} />
            <div className="fixed bottom-0 left-0 top-[78px] z-40 flex w-72 flex-col overflow-y-auto border-r border-[var(--color-border)] bg-white/95 shadow-[var(--shadow-lg)] backdrop-blur-xl md:hidden">
              <Sidebar onClose={closeMobileMenu} />
            </div>
          </>
        )}

        <div className="page-enter flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

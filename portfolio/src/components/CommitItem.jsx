import { GitCommitHorizontal } from "lucide-react";

// ─────────────────────────────────────────────────────────
//  CommitItem
//
//  A single vertical timeline entry.
//
//  Props:
//    commit  — { hash, message, author, date, additions,
//                deletions, image? }
//    isLast  — boolean — hides the connector line on the
//               final item so the spine doesn't dangle
// ─────────────────────────────────────────────────────────

export default function CommitItem({ commit, isLast = false }) {
  const { hash, message, author, date, additions, deletions, image } = commit;

  // ── Conventional-commit type detection ───────────────
  const getType = (msg = "") => {
    const m = msg.toLowerCase();
    if (m.startsWith("feat"))     return { label: "feat",     color: "bg-blue-500"   };
    if (m.startsWith("fix"))      return { label: "fix",      color: "bg-red-500"    };
    if (m.startsWith("chore"))    return { label: "chore",    color: "bg-slate-400"  };
    if (m.startsWith("docs"))     return { label: "docs",     color: "bg-amber-500"  };
    if (m.startsWith("test"))     return { label: "test",     color: "bg-purple-500" };
    if (m.startsWith("refactor")) return { label: "refactor", color: "bg-teal-500"   };
    if (m.startsWith("init"))     return { label: "init",     color: "bg-green-500"  };
    if (m.startsWith("security")) return { label: "security", color: "bg-orange-500" };
    return                               { label: "commit",   color: "bg-[var(--color-accent)]" };
  };

  const type = getType(message);

  // Strip the prefix for a cleaner display message
  const displayMessage = message.replace(
    /^(feat|fix|chore|docs|test|refactor|init|security)(\([^)]+\))?:\s*/i,
    ""
  );

  return (
    <div className="relative flex gap-4 group">

      {/* ── Spine column ─────────────────────────────── */}
      <div className="relative flex flex-col items-center">

        {/* Blue dot indicator */}
        <div
          className={[
            "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            "bg-white border-2 border-[var(--color-border)]",
            "group-hover:border-[var(--color-accent)] transition-colors duration-150",
          ].join(" ")}
        >
          {/* Coloured inner pip */}
          <span
            className={`w-2.5 h-2.5 rounded-full ${type.color} opacity-90`}
          />
        </div>

        {/* Left border connector line */}
        {!isLast && (
          <div className="w-[2px] flex-1 mt-1 bg-[var(--color-border-muted)] min-h-[24px]" />
        )}
      </div>

      {/* ── Content card ─────────────────────────────── */}
      <div className="flex-1 min-w-0 pb-5">
        <div
          className={[
            "bg-white rounded-xl border border-[var(--color-border)]",
            "shadow-[var(--shadow-xs)] p-4",
            "group-hover:border-[var(--color-accent)]",
            "group-hover:shadow-[var(--shadow-sm)]",
            "transition-all duration-200",
          ].join(" ")}
        >

          {/* ── Message + type badge ─────────────────── */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <span
              className={[
                "pill border text-[10.5px] shrink-0",
                "bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border-blue-200",
              ].join(" ")}
            >
              <GitCommitHorizontal size={10} strokeWidth={2.2} />
              {type.label}
            </span>
            <p className="flex-1 min-w-0 text-[13.5px] font-medium text-[var(--color-text)] leading-snug">
              {displayMessage}
            </p>
          </div>

          {/* ── Meta row: hash · author · date ───────── */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px]">
            <span
              className="text-[var(--color-accent)] hover:underline cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
              title={`Commit ${hash}`}
            >
              {hash}
            </span>

            <span className="text-[var(--color-text-muted)]">
              by{" "}
              <span className="font-medium text-[var(--color-text)]">{author}</span>
            </span>

            <span
              className="ml-auto text-[var(--color-text-subtle)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {date}
            </span>
          </div>

          {/* ── Diff stats ───────────────────────────── */}
          {(additions != null || deletions != null) && (
            <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-[var(--color-border-muted)]">
              {additions != null && (
                <span className="text-[11.5px] font-medium text-[var(--color-success)]">
                  +{additions}
                </span>
              )}
              {deletions != null && (
                <span className="text-[11.5px] font-medium text-[var(--color-danger)]">
                  −{deletions}
                </span>
              )}
              {/* Proportional diff bar */}
              {additions != null && deletions != null && (() => {
                const total = additions + deletions;
                if (total === 0) return null;
                const addPct = (additions / total) * 100;
                return (
                  <div className="flex-1 h-[5px] rounded-full overflow-hidden bg-[var(--color-border-muted)] max-w-[72px]">
                    <div
                      className="h-full bg-[var(--color-success)] float-left"
                      style={{ width: `${addPct}%` }}
                    />
                    <div
                      className="h-full bg-[var(--color-danger)]"
                      style={{ width: `${100 - addPct}%` }}
                    />
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── Optional screenshot / image ──────────── */}
          {image && (
            <div className="mt-3 pt-3 border-t border-[var(--color-border-muted)]">
              <img
                src={image}
                alt={`Screenshot for: ${displayMessage}`}
                className="w-full rounded-lg border border-[var(--color-border)] object-cover max-h-48 bg-[var(--color-surface)]"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
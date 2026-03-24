import { Layers, ArrowRight } from "lucide-react";
import skillCategories from "../data/skills";

const TAG_STYLES = {
  Expert: "bg-blue-50 text-blue-700 border-blue-200",
  Advanced: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Proficient: "bg-slate-50 text-slate-600 border-slate-200",
  Learning: "bg-amber-50 text-amber-700 border-amber-200",
};

function SkillRow({ skill }) {
  return (
    <div className="flex flex-col gap-2 rounded-[22px] border border-[var(--color-border-muted)] bg-white/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-[var(--color-text)]">{skill.name}</span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
            proficiency
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`pill border text-[10.5px] ${TAG_STYLES[skill.tag] ?? TAG_STYLES.Proficient}`}>
            {skill.tag}
          </span>
          <span className="text-[12px] text-[var(--color-text-subtle)]" style={{ fontFamily: "var(--font-mono)" }}>
            {skill.level}%
          </span>
        </div>
      </div>
      <div className="h-[7px] w-full overflow-hidden rounded-full bg-[var(--color-border-muted)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#2d6df6_0%,#2253d9_100%)]"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <section className="rounded-[30px] border border-white/85 bg-white/84 p-7 shadow-[var(--shadow-sm)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]" style={{ fontFamily: "var(--font-mono)" }}>
            {category.icon}
          </p>
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">{category.label}</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-7 text-[var(--color-text-muted)]">{category.summary}</p>
        </div>
        <span className="pill border border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] text-[var(--color-text-subtle)]">
          {category.skills.length} skills
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {category.skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export default function SkillsPage() {
  const totalSkills = skillCategories.reduce((sum, category) => sum + category.skills.length, 0);

  return (
    <div className="flex flex-col gap-7 pb-10 page-enter">
      <section className="rounded-[34px] border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(234,242,255,0.88)_100%)] px-7 py-8 shadow-[var(--shadow-sm)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2d6df6_0%,#2253d9_100%)] text-white shadow-[0_14px_30px_rgba(34,83,217,0.24)]">
                <Layers size={20} strokeWidth={2} />
              </span>
              <span className="pill border border-[var(--color-border)] bg-white/70 text-[12px] text-[var(--color-text-subtle)]">
                Skills overview
              </span>
            </div>
            <h1 className="text-[38px] font-semibold tracking-[-0.04em] text-[var(--color-text)]">Skills & technical strengths</h1>
            <p className="mt-3 text-[16px] leading-8 text-[var(--color-text-muted)]">
              A breakdown of the tools and engineering areas I work in most often, with emphasis on product delivery,
              maintainability, and performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start lg:self-auto">
            <div className="rounded-[24px] border border-white/80 bg-white/80 px-5 py-4 shadow-[var(--shadow-xs)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Categories</p>
              <p className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">{skillCategories.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/80 bg-white/80 px-5 py-4 shadow-[var(--shadow-xs)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Skills</p>
              <p className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">{totalSkills}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {skillCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <section className="rounded-[28px] border border-[var(--color-border)] bg-white/75 px-6 py-5 shadow-[var(--shadow-xs)]">
        <a href="mailto:alex@example.com" className="inline-flex items-center gap-2 text-[15px] font-medium text-[var(--color-accent)]">
          Want a deeper technical walkthrough?
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </section>
    </div>
  );
}

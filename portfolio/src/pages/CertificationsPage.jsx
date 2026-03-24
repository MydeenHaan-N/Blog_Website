import { BadgeCheck, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import certifications from "../data/certifications";

function CertificationCard({ cert }) {
  return (
    <article className="rounded-[30px] border border-white/85 bg-white/84 p-6 shadow-[var(--shadow-sm)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <img
          src={cert.issuerLogo}
          alt={cert.issuer}
          className="h-14 w-14 rounded-2xl border border-[var(--color-border-muted)] object-cover shadow-[var(--shadow-xs)]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">{cert.title}</h2>
              <p className="mt-1 text-[14px] text-[var(--color-text-muted)]">{cert.issuer}</p>
            </div>
            <span className="pill border border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] text-[var(--color-text-subtle)]">
              {cert.expires === "Lifetime" ? "Lifetime" : `Expires ${cert.expires}`}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[var(--color-text-subtle)]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={2} />
              Issued {cert.date}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} strokeWidth={2} className="text-[var(--color-success)]" />
              Credential ID {cert.credentialId}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-accent)] hover:underline"
          >
            Verify issuer
            <ExternalLink size={13} strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CertificationsPage() {
  const activeCount = certifications.filter((cert) => cert.expires !== "Lifetime").length;

  return (
    <div className="flex flex-col gap-7 pb-10 page-enter">
      <section className="rounded-[34px] border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(240,247,255,0.88)_100%)] px-7 py-8 shadow-[var(--shadow-sm)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2d6df6_0%,#2253d9_100%)] text-white shadow-[0_14px_30px_rgba(34,83,217,0.24)]">
                <BadgeCheck size={20} strokeWidth={2} />
              </span>
              <span className="pill border border-[var(--color-border)] bg-white/70 text-[12px] text-[var(--color-text-subtle)]">
                Certifications
              </span>
            </div>
            <h1 className="text-[38px] font-semibold tracking-[-0.04em] text-[var(--color-text)]">Professional certifications</h1>
            <p className="mt-3 text-[16px] leading-8 text-[var(--color-text-muted)]">
              Credentials across cloud, security, delivery, and systems work that support the engineering profile shown in the portfolio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start lg:self-auto">
            <div className="rounded-[24px] border border-white/80 bg-white/80 px-5 py-4 shadow-[var(--shadow-xs)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Total</p>
              <p className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">{certifications.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/80 bg-white/80 px-5 py-4 shadow-[var(--shadow-xs)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Expiring</p>
              <p className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">{activeCount}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}

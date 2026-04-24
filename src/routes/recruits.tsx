import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/recruits")({
  head: () => ({
    meta: [
      { title: "SPBA / Recruiting" },
      {
        name: "description",
        content:
          "Apply to join Saint Peters Basketball Academy. Our recruiting process develops student-athletes for the next level with lion-hearted standards.",
      },
      { property: "og:title", content: "SPBA / Recruiting" },
      { property: "og:description", content: "Join the pride. Build your future." },
    ],
  }),
  component: RecruitsPage,
});

const requirements = [
  "Minimum 3.0 GPA in core academic courses",
  "Verified game film (full game minimum)",
  "Two coaching references",
  "Athletic resume with stats and awards",
  "Completed online application",
];

function RecruitsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Class of 2026 & 2027"
        title="Join the Pride"
        subtitle="We recruit student-athletes who compete with discipline, train with purpose, and lead with lion-hearted character."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
              Requirements
            </div>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">What we look for</h2>
            <ul className="mt-8 space-y-4">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground/90">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="rounded-sm border border-border bg-card/30 p-8">
            <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
              Application
            </div>
            <h3 className="mt-2 font-display text-3xl uppercase">Get Started</h3>
            <div className="mt-6 grid gap-4">
              {[
                { label: "Full Name", type: "text", placeholder: "John Smith" },
                { label: "Email", type: "email", placeholder: "you@example.com" },
                { label: "Graduation Year", type: "text", placeholder: "2026" },
                { label: "Position", type: "text", placeholder: "Point Guard" },
                { label: "Height", type: "text", placeholder: "6'2\"" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Tell us about your game
                </label>
                <textarea
                  rows={4}
                  className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="mt-2 w-full rounded-sm bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

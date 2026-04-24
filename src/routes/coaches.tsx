import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/lib/supabase/client";
import type { AcademyCoach } from "@/lib/supabase/types";

export const Route = createFileRoute("/coaches")({
  head: () => ({
    meta: [
      { title: "SPBA / Coaches" },
      {
        name: "description",
        content: "Meet the Lion Pride staff guiding Saint Peters Basketball Academy athletes and families.",
      },
      { property: "og:title", content: "SPBA / Coaches" },
      { property: "og:description", content: "Meet the coaches behind the Lions." },
    ],
  }),
  component: CoachesPage,
});

function CoachesPage() {
  const [coaches, setCoaches] = useState<AcademyCoach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCoaches() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("academy_coaches")
        .select("id,name,title,years,bio,display_order,is_active,headshot_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (fetchError) {
        console.error("Failed to load coaches", fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setCoaches(data ?? []);
      setError(null);
      setLoading(false);
    }

    void fetchCoaches();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="Leadership"
        title="Coaching Staff"
        subtitle="The minds and mentors building the next generation of Saint Peters Lions."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
              Loading coaches from Supabase…
            </div>
          ) : error ? (
            <div className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-destructive">
              Unable to load coaches right now.
            </div>
          ) : coaches.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border/60 bg-card/20 p-8 text-sm text-muted-foreground">
              No coaches published yet. Add them from the admin dashboard to populate this page.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coaches.map((coach) => (
                <article
                  key={coach.id}
                  className="rounded-sm border border-border bg-card/20 p-6 transition-transform hover:-translate-y-1 hover:border-primary"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-primary/20 via-primary/10 to-primary/40">
                    {coach.headshot_url && (
                      <img src={coach.headshot_url} alt={coach.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="mt-5 font-display text-2xl uppercase">{coach.name}</div>
                  <div className="mt-1 text-sm font-semibold text-primary">{coach.title}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {coach.years}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{coach.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

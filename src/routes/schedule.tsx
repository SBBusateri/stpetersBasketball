import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/lib/supabase/client";
import type { AcademySession } from "@/lib/supabase/types";
import { formatSessionDate, formatSessionTime } from "@/lib/academy/formatters";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Academy Schedule — Reign Basketball" },
      {
        name: "description",
        content: "View every Reign Basketball academy session and training opportunity pulled straight from Supabase.",
      },
      { property: "og:title", content: "Academy Schedule — Reign Athletics" },
      { property: "og:description", content: "Upcoming and completed Reign Basketball academy sessions." },
    ],
  }),
  component: SchedulePage,
});

const fallbackSessions: AcademySession[] = [
  {
    id: "fallback-1",
    title: "Spring Academy Kickoff",
    description: "Footwork, ball control, and confidence-building reps.",
    level: "Grades 3-4",
    session_date: "2025-05-12",
    start_time: "17:30",
    end_time: "19:00",
    location: "Reign Training Center",
    display_order: 1,
    is_active: true,
  },
  {
    id: "fallback-2",
    title: "Shooter's Lab",
    description: "Shot mechanics, spacing, and decision-making.",
    level: "Grades 5-6",
    session_date: "2025-05-19",
    start_time: "18:00",
    end_time: "19:30",
    location: "Reign Training Center",
    display_order: 2,
    is_active: true,
  },
  {
    id: "fallback-3",
    title: "Elite Guard Workshop",
    description: "Advanced reads, ball screens, and leadership reps.",
    level: "Grades 7-8",
    session_date: "2025-05-26",
    start_time: "18:30",
    end_time: "20:00",
    location: "Reign Performance Lab",
    display_order: 3,
    is_active: true,
  },
  {
    id: "fallback-4",
    title: "Parents Info Night",
    description: "Academy pathway, feeder program timeline, and Q&A.",
    level: "Families",
    session_date: "2025-06-02",
    start_time: "18:00",
    end_time: "19:00",
    location: "Reign Training Center",
    display_order: 4,
    is_active: true,
  },
];

type Filter = "all" | "upcoming" | "completed";

function getSessionStatus(session: AcademySession): Filter {
  const date = new Date(`${session.session_date}T${session.end_time || "00:00"}`);
  if (Number.isNaN(date.getTime())) {
    return "upcoming";
  }

  const now = new Date();
  return date < now ? "completed" : "upcoming";
}

function SchedulePage() {
  const [sessions, setSessions] = useState<AcademySession[]>(fallbackSessions);
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSessions() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("academy_sessions")
        .select(
          "id,title,description,level,session_date,start_time,end_time,location,display_order,is_active",
        )
        .order("display_order", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setError(null);
      setSessions(data ?? []);
      setLoading(false);
    }

    void fetchSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  const orderedSessions = useMemo(() => {
    return [...sessions]
      .filter((session) => session.is_active !== false)
      .sort((a, b) => {
        if (a.session_date === b.session_date) {
          return a.display_order - b.display_order;
        }
        return a.session_date.localeCompare(b.session_date);
      });
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    if (filter === "all") {
      return orderedSessions;
    }
    return orderedSessions.filter((session) => getSessionStatus(session) === filter);
  }, [filter, orderedSessions]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Academy"
        title="Schedule"
        subtitle="Live view of every academy session straight from the admin dashboard."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 inline-flex rounded-sm border border-border bg-card/40 p-1">
            {["upcoming", "all", "completed"].map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value as Filter)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === value ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {error && !loading && (
            <div className="mb-6 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-full rounded-sm border border-border bg-card/20 p-6">
                  <div className="h-4 w-24 animate-pulse rounded-sm bg-border/60" />
                  <div className="mt-4 h-6 w-3/4 animate-pulse rounded-sm bg-border/50" />
                  <div className="mt-2 h-20 w-full animate-pulse rounded-sm bg-border/40" />
                </div>
              ))
            ) : filteredSessions.length === 0 ? (
              <div className="rounded-sm border border-dashed border-border/60 bg-card/20 p-8 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3 xl:col-span-4">
                No sessions match this view right now. Adjust the filter or add new sessions in the admin dashboard.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const status = getSessionStatus(session);
                return (
                  <article
                    key={session.id}
                    className="flex h-full flex-col justify-between rounded-sm border border-border bg-card/30 p-6 transition-colors hover:border-primary hover:bg-card"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
                          {formatSessionDate(session.session_date)}
                        </div>
                        <span
                          className={`rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.3em] ${
                            status === "completed"
                              ? "bg-muted/40 text-muted-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl uppercase leading-tight">{session.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{session.description}</p>
                    </div>
                    <div className="mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      <div>{session.level}</div>
                      <div className="mt-1 tracking-[0.2em]">
                        {formatSessionTime(session.start_time)} – {formatSessionTime(session.end_time)}
                      </div>
                      <div className="mt-1 text-[10px] tracking-[0.3em] text-foreground/70">{session.location}</div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import heroArena from "@/assets/hero-arena.jpg";
import playerAction from "@/assets/player-action.jpg";
import { supabase } from "@/lib/supabase/client";
import type { AcademyHighlight, AcademySession, SiteSectionSetting } from "@/lib/supabase/types";
import { formatSessionDate, formatSessionTime } from "@/lib/academy/formatters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reign Basketball Academy" },
      {
        name: "description",
        content:
          "Youth development hub for Reign Athletics — academy sessions, coaching, and the future feeder program.",
      },
      { property: "og:title", content: "Reign Basketball Academy" },
      {
        property: "og:description",
        content: "Building the next generation of Reign Basketball through structured academy training.",
      },
    ],
  }),
  component: Home,
});

const fallbackHighlights: AcademyHighlight[] = [
  {
    id: "local-1",
    title: "Grades 3-8",
    description: "Age-specific skill tracks for future Reign athletes.",
    display_order: 1,
    is_active: true,
  },
  {
    id: "local-2",
    title: "Fundamentals First",
    description: "Movement, mindset, and teamwork at the core of every session.",
    display_order: 2,
    is_active: true,
  },
  {
    id: "local-3",
    title: "Feeder Program Incoming",
    description: "Player portals with team schedules launch alongside the academy expansion.",
    display_order: 3,
    is_active: true,
  },
];

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

const roadmap = [
  {
    phase: "Phase 1",
    title: "Academy Launch",
    description: "Weekly skill blocks and movement screenings for young hoopers.",
    timing: "Spring 2025",
  },
  {
    phase: "Phase 2",
    title: "Team Pods",
    description: "Small-group sessions evolve into squad scrimmages and seasonal play.",
    timing: "Summer 2025",
  },
  {
    phase: "Phase 3",
    title: "Feeder League Portal",
    description: "Players access rosters, schedules, and film inside the Reign digital hub.",
    timing: "Winter 2025",
  },
];

const news = [
  {
    tag: "Training Station",
    title: "Ball-handling foundations",
    description: "Warm-up circuit and footwork progressions to open every session strong.",
    note: "Module drop coming soon",
  },
  {
    tag: "Film Room",
    title: "Reading the nail defender",
    description: "Film breakdown on how we attack the nail to open weak side scoring options.",
    note: "Film access coming soon",
  },
  {
    tag: "Playbook Drop",
    title: "Reign motion spacing",
    description: "Download the core spacing package that feeds into the future feeder program sets.",
    note: "Playbook PDFs coming soon",
  },
];

type SectionVisibilityRow = Pick<SiteSectionSetting, "section_key" | "is_active">;

const sectionVisibilityDefaults: Record<string, boolean> = {
  inside_academy: false,
  feeder_timeline: false,
};

function Home() {
  const [highlights, setHighlights] = useState<AcademyHighlight[]>(fallbackHighlights);
  const [loadingHighlights, setLoadingHighlights] = useState(false);
  const [highlightsError, setHighlightsError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AcademySession[]>(fallbackSessions);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState(sectionVisibilityDefaults);

  useEffect(() => {
    let isMounted = true;

    async function fetchHighlights() {
      setLoadingHighlights(true);
      const { data, error } = await supabase
        .from("academy_highlights")
        .select("id,title,description,display_order,is_active")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Failed to load highlights", error);
        setHighlightsError(error.message);
        setLoadingHighlights(false);
        return;
      }

      if (data && data.length > 0) {
        setHighlights(data);
      }

      setHighlightsError(null);
      setLoadingHighlights(false);
    }

    fetchHighlights();

    async function fetchSessions() {
      setLoadingSessions(true);
      const { data, error } = await supabase
        .from("academy_sessions")
        .select(
          "id,title,description,level,session_date,start_time,end_time,location,display_order,is_active",
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Failed to load sessions", error);
        setSessionsError(error.message);
        setLoadingSessions(false);
        return;
      }

      if (data && data.length > 0) {
        setSessions(data);
      }

      setSessionsError(null);
      setLoadingSessions(false);
    }

    fetchSessions();
    fetchSectionVisibility();

    return () => {
      isMounted = false;
    };
  }, []);

  async function fetchSectionVisibility() {
    const { data, error } = await supabase.from("site_sections").select("section_key,is_active");

    if (!data && error) {
      console.error("Failed to load section visibility", error);
      setSectionVisibility(sectionVisibilityDefaults);
      return;
    }

    const visibility = { ...sectionVisibilityDefaults } as Record<string, boolean>;

    (data ?? []).forEach((row) => {
      const entry = row as SectionVisibilityRow;
      visibility[entry.section_key] = entry.is_active ?? false;
    });

    setSectionVisibility(visibility);
  }

  const highlightItems = highlights.length > 0 ? highlights : fallbackHighlights;
  const sessionItems = sessions.length > 0 ? sessions : fallbackSessions;
  const showFeederTimeline = sectionVisibility.feeder_timeline ?? false;
  const showInsideAcademy = sectionVisibility.inside_academy ?? false;

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative isolate min-h-[80vh] overflow-hidden">
        <img
          src={heroArena}
          alt="Empty arena lit by stadium lights"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
          <div className="mb-6 inline-flex w-fit items-center gap-2 border-l-2 border-primary pl-3 font-display text-xs uppercase tracking-[0.4em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Academy Enrollment Now Open
          </div>
          <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl md:text-[8rem]">
            Build the <br />
            <span className="text-primary">next run.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-foreground/80">
            Reign Basketball Academy is the launchpad for middle and elementary hoopers entering the
            program. Train with our staff, track progress, and get ready for the future feeder teams.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ACADEMY SESSIONS */}
      <section id="schedule" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Upcoming Academy Sessions</h2>
            </div>
            <Link
              to="/schedule"
              className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
            >
              Full Calendar →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sessionItems.map((session) => (
              <div
                key={session.id}
                className="flex flex-col justify-between rounded-sm border border-border bg-card/30 p-6 transition-colors hover:border-primary hover:bg-card"
              >
                <div>
                  <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
                    {formatSessionDate(session.session_date)}
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
              </div>
            ))}
          </div>
          {sessionsError && !loadingSessions && (
            <div className="mt-6 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive">
              Using starter sessions until Supabase data is available.
            </div>
          )}
        </div>
      </section>

      {/* ACADEMY VALUES */}
      <section className="border-t border-border bg-background/90 py-16 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-px bg-border md:grid-cols-3">
            {highlightItems.map((item, index) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-primary/80">
                  <span className="font-display">Core Value {index + 1}</span>
                </div>
                <div className="mt-4 font-display text-3xl uppercase leading-tight">{item.title}</div>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          {highlightsError && !loadingHighlights && (
            <div className="mt-4 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive">
              Using starter copy until highlights are added in Supabase.
            </div>
          )}
        </div>
      </section>

      {/* ROADMAP */}
      {showFeederTimeline && (
        <section className="border-y border-border bg-card/30 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Feeder Program Timeline</h2>
              </div>
              <Link
                to="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-sm border border-border bg-background px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Join the Interest List
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {roadmap.map((entry) => (
                <div key={entry.phase} className="rounded-sm border border-border bg-background p-6">
                  <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
                    {entry.phase}
                  </div>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight">{entry.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{entry.description}</p>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-primary/80">{entry.timing}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADMIN PREP NOTE: Academy Schedule management will plug into this section once data model is ready. */}

      {/* CTA — ACADEMY */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={playerAction}
          alt="Basketball player attacking the rim"
          width={1200}
          height={1500}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
              Families & Players
            </div>
            <h2 className="mt-3 max-w-xl font-display text-5xl uppercase leading-none sm:text-7xl">
              Your development plan starts here.
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground"
          >
            Talk With Our Staff
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* NEWS */}
      {showInsideAcademy && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10">
              <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">Latest</div>
              <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Inside the Academy</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((n) => (
                <article
                  key={n.title}
                  className="group flex h-full flex-col justify-between rounded-sm border border-border bg-card/20 p-6 transition-colors hover:border-primary hover:bg-card"
                >
                  <div>
                    <div className="font-display text-xs uppercase tracking-[0.3em] text-primary">{n.tag}</div>
                    <h3 className="mt-4 font-display text-2xl uppercase leading-tight">{n.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{n.description}</p>
                  </div>
                  <div className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {n.note}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

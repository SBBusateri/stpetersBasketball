import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import summerTrainFlyer from "@/assets/summertrain.png";
import homeHeroBackground from "@/assets/homebackground.png";
import { supabase } from "@/lib/supabase/client";
import type {
  AcademyHighlight,
  AcademySession,
  SiteSectionSetting,
  HomepageHeroSettings,
} from "@/lib/supabase/types";
import { formatSessionDate, formatSessionTime } from "@/lib/academy/formatters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPBA / Home" },
      {
        name: "description",
        content: "SPBA home base for lion-hearted middle and elementary hoopers and their families.",
      },
      { property: "og:title", content: "SPBA / Home" },
      {
        property: "og:description",
        content: "Lion-led development for future Saint Peters hoopers and families.",
      },
    ],
  }),
  component: Home,
});

const fallbackHighlights: AcademyHighlight[] = [
  {
    id: "local-1",
    title: "Grades 3-8",
    description: "Age-specific skill pods that build Saint Peters fundamentals.",
    display_order: 1,
    is_active: true,
  },
  {
    id: "local-2",
    title: "Fundamentals First",
    description: "Movement, mindset, and team habits rooted in Lion discipline.",
    display_order: 2,
    is_active: true,
  },
  {
    id: "local-3",
    title: "Family Connection",
    description: "Guardians stay looped in with progress reports and summer programming.",
    display_order: 3,
    is_active: true,
  },
];

const fallbackSessions: AcademySession[] = [
  {
    id: "fallback-1",
    title: "Summer Skills Kickoff",
    description: "Footwork, ball control, and confidence-building reps for new Lions.",
    level: "Grades 3-4",
    session_date: "2025-06-12",
    start_time: "17:30",
    end_time: "19:00",
    location: "Saint Peters Fieldhouse",
    display_order: 1,
    is_active: true,
  },
  {
    id: "fallback-2",
    title: "Sharpshooter Lab",
    description: "Shot mechanics, spacing, and decision-making reps.",
    level: "Grades 5-6",
    session_date: "2025-06-19",
    start_time: "18:00",
    end_time: "19:30",
    location: "Saint Peters Fieldhouse",
    display_order: 2,
    is_active: true,
  },
  {
    id: "fallback-3",
    title: "Lion Leader Workshop",
    description: "Advanced reads, ball screens, and leadership reps for older hoopers.",
    level: "Grades 7-8",
    session_date: "2025-06-26",
    start_time: "18:30",
    end_time: "20:00",
    location: "Saint Peters High",
    display_order: 3,
    is_active: true,
  },
  {
    id: "fallback-4",
    title: "Family Info Night",
    description: "Academy pathway, summer expectations, and Q&A with coaches.",
    level: "Families",
    session_date: "2025-07-02",
    start_time: "18:00",
    end_time: "19:00",
    location: "Saint Peters Commons",
    display_order: 4,
    is_active: true,
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Academy Foundations",
    description: "Weekly skill blocks and movement screenings for Saint Peters youth.",
    timing: "Spring 2025",
  },
  {
    phase: "Phase 2",
    title: "Lion Pods",
    description: "Small-group squads form with position-specific instruction and scrimmages.",
    timing: "Summer 2025",
  },
  {
    phase: "Phase 3",
    title: "Community Portal",
    description: "Families track rosters, schedules, and film inside the Saint Peters hub.",
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
    title: "Lion motion spacing",
    description: "Download spacing principles that feed into Saint Peters youth sets.",
    note: "Playbook PDFs coming soon",
  },
];

type SectionVisibilityRow = Pick<SiteSectionSetting, "section_key" | "is_active">;

type HeroPayload = {
  badgeText: string;
  headline: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageUrl?: string;
};

const sectionVisibilityDefaults: Record<string, boolean> = {
  inside_academy: true,
  feeder_timeline: true,
  home_highlights: true,
  home_sessions: true,
};

const fallbackHero: HeroPayload = {
  badgeText: "Lion Pride Summer",
  headline: "For middle & elementary school we are having basketball.",
  description:
    "Saint Peters Basketball Academy is the summer home for lion-hearted hoopers ready to grow their skills, confidence, and community.",
  primaryLabel: "Sign up for Summer Academy",
  primaryHref: "/summer-academy",
  secondaryLabel: "View Full Schedule",
  secondaryHref: "/schedule",
  imageUrl: summerTrainFlyer,
};

function Home() {
  const [highlights, setHighlights] = useState<AcademyHighlight[]>(fallbackHighlights);
  const [loadingHighlights, setLoadingHighlights] = useState(false);
  const [highlightsError, setHighlightsError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AcademySession[]>(fallbackSessions);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState(sectionVisibilityDefaults);
  const [heroSettings, setHeroSettings] = useState<HeroPayload>(fallbackHero);

  useEffect(() => {
    let isMounted = true;

    async function fetchHero() {
      const { data, error } = await supabase
        .from("homepage_hero_settings")
        .select(
          "badge_text,headline,description,primary_cta_label,primary_cta_href,secondary_cta_label,secondary_cta_href,image_url",
        )
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error && error.code !== "PGRST116") {
        console.error("Failed to load hero settings", error);
        return;
      }

      if (data) {
        const payload: HeroPayload = {
          badgeText: data.badge_text ?? fallbackHero.badgeText,
          headline: data.headline ?? fallbackHero.headline,
          description: data.description ?? fallbackHero.description,
          primaryLabel: data.primary_cta_label ?? fallbackHero.primaryLabel,
          primaryHref: data.primary_cta_href ?? fallbackHero.primaryHref,
          secondaryLabel: data.secondary_cta_label ?? fallbackHero.secondaryLabel,
          secondaryHref: data.secondary_cta_href ?? fallbackHero.secondaryHref,
          imageUrl: data.image_url ?? fallbackHero.imageUrl,
        };

        setHeroSettings(payload);
      }
    }

    fetchHero();

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
  const showFeederTimeline = sectionVisibility.feeder_timeline ?? true;
  const showInsideAcademy = sectionVisibility.inside_academy ?? true;
  const showHighlights = sectionVisibility.home_highlights ?? true;
  const showSessions = sectionVisibility.home_sessions ?? true;

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative border-b border-border">
        <img
          src={homeHeroBackground}
          alt="Saint Peters Basketball Academy background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div>
            {heroSettings.badgeText && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-display text-[10px] uppercase tracking-[0.4em] text-primary">
                {heroSettings.badgeText}
              </div>
            )}
            <h1 className="max-w-3xl font-display text-5xl uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {heroSettings.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{heroSettings.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {heroSettings.primaryLabel && heroSettings.primaryHref && (
                <Link
                  to={heroSettings.primaryHref}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5"
                >
                  {heroSettings.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {heroSettings.secondaryLabel && heroSettings.secondaryHref && (
                <Link
                  to={heroSettings.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/30 px-6 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {heroSettings.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroSettings.imageUrl ?? summerTrainFlyer}
              alt="Saint Peters Summer Academy flyer"
              className="w-full max-w-sm rounded-md border border-border bg-white shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* ACADEMY SESSIONS */}
      {showSessions && (
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
      )}

      {/* ACADEMY VALUES */}
      {showHighlights && (
        <section className="border-t border-border bg-white py-16">
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
                  <div className="mt-6 font-display text-2xl uppercase">{item.title}</div>
                  <p className="mt-4 text-sm text-muted-foreground">{item.description}</p>
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
      )}

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

      {/* CTA — CONTACT */}
      <section className="border-y border-border bg-primary/5 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">Families & Players</div>
            <h2 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-tight text-foreground sm:text-5xl">
              Have questions about training or want to meet our staff?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5"
          >
            Talk with a Coach
            <ArrowRight className="h-4 w-4" />
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

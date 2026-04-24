import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-BknIQUFs.js";
import { L as Link } from "./router-CPoisttR.js";
import { P as PageShell, h as homeHeroBackground } from "./PageShell-CSfNIDer.js";
import { s as summerTrainFlyer } from "./summertrain-aVfC_VOC.js";
import { s as supabase } from "./client-anzYIWag.js";
import { f as formatSessionDate, a as formatSessionTime } from "./formatters-CkFvq0fL.js";
import { A as ArrowRight } from "./arrow-right-E6RJJtSU.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const fallbackHighlights = [{
  id: "local-1",
  title: "Grades 3-8",
  description: "Age-specific skill pods that build Saint Peters fundamentals.",
  display_order: 1,
  is_active: true
}, {
  id: "local-2",
  title: "Fundamentals First",
  description: "Movement, mindset, and team habits rooted in Lion discipline.",
  display_order: 2,
  is_active: true
}, {
  id: "local-3",
  title: "Family Connection",
  description: "Guardians stay looped in with progress reports and summer programming.",
  display_order: 3,
  is_active: true
}];
const fallbackSessions = [{
  id: "fallback-1",
  title: "Summer Skills Kickoff",
  description: "Footwork, ball control, and confidence-building reps for new Lions.",
  level: "Grades 3-4",
  session_date: "2025-06-12",
  start_time: "17:30",
  end_time: "19:00",
  location: "Saint Peters Fieldhouse",
  display_order: 1,
  is_active: true
}, {
  id: "fallback-2",
  title: "Sharpshooter Lab",
  description: "Shot mechanics, spacing, and decision-making reps.",
  level: "Grades 5-6",
  session_date: "2025-06-19",
  start_time: "18:00",
  end_time: "19:30",
  location: "Saint Peters Fieldhouse",
  display_order: 2,
  is_active: true
}, {
  id: "fallback-3",
  title: "Lion Leader Workshop",
  description: "Advanced reads, ball screens, and leadership reps for older hoopers.",
  level: "Grades 7-8",
  session_date: "2025-06-26",
  start_time: "18:30",
  end_time: "20:00",
  location: "Saint Peters High",
  display_order: 3,
  is_active: true
}, {
  id: "fallback-4",
  title: "Family Info Night",
  description: "Academy pathway, summer expectations, and Q&A with coaches.",
  level: "Families",
  session_date: "2025-07-02",
  start_time: "18:00",
  end_time: "19:00",
  location: "Saint Peters Commons",
  display_order: 4,
  is_active: true
}];
const roadmap = [{
  phase: "Phase 1",
  title: "Academy Foundations",
  description: "Weekly skill blocks and movement screenings for Saint Peters youth.",
  timing: "Spring 2025"
}, {
  phase: "Phase 2",
  title: "Lion Pods",
  description: "Small-group squads form with position-specific instruction and scrimmages.",
  timing: "Summer 2025"
}, {
  phase: "Phase 3",
  title: "Community Portal",
  description: "Families track rosters, schedules, and film inside the Saint Peters hub.",
  timing: "Winter 2025"
}];
const news = [{
  tag: "Training Station",
  title: "Ball-handling foundations",
  description: "Warm-up circuit and footwork progressions to open every session strong.",
  note: "Module drop coming soon"
}, {
  tag: "Film Room",
  title: "Reading the nail defender",
  description: "Film breakdown on how we attack the nail to open weak side scoring options.",
  note: "Film access coming soon"
}, {
  tag: "Playbook Drop",
  title: "Lion motion spacing",
  description: "Download spacing principles that feed into Saint Peters youth sets.",
  note: "Playbook PDFs coming soon"
}];
const sectionVisibilityDefaults = {
  inside_academy: true,
  feeder_timeline: true,
  home_highlights: true,
  home_sessions: true
};
const fallbackHero = {
  badgeText: "Lion Pride Summer",
  headline: "For middle & elementary school we are having basketball.",
  description: "Saint Peters Basketball Academy is the summer home for lion-hearted hoopers ready to grow their skills, confidence, and community.",
  primaryLabel: "Sign up for Summer Academy",
  primaryHref: "/summer-academy",
  secondaryLabel: "View Full Schedule",
  secondaryHref: "/schedule",
  imageUrl: summerTrainFlyer
};
function Home() {
  const [highlights, setHighlights] = reactExports.useState(fallbackHighlights);
  const [loadingHighlights, setLoadingHighlights] = reactExports.useState(false);
  const [highlightsError, setHighlightsError] = reactExports.useState(null);
  const [sessions, setSessions] = reactExports.useState(fallbackSessions);
  const [loadingSessions, setLoadingSessions] = reactExports.useState(false);
  const [sessionsError, setSessionsError] = reactExports.useState(null);
  const [sectionVisibility, setSectionVisibility] = reactExports.useState(sectionVisibilityDefaults);
  const [heroSettings, setHeroSettings] = reactExports.useState(fallbackHero);
  reactExports.useEffect(() => {
    let isMounted = true;
    async function fetchHero() {
      const {
        data,
        error
      } = await supabase.from("homepage_hero_settings").select("badge_text,headline,description,primary_cta_label,primary_cta_href,secondary_cta_label,secondary_cta_href,image_url").order("updated_at", {
        ascending: false
      }).limit(1).maybeSingle();
      if (!isMounted) {
        return;
      }
      if (error && error.code !== "PGRST116") {
        console.error("Failed to load hero settings", error);
        return;
      }
      if (data) {
        const payload = {
          badgeText: data.badge_text ?? fallbackHero.badgeText,
          headline: data.headline ?? fallbackHero.headline,
          description: data.description ?? fallbackHero.description,
          primaryLabel: data.primary_cta_label ?? fallbackHero.primaryLabel,
          primaryHref: data.primary_cta_href ?? fallbackHero.primaryHref,
          secondaryLabel: data.secondary_cta_label ?? fallbackHero.secondaryLabel,
          secondaryHref: data.secondary_cta_href ?? fallbackHero.secondaryHref,
          imageUrl: data.image_url ?? fallbackHero.imageUrl
        };
        setHeroSettings(payload);
      }
    }
    fetchHero();
    async function fetchHighlights() {
      setLoadingHighlights(true);
      const {
        data,
        error
      } = await supabase.from("academy_highlights").select("id,title,description,display_order,is_active").eq("is_active", true).order("display_order", {
        ascending: true
      });
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
      const {
        data,
        error
      } = await supabase.from("academy_sessions").select("id,title,description,level,session_date,start_time,end_time,location,display_order,is_active").eq("is_active", true).order("display_order", {
        ascending: true
      });
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
    const {
      data,
      error
    } = await supabase.from("site_sections").select("section_key,is_active");
    if (!data && error) {
      console.error("Failed to load section visibility", error);
      setSectionVisibility(sectionVisibilityDefaults);
      return;
    }
    const visibility = {
      ...sectionVisibilityDefaults
    };
    (data ?? []).forEach((row) => {
      const entry = row;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: homeHeroBackground, alt: "Saint Peters Basketball Academy background", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/85" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          heroSettings.badgeText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-display text-[10px] uppercase tracking-[0.4em] text-primary", children: heroSettings.badgeText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl font-display text-5xl uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl", children: heroSettings.headline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg", children: heroSettings.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
            heroSettings.primaryLabel && heroSettings.primaryHref && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: heroSettings.primaryHref, className: "inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5", children: [
              heroSettings.primaryLabel,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            heroSettings.secondaryLabel && heroSettings.secondaryHref && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: heroSettings.secondaryHref, className: "inline-flex items-center gap-2 rounded-sm border border-border bg-card/30 px-6 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary", children: heroSettings.secondaryLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroSettings.imageUrl ?? summerTrainFlyer, alt: "Saint Peters Summer Academy flyer", className: "w-full max-w-sm rounded-md border border-border bg-white shadow-elevated" }) })
      ] })
    ] }),
    showSessions && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "schedule", className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl uppercase sm:text-5xl", children: "Upcoming Academy Sessions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schedule", className: "text-xs font-bold uppercase tracking-wider text-primary hover:underline", children: "Full Calendar →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: sessionItems.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between rounded-sm border border-border bg-card/30 p-6 transition-colors hover:border-primary hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: formatSessionDate(session.session_date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl uppercase leading-tight", children: session.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: session.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: session.level }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 tracking-[0.2em]", children: [
            formatSessionTime(session.start_time),
            " – ",
            formatSessionTime(session.end_time)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] tracking-[0.3em] text-foreground/70", children: session.location })
        ] })
      ] }, session.id)) }),
      sessionsError && !loadingSessions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive", children: "Using starter sessions until Supabase data is available." })
    ] }) }),
    showHighlights && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px bg-border md:grid-cols-3", children: highlightItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-primary/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display", children: [
          "Core Value ",
          index + 1
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 font-display text-2xl uppercase", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: item.description })
      ] }, item.id)) }),
      highlightsError && !loadingHighlights && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive", children: "Using starter copy until highlights are added in Supabase." })
    ] }) }),
    showFeederTimeline && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-card/30 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl uppercase sm:text-5xl", children: "Feeder Program Timeline" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex w-fit items-center gap-2 rounded-sm border border-border bg-background px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary", children: [
          "Join the Interest List",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-3", children: roadmap.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: entry.phase }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl uppercase leading-tight", children: entry.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: entry.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[11px] uppercase tracking-[0.3em] text-primary/80", children: entry.timing })
      ] }, entry.phase)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-primary/5 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Families & Players" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 max-w-2xl font-display text-4xl uppercase leading-tight text-foreground sm:text-5xl", children: "Have questions about training or want to meet our staff?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5", children: [
        "Talk with a Coach",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) }),
    showInsideAcademy && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Latest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl uppercase sm:text-5xl", children: "Inside the Academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: news.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex h-full flex-col justify-between rounded-sm border border-border bg-card/20 p-6 transition-colors hover:border-primary hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.3em] text-primary", children: n.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-2xl uppercase leading-tight", children: n.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: n.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/80", children: n.note })
      ] }, n.title)) })
    ] }) })
  ] });
}
export {
  Home as component
};

import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-sH-sqigk.js";
import { L as Link } from "./router-zMx3WVxY.js";
import { c as createLucideIcon, P as PageShell } from "./PageShell-1oarDiCA.js";
import { s as supabase } from "./client-anzYIWag.js";
import { f as formatSessionDate, a as formatSessionTime } from "./formatters-CkFvq0fL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const heroArena = "/assets/hero-arena-Ys8Y40CD.jpg";
const playerAction = "/assets/player-action-DLHnel5P.jpg";
const fallbackHighlights = [{
  id: "local-1",
  title: "Grades 3-8",
  description: "Age-specific skill tracks for future Reign athletes.",
  display_order: 1,
  is_active: true
}, {
  id: "local-2",
  title: "Fundamentals First",
  description: "Movement, mindset, and teamwork at the core of every session.",
  display_order: 2,
  is_active: true
}, {
  id: "local-3",
  title: "Feeder Program Incoming",
  description: "Player portals with team schedules launch alongside the academy expansion.",
  display_order: 3,
  is_active: true
}];
const fallbackSessions = [{
  id: "fallback-1",
  title: "Spring Academy Kickoff",
  description: "Footwork, ball control, and confidence-building reps.",
  level: "Grades 3-4",
  session_date: "2025-05-12",
  start_time: "17:30",
  end_time: "19:00",
  location: "Reign Training Center",
  display_order: 1,
  is_active: true
}, {
  id: "fallback-2",
  title: "Shooter's Lab",
  description: "Shot mechanics, spacing, and decision-making.",
  level: "Grades 5-6",
  session_date: "2025-05-19",
  start_time: "18:00",
  end_time: "19:30",
  location: "Reign Training Center",
  display_order: 2,
  is_active: true
}, {
  id: "fallback-3",
  title: "Elite Guard Workshop",
  description: "Advanced reads, ball screens, and leadership reps.",
  level: "Grades 7-8",
  session_date: "2025-05-26",
  start_time: "18:30",
  end_time: "20:00",
  location: "Reign Performance Lab",
  display_order: 3,
  is_active: true
}, {
  id: "fallback-4",
  title: "Parents Info Night",
  description: "Academy pathway, feeder program timeline, and Q&A.",
  level: "Families",
  session_date: "2025-06-02",
  start_time: "18:00",
  end_time: "19:00",
  location: "Reign Training Center",
  display_order: 4,
  is_active: true
}];
const roadmap = [{
  phase: "Phase 1",
  title: "Academy Launch",
  description: "Weekly skill blocks and movement screenings for young hoopers.",
  timing: "Spring 2025"
}, {
  phase: "Phase 2",
  title: "Team Pods",
  description: "Small-group sessions evolve into squad scrimmages and seasonal play.",
  timing: "Summer 2025"
}, {
  phase: "Phase 3",
  title: "Feeder League Portal",
  description: "Players access rosters, schedules, and film inside the Reign digital hub.",
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
  title: "Reign motion spacing",
  description: "Download the core spacing package that feeds into the future feeder program sets.",
  note: "Playbook PDFs coming soon"
}];
const sectionVisibilityDefaults = {
  inside_academy: false,
  feeder_timeline: false
};
function Home() {
  const [highlights, setHighlights] = reactExports.useState(fallbackHighlights);
  const [loadingHighlights, setLoadingHighlights] = reactExports.useState(false);
  const [highlightsError, setHighlightsError] = reactExports.useState(null);
  const [sessions, setSessions] = reactExports.useState(fallbackSessions);
  const [loadingSessions, setLoadingSessions] = reactExports.useState(false);
  const [sessionsError, setSessionsError] = reactExports.useState(null);
  const [sectionVisibility, setSectionVisibility] = reactExports.useState(sectionVisibilityDefaults);
  reactExports.useEffect(() => {
    let isMounted = true;
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
  const showFeederTimeline = sectionVisibility.feeder_timeline ?? false;
  const showInsideAcademy = sectionVisibility.inside_academy ?? false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate min-h-[80vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroArena, alt: "Empty arena lit by stadium lights", width: 1920, height: 1080, className: "absolute inset-0 h-full w-full object-cover opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 inline-flex w-fit items-center gap-2 border-l-2 border-primary pl-3 font-display text-xs uppercase tracking-[0.4em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
          "Academy Enrollment Now Open"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl md:text-[8rem]", children: [
          "Build the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "next run." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-xl text-lg text-foreground/80", children: "Reign Basketball Academy is the launchpad for middle and elementary hoopers entering the program. Train with our staff, track progress, and get ready for the future feeder teams." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "schedule", className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-background/90 py-16 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px bg-border md:grid-cols-3", children: highlightItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-primary/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display", children: [
          "Core Value ",
          index + 1
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-3xl uppercase leading-tight", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: item.description })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: playerAction, alt: "Basketball player attacking the rim", width: 1200, height: 1500, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Families & Players" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 max-w-xl font-display text-5xl uppercase leading-none sm:text-7xl", children: "Your development plan starts here." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground", children: [
          "Talk With Our Staff",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
        ] })
      ] })
    ] }),
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

import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-DPAbIZQq.js";
import { P as PageShell, a as PageHero } from "./PageShell-BmWeryVo.js";
import { s as supabase } from "./client-anzYIWag.js";
import { f as formatSessionDate, a as formatSessionTime } from "./formatters-CkFvq0fL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-52qV2IUX.js";
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
  title: "Parents Info Night",
  description: "Academy pathway, summer expectations, and Q&A with coaches.",
  level: "Families",
  session_date: "2025-07-02",
  start_time: "18:00",
  end_time: "19:00",
  location: "Saint Peters Commons",
  display_order: 4,
  is_active: true
}];
function getSessionStatus(session) {
  const date = /* @__PURE__ */ new Date(`${session.session_date}T${session.end_time || "00:00"}`);
  if (Number.isNaN(date.getTime())) {
    return "upcoming";
  }
  const now = /* @__PURE__ */ new Date();
  return date < now ? "completed" : "upcoming";
}
function SchedulePage() {
  const [sessions, setSessions] = reactExports.useState(fallbackSessions);
  const [filter, setFilter] = reactExports.useState("upcoming");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    async function fetchSessions() {
      setLoading(true);
      const {
        data,
        error: fetchError
      } = await supabase.from("academy_sessions").select("id,title,description,level,session_date,start_time,end_time,location,display_order,is_active").order("display_order", {
        ascending: true
      });
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
  const orderedSessions = reactExports.useMemo(() => {
    return [...sessions].filter((session) => session.is_active !== false).sort((a, b) => {
      if (a.session_date === b.session_date) {
        return a.display_order - b.display_order;
      }
      return a.session_date.localeCompare(b.session_date);
    });
  }, [sessions]);
  const filteredSessions = reactExports.useMemo(() => {
    if (filter === "all") {
      return orderedSessions;
    }
    return orderedSessions.filter((session) => getSessionStatus(session) === filter);
  }, [filter, orderedSessions]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Academy", title: "Schedule", subtitle: "Live view of every Saint Peters academy session straight from the admin dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 inline-flex rounded-sm border border-border bg-card/40 p-1", children: ["upcoming", "all", "completed"].map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(value), className: `px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${filter === value ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`, children: value }, value)) }),
      error && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: loading ? Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full rounded-sm border border-border bg-card/20 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 animate-pulse rounded-sm bg-border/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-6 w-3/4 animate-pulse rounded-sm bg-border/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-20 w-full animate-pulse rounded-sm bg-border/40" })
      ] }, index)) : filteredSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border/60 bg-card/20 p-8 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3 xl:col-span-4", children: "No sessions match this view right now. Adjust the filter or add new sessions in the admin dashboard." }) : filteredSessions.map((session) => {
        const status = getSessionStatus(session);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex h-full flex-col justify-between rounded-sm border border-border bg-card/30 p-6 transition-colors hover:border-primary hover:bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: formatSessionDate(session.session_date) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.3em] ${status === "completed" ? "bg-muted/40 text-muted-foreground" : "bg-primary/10 text-primary"}`, children: status })
            ] }),
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
        ] }, session.id);
      }) })
    ] }) })
  ] });
}
export {
  SchedulePage as component
};

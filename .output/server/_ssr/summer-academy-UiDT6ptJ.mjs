import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, a as PageHero } from "./PageShell-BzkFRwcH.mjs";
import { s as supabase } from "./client-DrdOJ5ep.mjs";
import { S as ShieldCheck, L as LoaderCircle, A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function SummerAcademyPage() {
  const [sessions, setSessions] = reactExports.useState([]);
  const [loadingSessions, setLoadingSessions] = reactExports.useState(true);
  const [formState, setFormState] = reactExports.useState({
    session_id: "",
    player_name: "",
    guardian_name: "",
    phone_number: "",
    grade_level: "",
    is_paid: false,
    waiver_submitted: false
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    async function loadSessions() {
      setLoadingSessions(true);
      const {
        data,
        error: fetchError
      } = await supabase.from("academy_sessions").select("id,title,description,level,session_date,start_time,end_time,location,display_order,is_active").eq("is_active", true).order("display_order", {
        ascending: true
      });
      if (!isMounted) {
        return;
      }
      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load sessions. Please try again soon.");
        setLoadingSessions(false);
        return;
      }
      setSessions(data ?? []);
      setLoadingSessions(false);
    }
    void loadSessions();
    return () => {
      isMounted = false;
    };
  }, []);
  const sessionOptions = reactExports.useMemo(() => {
    return sessions.map((session) => ({
      id: session.id,
      label: `${session.title} (${session.level})`
    }));
  }, [sessions]);
  const selectedSession = reactExports.useMemo(() => sessions.find((session) => session.id === formState.session_id) ?? null, [formState.session_id, sessions]);
  const helperText = selectedSession ? `${selectedSession.location} • ${selectedSession.session_date} • ${selectedSession.start_time}-${selectedSession.end_time}` : "Select a session to view schedule details.";
  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    const payload = {
      session_id: formState.session_id || null,
      session_title: selectedSession?.title ?? null,
      player_name: formState.player_name.trim(),
      guardian_name: formState.guardian_name.trim(),
      phone_number: formState.phone_number.trim(),
      grade_level: formState.grade_level.trim(),
      is_paid: formState.is_paid,
      waiver_submitted: formState.waiver_submitted
    };
    const {
      error: insertError
    } = await supabase.from("academy_registrations").insert(payload);
    if (insertError) {
      console.error(insertError);
      setError(insertError.message || "Unable to submit registration.");
      setSubmitting(false);
      return;
    }
    setFormState({
      session_id: "",
      player_name: "",
      guardian_name: "",
      phone_number: "",
      grade_level: "",
      is_paid: false,
      waiver_submitted: false
    });
    setSubmitting(false);
    setMessage("Registration received! We'll confirm details within 48 hours.");
  }
  const disableSubmit = submitting || !formState.player_name.trim() || !formState.guardian_name.trim() || !formState.phone_number.trim() || !formState.grade_level.trim() || !formState.session_id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Summer Academy", title: "Reserve Your Spot", subtitle: "Fill out the interest form and our staff will confirm placement by grade and skill group." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-card/20 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl uppercase tracking-tight text-foreground", children: "Summer Tracks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Lion Cubs (Grades 3-4):" }),
              " Introducing fundamentals, coordination, and joyful competition."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Rising Lions (Grades 5-6):" }),
              " Skill breakdowns, shooting labs, and team play concepts."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Lion Leaders (Grades 7-8):" }),
              " Advanced reads, leadership workshops, and game situations."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-card/20 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl uppercase tracking-tight text-foreground", children: "What to Expect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-sm bg-primary/5 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Weekly Skill Blocks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: "Dedicated courts for ball-handling, finishing, passing, and decision-making." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-sm bg-primary/5 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Lion Strength" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: "Age-appropriate movement prep led by Saint Peters performance staff." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-sm bg-primary/5 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Character Circles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: "Daily huddles focused on effort, accountability, and being great teammates." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-sm bg-primary/5 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Family Communication" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: "Weekly emails with progress notes, video recaps, and upcoming logistics." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-card/20 p-6 shadow-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl uppercase text-foreground", children: "Sign up today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Choose your session, share your player details, and let us know if payment or paperwork is complete. We'll confirm your spot and follow up with next steps." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-5", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Session" }),
              loadingSessions ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-sm border border-border bg-card/20 px-3 py-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                " Loading sessions…"
              ] }) : sessionOptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border/60 bg-card/20 px-3 py-2 text-sm text-muted-foreground", children: "No active summer sessions published. Check back soon or contact our staff." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formState.session_id, onChange: (event) => setFormState((prev) => ({
                ...prev,
                session_id: event.target.value
              })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a session" }),
                sessionOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.id, children: option.label }, option.id))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: helperText })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Player Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formState.player_name, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  player_name: event.target.value
                })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Parent / Guardian" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formState.guardian_name, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  guardian_name: event.target.value
                })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Phone Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formState.phone_number, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  phone_number: event.target.value
                })), placeholder: "(555) 123-4567", required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Grade Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formState.grade_level, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  grade_level: event.target.value
                })), placeholder: "Example: Rising 5th", required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: formState.is_paid, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  is_paid: event.target.checked
                })) }),
                "Paid"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: formState.waiver_submitted, onChange: (event) => setFormState((prev) => ({
                  ...prev,
                  waiver_submitted: event.target.checked
                })) }),
                "Waiver Submitted"
              ] })
            ] }),
            message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-primary/40 bg-primary/10 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary", children: message }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive", children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: disableSubmit, className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", children: [
              submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" }),
              submitting ? "Sending" : "Submit registration"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-primary/10 p-6 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg uppercase text-primary", children: "Prefer to chat?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Not sure which track fits your player? Our staff will guide you through the summer pathway." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-elevated", children: [
            "Talk with a Coach",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SummerAcademyPage as component
};

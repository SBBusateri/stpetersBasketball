import { T as jsxRuntimeExports } from "./worker-entry-sH-sqigk.js";
import { P as PageShell, a as PageHero } from "./PageShell-1oarDiCA.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-zMx3WVxY.js";
const coaches = [{
  name: "Marcus Hill",
  title: "Head Coach",
  years: "12 years with program",
  bio: "Hall-of-Fame coach with three national championships and 240+ career wins. Former Division I assistant at Duke and Kentucky."
}, {
  name: "Anthony Reyes",
  title: "Associate Head Coach",
  years: "8 years with program",
  bio: "Defensive coordinator and player development specialist. Played professionally in Spain and Italy for nine seasons."
}, {
  name: "DeShawn Baker",
  title: "Assistant Coach — Recruiting Coordinator",
  years: "5 years with program",
  bio: "Leads national recruiting efforts. Former McDonald's All-American with deep ties to AAU programs across the country."
}, {
  name: "Jordan Pierce",
  title: "Director of Player Development",
  years: "6 years with program",
  bio: "Skill development and film study lead. Certified strength coach with NBA and NCAA Combine training experience."
}, {
  name: "Tarik Banks",
  title: "Strength & Conditioning",
  years: "4 years with program",
  bio: "Designs the year-round physical program. CSCS-certified with experience across NFL and NBA performance staffs."
}, {
  name: "Dr. Lisa Hernandez",
  title: "Director of Sports Medicine",
  years: "7 years with program",
  bio: "Oversees athlete health, recovery, and injury prevention. Doctorate in Physical Therapy from Emory."
}];
function CoachesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Leadership", title: "Coaching Staff", subtitle: "The minds and mentors building the next generation of Reign Athletics." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: coaches.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border border-border bg-card/30 p-6 transition-colors hover:border-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-gradient-to-br from-primary/30 to-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 font-display text-2xl uppercase", children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold text-primary", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: c.years }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: c.bio })
    ] }, c.name)) }) }) })
  ] });
}
export {
  CoachesPage as component
};

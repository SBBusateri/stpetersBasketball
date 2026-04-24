import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero } from "./PageShell-BzkFRwcH.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
const teamStats = [{
  label: "Record",
  value: "18-3"
}, {
  label: "PPG",
  value: "82.4"
}, {
  label: "OPP PPG",
  value: "64.1"
}, {
  label: "FG%",
  value: "48.7"
}, {
  label: "3PT%",
  value: "39.2"
}, {
  label: "REB/GAME",
  value: "41.3"
}];
const leaders = [{
  name: "Jalen Carter",
  num: 0,
  pos: "PG",
  gp: 21,
  ppg: 18.6,
  rpg: 4.1,
  apg: 6.8,
  fg: 47.3
}, {
  name: "Marcus Thompson",
  num: 3,
  pos: "SG",
  gp: 21,
  ppg: 16.2,
  rpg: 3.8,
  apg: 3.1,
  fg: 44.1
}, {
  name: "Tyrese Walker",
  num: 5,
  pos: "SF",
  gp: 20,
  ppg: 14.9,
  rpg: 6.2,
  apg: 2.4,
  fg: 51.2
}, {
  name: "Cameron Reed",
  num: 21,
  pos: "PF",
  gp: 21,
  ppg: 12.5,
  rpg: 8.1,
  apg: 1.6,
  fg: 54.8
}, {
  name: "Trey Robinson",
  num: 34,
  pos: "C",
  gp: 19,
  ppg: 10.4,
  rpg: 9.3,
  apg: 0.9,
  fg: 58.2
}, {
  name: "Andre Brooks",
  num: 14,
  pos: "SF",
  gp: 21,
  ppg: 9.7,
  rpg: 4.5,
  apg: 2,
  fg: 45.6
}];
function StatsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "2025–26 Season", title: "Stats", subtitle: "Through 21 games. Updated after every contest." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-primary/5 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Team Snapshot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3 lg:grid-cols-6", children: teamStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background px-6 py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-primary md:text-4xl", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: s.label })
      ] }, s.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Individual Leaders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl uppercase", children: "Player Statistics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-sm border border-border bg-card/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card/50 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Pos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "GP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "PPG" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "RPG" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "APG" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "FG%" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leaders.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-card/20 transition-colors last:border-b-0 hover:bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-display text-lg text-primary", children: p.num }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-display uppercase", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-muted-foreground", children: p.pos }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: p.gp }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right font-display text-base text-primary", children: p.ppg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: p.rpg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: p.apg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: p.fg })
        ] }, p.num)) })
      ] }) })
    ] }) })
  ] });
}
export {
  StatsPage as component
};

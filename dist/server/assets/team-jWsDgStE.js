import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-sH-sqigk.js";
import { P as PageShell, a as PageHero } from "./PageShell-1oarDiCA.js";
import { C as ChevronDown } from "./chevron-down-CPZ81NS-.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-zMx3WVxY.js";
const roster = [{
  num: 0,
  name: "Jalen Carter",
  pos: "PG",
  year: "Sr",
  height: `6'2"`,
  weight: 185,
  hometown: "Atlanta, GA",
  bio: "Three-year captain. Leads the team in assists and steals. Top-50 national recruit out of Westlake HS."
}, {
  num: 3,
  name: "Marcus Thompson",
  pos: "SG",
  year: "Jr",
  height: `6'5"`,
  weight: 195,
  hometown: "Houston, TX",
  bio: "Lethal three-point shooter. Five-star guard with offers from every major D1 program."
}, {
  num: 5,
  name: "Tyrese Walker",
  pos: "SF",
  year: "Sr",
  height: `6'7"`,
  weight: 210,
  hometown: "Chicago, IL",
  bio: "Two-way wing and emotional leader. Holds the program record for career rebounds."
}, {
  num: 11,
  name: "Devin Holloway",
  pos: "PG",
  year: "So",
  height: `6'1"`,
  weight: 175,
  hometown: "Brooklyn, NY",
  bio: "Quick, crafty backup point guard. Averaged 22 PPG in junior varsity last season."
}, {
  num: 14,
  name: "Andre Brooks",
  pos: "SF",
  year: "Jr",
  height: `6'6"`,
  weight: 205,
  hometown: "Memphis, TN",
  bio: "Defensive specialist. Guards 1-4 with elite lateral quickness."
}, {
  num: 21,
  name: "Cameron Reed",
  pos: "PF",
  year: "Sr",
  height: `6'9"`,
  weight: 230,
  hometown: "Los Angeles, CA",
  bio: "Stretch four and team captain. Shooting 41% from beyond the arc this season."
}, {
  num: 23,
  name: "Isaiah Mitchell",
  pos: "SG",
  year: "Fr",
  height: `6'4"`,
  weight: 180,
  hometown: "Detroit, MI",
  bio: "Highly-touted freshman. McDonald's All-American nominee with explosive athleticism."
}, {
  num: 32,
  name: "Marquise Davis",
  pos: "PF",
  year: "Jr",
  height: `6'8"`,
  weight: 220,
  hometown: "Dallas, TX",
  bio: "Energy big who plays above the rim. Top shot-blocker on the roster."
}, {
  num: 34,
  name: "Trey Robinson",
  pos: "C",
  year: "Sr",
  height: `6'11"`,
  weight: 245,
  hometown: "Philadelphia, PA",
  bio: "Anchor of the defense. Verbally committed to a Power Five program for 2026."
}, {
  num: 42,
  name: "Bryce Williams",
  pos: "C",
  year: "So",
  height: `7'0"`,
  weight: 250,
  hometown: "Miami, FL",
  bio: "Skilled seven-footer with a soft touch. Developing into a complete two-way center."
}];
function TeamPage() {
  const [expanded, setExpanded] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "2025–26 Season", title: "Roster", subtitle: "Ten players. One mission. Tap a player to view their full bio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-sm border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-12 gap-4 border-b border-border bg-card/50 px-6 py-4 font-display text-xs uppercase tracking-[0.25em] text-muted-foreground md:grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Pos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Year" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "HT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "WT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3", children: "Hometown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-right", children: "Bio" })
      ] }),
      roster.map((p) => {
        const open = expanded === p.num;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border last:border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExpanded(open ? null : p.num), className: "grid w-full grid-cols-2 items-center gap-4 bg-card/20 px-6 py-5 text-left transition-colors hover:bg-card md:grid-cols-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 font-display text-2xl text-primary md:text-xl", children: p.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 font-display text-lg uppercase md:col-span-3", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-sm md:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display uppercase tracking-wider", children: p.pos }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-sm text-muted-foreground md:col-span-1", children: p.year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-sm text-muted-foreground md:col-span-1", children: p.height }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 hidden text-sm text-muted-foreground md:col-span-1 md:block", children: p.weight }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm text-muted-foreground md:col-span-3", children: p.hometown }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex justify-end md:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-5 w-5 text-primary transition-transform ${open ? "rotate-180" : ""}` }) })
          ] }),
          open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-background/60 px-6 py-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.3em] text-primary", children: "Full Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground", children: p.bio })
          ] })
        ] }, p.num);
      })
    ] }) }) })
  ] });
}
export {
  TeamPage as component
};

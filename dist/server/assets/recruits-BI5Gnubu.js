import { T as jsxRuntimeExports } from "./worker-entry-DPAbIZQq.js";
import { c as createLucideIcon, P as PageShell, a as PageHero } from "./PageShell-BmWeryVo.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-52qV2IUX.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const requirements = ["Minimum 3.0 GPA in core academic courses", "Verified game film (full game minimum)", "Two coaching references", "Athletic resume with stats and awards", "Completed online application"];
function RecruitsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Class of 2026 & 2027", title: "Join the Pride", subtitle: "We recruit student-athletes who compete with discipline, train with purpose, and lead with lion-hearted character." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Requirements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl uppercase sm:text-5xl", children: "What we look for" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-4", children: requirements.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 flex-shrink-0 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/90", children: r })
        ] }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rounded-sm border border-border bg-card/30 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-primary", children: "Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-3xl uppercase", children: "Get Started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4", children: [
          [{
            label: "Full Name",
            type: "text",
            placeholder: "John Smith"
          }, {
            label: "Email",
            type: "email",
            placeholder: "you@example.com"
          }, {
            label: "Graduation Year",
            type: "text",
            placeholder: "2026"
          }, {
            label: "Position",
            type: "text",
            placeholder: "Point Guard"
          }, {
            label: "Height",
            type: "text",
            placeholder: `6'2"`
          }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: f.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: f.type, placeholder: f.placeholder, className: "mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none" })
          ] }, f.label)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Tell us about your game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: "mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mt-2 w-full rounded-sm bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.01]", children: "Submit Application" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RecruitsPage as component
};

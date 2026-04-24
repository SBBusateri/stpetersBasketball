import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-sH-sqigk.js";
import { L as Link } from "./router-zMx3WVxY.js";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$5 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$5);
const __iconNode$4 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
const navItems = [
  { to: "/schedule", label: "Schedule" },
  { to: "/coaches", label: "Coaches" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" }
];
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/60 bg-background/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-display text-lg font-bold text-primary-foreground", children: "R" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base uppercase tracking-wider sm:text-lg", children: "Reign Basketball" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:block", children: "Youth Academy & Feeder Program" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-1 lg:flex", children: [
        navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.to,
            className: "inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 transition-colors hover:text-primary",
            children: item.label
          },
          item.label
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-4 flex items-center gap-1 border-l border-border pl-4", children: [Instagram, Twitter, Youtube].map((Icon2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            "aria-label": "Social",
            className: "flex h-8 w-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-card hover:text-primary",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-3.5 w-3.5" })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen(!open),
          className: "rounded-sm p-2 lg:hidden",
          "aria-label": "Toggle menu",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.to,
          onClick: () => setOpen(false),
          className: "border-b border-border/40 py-3 text-sm font-semibold uppercase tracking-wider",
          children: item.label
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-2", children: [Instagram, Twitter, Youtube].map((Icon2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#",
          "aria-label": "Social",
          className: "flex h-8 w-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-card hover:text-primary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-3.5 w-3.5" })
        },
        i
      )) })
    ] }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-card/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-sm bg-primary font-display text-xl font-bold text-primary-foreground", children: "R" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl uppercase tracking-wider", children: "Reign Athletics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "Basketball Program" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-sm text-muted-foreground", children: "An elite basketball academy developing the next generation of student-athletes through discipline, competition, and excellence on and off the court." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-3", children: [Instagram, Twitter, Youtube, Facebook].map((Icon2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary",
            "aria-label": "Social link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-4 w-4" })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs uppercase tracking-[0.25em] text-primary", children: "Program" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schedule", className: "hover:text-foreground", children: "Schedule" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/team", className: "hover:text-foreground", children: "Roster" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaches", className: "hover:text-foreground", children: "Coaches" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stats", className: "hover:text-foreground", children: "Stats" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recruits", className: "hover:text-foreground", children: "Recruiting" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs uppercase tracking-[0.25em] text-primary", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "1500 Hardwood Drive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Atlanta, GA 30303" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "info@reignathletics.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "(404) 555-0117" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs uppercase tracking-wider text-muted-foreground sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Reign Athletics. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Built for champions." })
    ] })
  ] }) });
}
function PageShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function PageHero({
  eyebrow,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-court-lines", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28", children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs uppercase tracking-[0.4em] text-primary", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl uppercase leading-none tracking-tight sm:text-7xl md:text-8xl", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg", children: subtitle })
    ] })
  ] });
}
export {
  PageShell as P,
  PageHero as a,
  createLucideIcon as c
};

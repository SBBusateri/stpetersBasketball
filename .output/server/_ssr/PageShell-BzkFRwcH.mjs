import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { X, h as Menu, I as Instagram, i as Twitter, Y as Youtube, j as Facebook } from "../_libs/lucide-react.mjs";
const homeScreenBar = "/assets/HomeScreenBar-DWMYG-8S.png";
const navItems = [
  { to: "/", label: "Home" },
  { to: "/summer-academy", label: "Summer Academy" },
  { to: "/schedule", label: "Schedule" },
  { to: "/coaches", label: "Coaches" },
  { to: "/contact", label: "Contact" }
];
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/40 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex h-full items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: homeScreenBar,
          alt: "Saint Peters Basketball Academy",
          className: "h-full w-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "ml-auto hidden items-center gap-1 lg:flex", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.to,
          className: "inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition-colors hover:text-primary",
          children: item.label
        },
        item.label
      )) }),
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
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 bg-black lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.to,
          onClick: () => setOpen(false),
          className: "border-b border-border/40 py-3 text-sm font-semibold uppercase tracking-wider text-white/85",
          children: item.label
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-2", children: [Instagram, Twitter, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#",
          "aria-label": "Social",
          className: "flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-card hover:text-primary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" })
        },
        i
      )) })
    ] }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: homeScreenBar,
            alt: "Saint Peters Basketball Academy",
            className: "h-12 w-auto"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-3", children: [Instagram, Twitter, Youtube, Facebook].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-card hover:text-primary",
            "aria-label": "Social link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs font-bold uppercase tracking-wider text-primary", children: "Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary transition-colors", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/summer-academy", className: "hover:text-primary transition-colors", children: "Summer Academy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schedule", className: "hover:text-primary transition-colors", children: "Schedule" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaches", className: "hover:text-primary transition-colors", children: "Coaches" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-primary transition-colors", children: "Contact" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "hover:text-primary transition-colors", children: "Admin" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs font-bold uppercase tracking-wider text-primary", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "1500 Hardwood Drive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Atlanta, GA 30303" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "info@saintpetersacademy.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "(404) 555-0117" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 text-xs font-bold uppercase tracking-wider text-white/60 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Saint Peters Basketball Academy. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Fear the Lions." })
    ] })
  ] }) });
}
const logoMark = "/assets/SPBALogoNoBackground-CDq66jUq.png";
const homeHeroBackground = "/assets/homebackground-DSz1Ibus.png";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative overflow-hidden border-b border-border",
      style: { backgroundImage: `url(${homeHeroBackground})`, backgroundSize: "cover", backgroundPosition: "center" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/90 backdrop-blur-[2px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoMark, alt: "Saint Peters Basketball Academy", className: "h-20 w-auto sm:h-24" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28", children: [
          eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 font-display text-xs uppercase tracking-[0.4em] text-primary", children: eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl uppercase leading-none tracking-tight sm:text-7xl md:text-8xl", children: title }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg", children: subtitle })
        ] })
      ]
    }
  );
}
export {
  PageShell as P,
  PageHero as a,
  homeHeroBackground as h
};

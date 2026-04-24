import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
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
const appCss = "/assets/styles-ByMokD_t.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-8xl text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl uppercase tracking-wider", children: "Out of Bounds" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist on the court." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground",
        children: "Back to Home Court"
      }
    ) })
  ] }) });
}
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SPBA / Platform" },
      {
        name: "description",
        content: "SPBA develops lion-hearted student-athletes through gold-standard training, academics, and family-focused support."
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter$8 = () => import("./team-DaQOzm-t.mjs");
const Route$8 = createFileRoute("/team")({
  head: () => ({
    meta: [{
      title: "SPBA / Roster"
    }, {
      name: "description",
      content: "Meet the 2025-26 Saint Peters Basketball academy roster — elite student-athletes from across the country."
    }, {
      property: "og:title",
      content: "SPBA / Roster"
    }, {
      property: "og:description",
      content: "Meet the 2025-26 roster."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./summer-academy-UiDT6ptJ.mjs");
const Route$7 = createFileRoute("/summer-academy")({
  head: () => ({
    meta: [{
      title: "Summer Academy Sign-Up — Saint Peters"
    }, {
      name: "description",
      content: "Reserve a spot in the Saint Peters Basketball Academy summer programming for middle and elementary hoopers."
    }, {
      property: "og:title",
      content: "Summer Academy — Saint Peters Basketball"
    }, {
      property: "og:description",
      content: "Lion Pride summer sessions for Saint Peters student-athletes and families."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./stats-Bzl4CszH.mjs");
const Route$6 = createFileRoute("/stats")({
  head: () => ({
    meta: [{
      title: "SPBA / Stats"
    }, {
      name: "description",
      content: "Individual and team statistics for the 2025-26 Saint Peters Basketball Academy season."
    }, {
      property: "og:title",
      content: "SPBA / Stats"
    }, {
      property: "og:description",
      content: "Player and team statistics."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./schedule-biji4kNP.mjs");
const Route$5 = createFileRoute("/schedule")({
  head: () => ({
    meta: [{
      title: "SPBA / Schedule"
    }, {
      name: "description",
      content: "View every Saint Peters Basketball Academy session and training opportunity pulled straight from Supabase."
    }, {
      property: "og:title",
      content: "SPBA / Schedule"
    }, {
      property: "og:description",
      content: "Upcoming and completed Saint Peters Basketball Academy sessions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./recruits-B_4135nb.mjs");
const Route$4 = createFileRoute("/recruits")({
  head: () => ({
    meta: [{
      title: "SPBA / Recruiting"
    }, {
      name: "description",
      content: "Apply to join Saint Peters Basketball Academy. Our recruiting process develops student-athletes for the next level with lion-hearted standards."
    }, {
      property: "og:title",
      content: "SPBA / Recruiting"
    }, {
      property: "og:description",
      content: "Join the pride. Build your future."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-CEg2E_om.mjs");
const Route$3 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "SPBA / Contact"
    }, {
      name: "description",
      content: "Get in touch with Saint Peters Basketball Academy. Visit our facility, call, or send us a message."
    }, {
      property: "og:title",
      content: "SPBA / Contact"
    }, {
      property: "og:description",
      content: "Reach the Lions staff directly."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./coaches-D4zUNLdk.mjs");
const Route$2 = createFileRoute("/coaches")({
  head: () => ({
    meta: [{
      title: "SPBA / Coaches"
    }, {
      name: "description",
      content: "Meet the Lion Pride staff guiding Saint Peters Basketball Academy athletes and families."
    }, {
      property: "og:title",
      content: "SPBA / Coaches"
    }, {
      property: "og:description",
      content: "Meet the coaches behind the Lions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-ClY8afsx.mjs");
const Route$1 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Saint Peters Basketball Academy"
    }, {
      name: "description",
      content: "Manage Saint Peters academy highlights, sessions, and homepage modules."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-Bi8-InQV.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "SPBA / Home"
    }, {
      name: "description",
      content: "SPBA home base for lion-hearted middle and elementary hoopers and their families."
    }, {
      property: "og:title",
      content: "SPBA / Home"
    }, {
      property: "og:description",
      content: "Lion-led development for future Saint Peters hoopers and families."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TeamRoute = Route$8.update({
  id: "/team",
  path: "/team",
  getParentRoute: () => Route$9
});
const SummerAcademyRoute = Route$7.update({
  id: "/summer-academy",
  path: "/summer-academy",
  getParentRoute: () => Route$9
});
const StatsRoute = Route$6.update({
  id: "/stats",
  path: "/stats",
  getParentRoute: () => Route$9
});
const ScheduleRoute = Route$5.update({
  id: "/schedule",
  path: "/schedule",
  getParentRoute: () => Route$9
});
const RecruitsRoute = Route$4.update({
  id: "/recruits",
  path: "/recruits",
  getParentRoute: () => Route$9
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$9
});
const CoachesRoute = Route$2.update({
  id: "/coaches",
  path: "/coaches",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  CoachesRoute,
  ContactRoute,
  RecruitsRoute,
  ScheduleRoute,
  StatsRoute,
  SummerAcademyRoute,
  TeamRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router;
};
export {
  getRouter
};

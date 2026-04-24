import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero } from "./PageShell-BzkFRwcH.mjs";
import { M as MapPin, P as Phone, b as Mail } from "../_libs/lucide-react.mjs";
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
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Get in Touch", title: "Contact", subtitle: "Questions, media inquiries, or summer academy interest — we want to hear from you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3", children: [{
      Icon: MapPin,
      t: "Facility",
      v: "1500 Hardwood Drive\nAtlanta, GA 30303"
    }, {
      Icon: Phone,
      t: "Phone",
      v: "(404) 555-0117\nMon–Fri, 9am–6pm"
    }, {
      Icon: Mail,
      t: "Email",
      v: "info@saintpetersacademy.com\nsummer@saintpetersacademy.com"
    }].map(({
      Icon,
      t,
      v
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-card/20 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-2xl uppercase", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 whitespace-pre-line text-sm text-muted-foreground", children: v })
    ] }, t)) }) })
  ] });
}
export {
  ContactPage as component
};

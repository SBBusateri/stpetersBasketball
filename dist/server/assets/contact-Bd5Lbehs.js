import { T as jsxRuntimeExports } from "./worker-entry-BknIQUFs.js";
import { c as createLucideIcon, P as PageShell, a as PageHero } from "./PageShell-CSfNIDer.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CPoisttR.js";
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
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

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero } from "./PageShell-BzkFRwcH.mjs";
import { s as supabase } from "./client-DrdOJ5ep.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function CoachesPage() {
  const [coaches, setCoaches] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    async function fetchCoaches() {
      setLoading(true);
      const {
        data,
        error: fetchError
      } = await supabase.from("academy_coaches").select("id,name,title,years,bio,display_order,is_active,headshot_url").eq("is_active", true).order("display_order", {
        ascending: true
      });
      if (!isMounted) {
        return;
      }
      if (fetchError) {
        console.error("Failed to load coaches", fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }
      setCoaches(data ?? []);
      setError(null);
      setLoading(false);
    }
    void fetchCoaches();
    return () => {
      isMounted = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Leadership", title: "Coaching Staff", subtitle: "The minds and mentors building the next generation of Saint Peters Lions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground", children: "Loading coaches from Supabase…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-destructive", children: "Unable to load coaches right now." }) : coaches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border/60 bg-card/20 p-8 text-sm text-muted-foreground", children: "No coaches published yet. Add them from the admin dashboard to populate this page." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: coaches.map((coach) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-sm border border-border bg-card/20 p-6 transition-transform hover:-translate-y-1 hover:border-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-primary/20 via-primary/10 to-primary/40", children: coach.headshot_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: coach.headshot_url, alt: coach.name, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 font-display text-2xl uppercase", children: coach.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold text-primary", children: coach.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: coach.years }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: coach.bio })
    ] }, coach.id)) }) }) })
  ] });
}
export {
  CoachesPage as component
};

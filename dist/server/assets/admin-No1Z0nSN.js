import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-sH-sqigk.js";
import { L as Link } from "./router-zMx3WVxY.js";
import { c as createLucideIcon, P as PageShell, a as PageHero } from "./PageShell-1oarDiCA.js";
import { s as supabase } from "./client-anzYIWag.js";
import { C as ChevronDown } from "./chevron-down-CPZ81NS-.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$6 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$6);
const __iconNode$5 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$5);
const __iconNode$4 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const defaultHighlightForm = {
  title: "",
  description: "",
  display_order: 1,
  is_active: true
};
const defaultSessionForm = {
  title: "",
  description: "",
  level: "",
  session_date: "",
  start_time: "",
  end_time: "",
  location: "",
  display_order: 1,
  is_active: true
};
const sectionDefinitions = [{
  key: "inside_academy",
  label: "Inside the Academy",
  description: "Controls the training hub module on the homepage."
}, {
  key: "feeder_timeline",
  label: "Feeder Program Timeline",
  description: "Shows the roadmap section outlining phases of the feeder rollout."
}];
function AdminDashboard() {
  const [highlights, setHighlights] = reactExports.useState([]);
  const [sessions, setSessions] = reactExports.useState([]);
  const [sections, setSections] = reactExports.useState([]);
  const [loadingHighlights, setLoadingHighlights] = reactExports.useState(true);
  const [loadingSessions, setLoadingSessions] = reactExports.useState(true);
  const [loadingSections, setLoadingSections] = reactExports.useState(true);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [isSavingAll, setIsSavingAll] = reactExports.useState(false);
  const [creatingHighlight, setCreatingHighlight] = reactExports.useState(false);
  const [creatingSession, setCreatingSession] = reactExports.useState(false);
  const [highlightForm, setHighlightForm] = reactExports.useState(defaultHighlightForm);
  const [sessionForm, setSessionForm] = reactExports.useState(defaultSessionForm);
  const [collapsed, setCollapsed] = reactExports.useState({
    highlights: true,
    sessions: true,
    sections: true
  });
  const [error, setError] = reactExports.useState(null);
  const [message, setMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void refreshAll();
  }, []);
  const sortedHighlights = reactExports.useMemo(() => [...highlights].sort((a, b) => a.draftDisplayOrder - b.draftDisplayOrder), [highlights]);
  const sortedSessions = reactExports.useMemo(() => [...sessions].sort((a, b) => a.draftDisplayOrder - b.draftDisplayOrder), [sessions]);
  const hasDirty = reactExports.useMemo(() => highlights.some((item) => item.dirty) || sessions.some((item) => item.dirty) || sections.some((item) => item.dirty), [highlights, sessions, sections]);
  async function refreshAll() {
    setIsRefreshing(true);
    setError(null);
    setMessage(null);
    await Promise.all([fetchHighlights(), fetchSessions(), fetchSectionSettings()]);
    setIsRefreshing(false);
  }
  async function fetchHighlights() {
    setLoadingHighlights(true);
    const {
      data,
      error: fetchError
    } = await supabase.from("academy_highlights").select("id,title,description,display_order,is_active").order("display_order", {
      ascending: true
    });
    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingHighlights(false);
      return;
    }
    setHighlights((data ?? []).map((item) => ({
      ...item,
      draftTitle: item.title ?? "",
      draftDescription: item.description ?? "",
      draftDisplayOrder: item.display_order ?? 1,
      draftIsActive: item.is_active ?? true,
      dirty: false,
      isDeleting: false
    })));
    setLoadingHighlights(false);
  }
  async function fetchSessions() {
    setLoadingSessions(true);
    const {
      data,
      error: fetchError
    } = await supabase.from("academy_sessions").select("id,title,description,level,session_date,start_time,end_time,location,display_order,is_active").order("display_order", {
      ascending: true
    });
    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingSessions(false);
      return;
    }
    const normalizeTime = (value) => value ? value.slice(0, 5) : "";
    setSessions((data ?? []).map((item) => ({
      ...item,
      draftTitle: item.title ?? "",
      draftDescription: item.description ?? "",
      draftLevel: item.level ?? "",
      draftSessionDate: item.session_date ?? "",
      draftStartTime: normalizeTime(item.start_time),
      draftEndTime: normalizeTime(item.end_time),
      draftLocation: item.location ?? "",
      draftDisplayOrder: item.display_order ?? 1,
      draftIsActive: item.is_active ?? true,
      dirty: false,
      isDeleting: false,
      isCloning: false
    })));
    setLoadingSessions(false);
  }
  async function fetchSectionSettings() {
    setLoadingSections(true);
    const {
      data,
      error: fetchError
    } = await supabase.from("site_sections").select("id,section_key,label,is_active");
    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingSections(false);
      return;
    }
    const existing = new Map((data ?? []).map((item) => [item.section_key, item]));
    setSections(sectionDefinitions.map((definition) => {
      const record = existing.get(definition.key);
      const isActive = record?.is_active ?? false;
      return {
        id: record?.id,
        section_key: definition.key,
        label: record?.label ?? definition.label,
        description: definition.description,
        is_active: isActive,
        draftIsActive: isActive,
        dirty: false
      };
    }));
    setLoadingSections(false);
  }
  function toggleSection(section) {
    setCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  }
  function updateHighlightField(id, field, value) {
    setHighlights((prev) => prev.map((item) => {
      if (item.id !== id) {
        return item;
      }
      const next = {
        ...item,
        dirty: true
      };
      switch (field) {
        case "title":
          next.draftTitle = String(value);
          break;
        case "description":
          next.draftDescription = String(value);
          break;
        case "display_order":
          next.draftDisplayOrder = Number(value) || 1;
          break;
        case "is_active":
          next.draftIsActive = Boolean(value);
          break;
      }
      return next;
    }));
  }
  function updateSessionField(id, field, value) {
    setSessions((prev) => prev.map((item) => {
      if (item.id !== id) {
        return item;
      }
      const next = {
        ...item,
        dirty: true
      };
      switch (field) {
        case "title":
          next.draftTitle = String(value);
          break;
        case "description":
          next.draftDescription = String(value);
          break;
        case "level":
          next.draftLevel = String(value);
          break;
        case "session_date":
          next.draftSessionDate = String(value);
          break;
        case "start_time":
          next.draftStartTime = String(value);
          break;
        case "end_time":
          next.draftEndTime = String(value);
          break;
        case "location":
          next.draftLocation = String(value);
          break;
        case "display_order":
          next.draftDisplayOrder = Number(value) || 1;
          break;
        case "is_active":
          next.draftIsActive = Boolean(value);
          break;
      }
      return next;
    }));
  }
  function updateSectionField(sectionKey, isActive) {
    setSections((prev) => prev.map((item) => {
      if (item.section_key !== sectionKey) {
        return item;
      }
      return {
        ...item,
        draftIsActive: isActive,
        dirty: item.is_active !== isActive
      };
    }));
  }
  async function handleSaveAll() {
    if (!hasDirty) {
      setMessage("No pending edits to save.");
      return;
    }
    setIsSavingAll(true);
    setError(null);
    setMessage(null);
    try {
      await Promise.all([...highlights.filter((item) => item.dirty).map(async (item) => {
        const {
          error: updateError
        } = await supabase.from("academy_highlights").update({
          title: item.draftTitle.trim(),
          description: item.draftDescription.trim(),
          display_order: item.draftDisplayOrder,
          is_active: item.draftIsActive
        }).eq("id", item.id);
        if (updateError) {
          throw updateError;
        }
      }), ...sessions.filter((item) => item.dirty).map(async (item) => {
        const {
          error: updateError
        } = await supabase.from("academy_sessions").update({
          title: item.draftTitle.trim(),
          description: item.draftDescription.trim(),
          level: item.draftLevel.trim(),
          session_date: item.draftSessionDate,
          start_time: item.draftStartTime,
          end_time: item.draftEndTime,
          location: item.draftLocation.trim(),
          display_order: item.draftDisplayOrder,
          is_active: item.draftIsActive
        }).eq("id", item.id);
        if (updateError) {
          throw updateError;
        }
      }), ...sections.filter((item) => item.dirty).map(async (item) => {
        const payload = {
          id: item.id,
          section_key: item.section_key,
          label: item.label,
          is_active: item.draftIsActive
        };
        const {
          error: updateError
        } = await supabase.from("site_sections").upsert(payload, {
          onConflict: "section_key"
        });
        if (updateError) {
          throw updateError;
        }
      })]);
      setMessage("Changes saved.");
      await Promise.all([fetchHighlights(), fetchSessions(), fetchSectionSettings()]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setIsSavingAll(false);
    }
  }
  async function handleCreateHighlight(event) {
    event.preventDefault();
    setCreatingHighlight(true);
    setError(null);
    setMessage(null);
    const payload = {
      title: highlightForm.title.trim(),
      description: highlightForm.description.trim(),
      display_order: Number(highlightForm.display_order) || 1,
      is_active: highlightForm.is_active
    };
    const {
      error: insertError
    } = await supabase.from("academy_highlights").insert(payload);
    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setCreatingHighlight(false);
      return;
    }
    setHighlightForm(defaultHighlightForm);
    setCreatingHighlight(false);
    setMessage("Highlight added.");
    await fetchHighlights();
  }
  async function handleCreateSession(event) {
    event.preventDefault();
    setCreatingSession(true);
    setError(null);
    setMessage(null);
    const payload = {
      title: sessionForm.title.trim(),
      description: sessionForm.description.trim(),
      level: sessionForm.level.trim(),
      session_date: sessionForm.session_date,
      start_time: sessionForm.start_time,
      end_time: sessionForm.end_time,
      location: sessionForm.location.trim(),
      display_order: Number(sessionForm.display_order) || 1,
      is_active: sessionForm.is_active
    };
    const {
      error: insertError
    } = await supabase.from("academy_sessions").insert(payload);
    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setCreatingSession(false);
      return;
    }
    setSessionForm(defaultSessionForm);
    setCreatingSession(false);
    setMessage("Session added.");
    await fetchSessions();
  }
  async function handleDeleteHighlight(id) {
    setHighlights((prev) => prev.map((item) => item.id === id ? {
      ...item,
      isDeleting: true
    } : item));
    setError(null);
    setMessage(null);
    const {
      error: deleteError
    } = await supabase.from("academy_highlights").delete().eq("id", id);
    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setHighlights((prev) => prev.map((item) => item.id === id ? {
        ...item,
        isDeleting: false
      } : item));
      return;
    }
    setMessage("Highlight removed.");
    await fetchHighlights();
  }
  async function handleDeleteSession(id) {
    setSessions((prev) => prev.map((item) => item.id === id ? {
      ...item,
      isDeleting: true
    } : item));
    setError(null);
    setMessage(null);
    const {
      error: deleteError
    } = await supabase.from("academy_sessions").delete().eq("id", id);
    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setSessions((prev) => prev.map((item) => item.id === id ? {
        ...item,
        isDeleting: false
      } : item));
      return;
    }
    setMessage("Session removed.");
    await fetchSessions();
  }
  async function handleCloneSession(id) {
    const source = sessions.find((item) => item.id === id);
    if (!source) {
      return;
    }
    setSessions((prev) => prev.map((item) => item.id === id ? {
      ...item,
      isCloning: true
    } : item));
    setError(null);
    setMessage(null);
    const nextDisplayOrder = sessions.reduce((acc, item) => Math.max(acc, item.draftDisplayOrder ?? 0), 0) + 1;
    const payload = {
      title: source.draftTitle.trim(),
      description: source.draftDescription.trim(),
      level: source.draftLevel.trim(),
      session_date: source.draftSessionDate,
      start_time: source.draftStartTime,
      end_time: source.draftEndTime,
      location: source.draftLocation.trim(),
      display_order: nextDisplayOrder,
      is_active: source.draftIsActive
    };
    const {
      error: cloneError
    } = await supabase.from("academy_sessions").insert(payload);
    if (cloneError) {
      console.error(cloneError);
      setError(cloneError.message);
      setSessions((prev) => prev.map((item) => item.id === id ? {
        ...item,
        isCloning: false
      } : item));
      return;
    }
    setMessage("Session cloned. Update the new entry and save when ready.");
    await fetchSessions();
  }
  const renderActionButtons = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void refreshAll(), disabled: isRefreshing || isSavingAll, className: "inline-flex items-center gap-2 rounded-sm border border-border bg-card/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50", children: [
      isRefreshing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
      "Refresh data"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void handleSaveAll(), disabled: !hasDirty || isSavingAll, className: "inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", children: [
      isSavingAll ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
      "Save changes"
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Internal", title: "Admin Dashboard", subtitle: "Manage the academy highlights that share the program story on the public homepage." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-card/20 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to site"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: renderActionButtons() })
      ] }),
      (message || error) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col gap-2 sm:flex-row", children: [
        message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary", children: message }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-destructive", children: error })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("sections"), className: "flex w-full items-center justify-between px-6 py-4 text-left", "aria-expanded": !collapsed.sections, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl uppercase tracking-tight", children: "Site Sections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: [
            loadingSections ? "Loading" : `${sections.filter((item) => item.draftIsActive).length} visible`,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${collapsed.sections ? "" : "rotate-180"}` })
          ] })
        ] }),
        !collapsed.sections && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 border-t border-border p-6", children: loadingSections ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Loading section visibility from Supabase…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-card/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg uppercase tracking-[0.25em]", children: section.label }),
              section.dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-sm bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-primary", children: "Unsaved" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground", children: section.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex cursor-pointer items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "peer sr-only", checked: section.draftIsActive, onChange: (event) => updateSectionField(section.section_key, event.target.checked) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-12 rounded-full border border-border bg-muted transition peer-checked:border-primary peer-checked:bg-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1 top-1 h-4 w-4 rounded-full bg-background transition-transform peer-checked:translate-x-6" })
          ] })
        ] }) }, section.section_key)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("highlights"), className: "flex w-full items-center justify-between px-6 py-4 text-left", "aria-expanded": !collapsed.highlights, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl uppercase tracking-tight", children: "Highlights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: [
            loadingHighlights ? "Loading" : `${sortedHighlights.length} items`,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${collapsed.highlights ? "" : "rotate-180"}` })
          ] })
        ] }),
        !collapsed.highlights && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border-t border-border p-6", children: [
          loadingHighlights ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Loading highlights from Supabase…"
          ] }) : sortedHighlights.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground", children: "No highlights yet. Use the form below to create your first academy story." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sortedHighlights.map((highlight) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-sm border border-border bg-background p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Highlight" }),
              highlight.dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-primary/10 px-2 py-1 text-primary", children: "Unsaved" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: highlight.draftTitle, onChange: (event) => updateHighlightField(highlight.id, "title", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Display Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: highlight.draftDisplayOrder, onChange: (event) => updateHighlightField(highlight.id, "display_order", Number(event.target.value)), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: highlight.draftDescription, onChange: (event) => updateHighlightField(highlight.id, "description", event.target.value), rows: 3, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: highlight.draftIsActive ? "active" : "inactive", onChange: (event) => updateHighlightField(highlight.id, "is_active", event.target.value === "active"), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Hidden" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void handleDeleteHighlight(highlight.id), className: "inline-flex items-center gap-2 rounded-sm border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", disabled: highlight.isDeleting, children: [
              highlight.isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Delete"
            ] }) })
          ] }, highlight.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " New highlight"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: handleCreateHighlight, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: highlightForm.title, onChange: (event) => setHighlightForm((prev) => ({
                  ...prev,
                  title: event.target.value
                })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: highlightForm.description, onChange: (event) => setHighlightForm((prev) => ({
                  ...prev,
                  description: event.target.value
                })), rows: 4, required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Display Order" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: highlightForm.display_order, onChange: (event) => setHighlightForm((prev) => ({
                    ...prev,
                    display_order: Number(event.target.value) || 1
                  })), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: highlightForm.is_active ? "active" : "inactive", onChange: (event) => setHighlightForm((prev) => ({
                    ...prev,
                    is_active: event.target.value === "active"
                  })), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Hidden" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: creatingHighlight, className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", children: [
                creatingHighlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                creatingHighlight ? "Saving" : "Add highlight"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("sessions"), className: "flex w-full items-center justify-between px-6 py-4 text-left", "aria-expanded": !collapsed.sessions, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl uppercase tracking-tight", children: "Academy Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: [
            loadingSessions ? "Loading" : `${sortedSessions.length} items`,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${collapsed.sessions ? "" : "rotate-180"}` })
          ] })
        ] }),
        !collapsed.sessions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border-t border-border p-6", children: [
          loadingSessions ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Loading sessions from Supabase…"
          ] }) : sortedSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground", children: "No sessions yet. Use the form below to add the first academy session." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sortedSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-sm border border-border bg-background p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Session" }),
              session.dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-primary/10 px-2 py-1 text-primary", children: "Unsaved" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: session.draftTitle, onChange: (event) => updateSessionField(session.id, "title", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: session.draftLevel, onChange: (event) => updateSessionField(session.id, "level", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 lg:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: session.draftDescription, onChange: (event) => updateSessionField(session.id, "description", event.target.value), rows: 3, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: session.draftSessionDate, onChange: (event) => updateSessionField(session.id, "session_date", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: session.draftLocation, onChange: (event) => updateSessionField(session.id, "location", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Start time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: session.draftStartTime, onChange: (event) => updateSessionField(session.id, "start_time", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "End time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: session.draftEndTime, onChange: (event) => updateSessionField(session.id, "end_time", event.target.value), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Display Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: session.draftDisplayOrder, onChange: (event) => updateSessionField(session.id, "display_order", Number(event.target.value)), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: session.draftIsActive ? "active" : "inactive", onChange: (event) => updateSessionField(session.id, "is_active", event.target.value === "active"), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Hidden" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void handleCloneSession(session.id), className: "inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", disabled: session.isCloning, children: [
                session.isCloning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                "Clone"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void handleDeleteSession(session.id), className: "inline-flex items-center gap-2 rounded-sm border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", disabled: session.isDeleting, children: [
                session.isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Delete"
              ] })
            ] })
          ] }, session.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " New session"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: handleCreateSession, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: sessionForm.title, onChange: (event) => setSessionForm((prev) => ({
                  ...prev,
                  title: event.target.value
                })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: sessionForm.level, onChange: (event) => setSessionForm((prev) => ({
                  ...prev,
                  level: event.target.value
                })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: sessionForm.description, onChange: (event) => setSessionForm((prev) => ({
                  ...prev,
                  description: event.target.value
                })), rows: 4, required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: sessionForm.session_date, onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    session_date: event.target.value
                  })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: sessionForm.location, onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    location: event.target.value
                  })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Start time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: sessionForm.start_time, onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    start_time: event.target.value
                  })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "End time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: sessionForm.end_time, onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    end_time: event.target.value
                  })), required: true, className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Display Order" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: sessionForm.display_order, onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    display_order: Number(event.target.value) || 1
                  })), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sessionForm.is_active ? "active" : "inactive", onChange: (event) => setSessionForm((prev) => ({
                    ...prev,
                    is_active: event.target.value === "active"
                  })), className: "w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Hidden" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: creatingSession, className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", children: [
                creatingSession ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                creatingSession ? "Saving" : "Add session"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-card/20 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Manage academy content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: renderActionButtons() })
    ] }) }) })
  ] });
}
export {
  AdminDashboard as component
};

import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Copy, Loader2, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/lib/supabase/client";
import type { AcademyHighlight, AcademySession, SiteSectionSetting } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Reign Basketball" },
      {
        name: "description",
        content: "Manage academy highlights that appear on the public home page.",
      },
    ],
  }),
  component: AdminDashboard,
});

type EditableHighlight = AcademyHighlight & {
  draftTitle: string;
  draftDescription: string;
  draftDisplayOrder: number;
  draftIsActive: boolean;
  dirty: boolean;
  isDeleting?: boolean;
};

type EditableSession = AcademySession & {
  draftTitle: string;
  draftDescription: string;
  draftLevel: string;
  draftSessionDate: string;
  draftStartTime: string;
  draftEndTime: string;
  draftLocation: string;
  draftDisplayOrder: number;
  draftIsActive: boolean;
  dirty: boolean;
  isDeleting?: boolean;
  isCloning?: boolean;
};

type EditableSectionSetting = {
  id?: string;
  section_key: string;
  label: string;
  description: string;
  is_active: boolean;
  draftIsActive: boolean;
  dirty: boolean;
};

const defaultHighlightForm = {
  title: "",
  description: "",
  display_order: 1,
  is_active: true,
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
  is_active: true,
};

const sectionDefinitions: { key: string; label: string; description: string }[] = [
  {
    key: "inside_academy",
    label: "Inside the Academy",
    description: "Controls the training hub module on the homepage.",
  },
  {
    key: "feeder_timeline",
    label: "Feeder Program Timeline",
    description: "Shows the roadmap section outlining phases of the feeder rollout.",
  },
];

function AdminDashboard() {
  const [highlights, setHighlights] = useState<EditableHighlight[]>([]);
  const [sessions, setSessions] = useState<EditableSession[]>([]);
  const [sections, setSections] = useState<EditableSectionSetting[]>([]);
  const [loadingHighlights, setLoadingHighlights] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingSections, setLoadingSections] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [creatingHighlight, setCreatingHighlight] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [highlightForm, setHighlightForm] = useState(defaultHighlightForm);
  const [sessionForm, setSessionForm] = useState(defaultSessionForm);
  const [collapsed, setCollapsed] = useState({ highlights: true, sessions: true, sections: true });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void refreshAll();
  }, []);

  const sortedHighlights = useMemo(
    () => [...highlights].sort((a, b) => a.draftDisplayOrder - b.draftDisplayOrder),
    [highlights],
  );

  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => a.draftDisplayOrder - b.draftDisplayOrder),
    [sessions],
  );

  const hasDirty = useMemo(
    () => highlights.some((item) => item.dirty) || sessions.some((item) => item.dirty) || sections.some((item) => item.dirty),
    [highlights, sessions, sections],
  );

  async function refreshAll() {
    setIsRefreshing(true);
    setError(null);
    setMessage(null);
    await Promise.all([fetchHighlights(), fetchSessions(), fetchSectionSettings()]);
    setIsRefreshing(false);
  }

  async function fetchHighlights() {
    setLoadingHighlights(true);
    const { data, error: fetchError } = await supabase
      .from("academy_highlights")
      .select("id,title,description,display_order,is_active")
      .order("display_order", { ascending: true });

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingHighlights(false);
      return;
    }

    setHighlights(
      (data ?? []).map((item) => ({
        ...item,
        draftTitle: item.title ?? "",
        draftDescription: item.description ?? "",
        draftDisplayOrder: item.display_order ?? 1,
        draftIsActive: item.is_active ?? true,
        dirty: false,
        isDeleting: false,
      })),
    );
    setLoadingHighlights(false);
  }

  async function fetchSessions() {
    setLoadingSessions(true);
    const { data, error: fetchError } = await supabase
      .from("academy_sessions")
      .select(
        "id,title,description,level,session_date,start_time,end_time,location,display_order,is_active",
      )
      .order("display_order", { ascending: true });

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingSessions(false);
      return;
    }

    const normalizeTime = (value?: string | null) => (value ? value.slice(0, 5) : "");

    setSessions(
      (data ?? []).map((item) => ({
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
        isCloning: false,
      })),
    );
    setLoadingSessions(false);
  }

  async function fetchSectionSettings() {
    setLoadingSections(true);
    const { data, error: fetchError } = await supabase
      .from("site_sections")
      .select("id,section_key,label,is_active");

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingSections(false);
      return;
    }

    const existing = new Map<string, SiteSectionSetting>((data ?? []).map((item) => [item.section_key, item]));

    setSections(
      sectionDefinitions.map((definition) => {
        const record = existing.get(definition.key);
        const isActive = record?.is_active ?? false;

        return {
          id: record?.id,
          section_key: definition.key,
          label: record?.label ?? definition.label,
          description: definition.description,
          is_active: isActive,
          draftIsActive: isActive,
          dirty: false,
        } satisfies EditableSectionSetting;
      }),
    );

    setLoadingSections(false);
  }

  function toggleSection(section: "highlights" | "sessions" | "sections") {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function updateHighlightField(
    id: string,
    field: "title" | "description" | "display_order" | "is_active",
    value: string | number | boolean,
  ) {
    setHighlights((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const next = { ...item, dirty: true };

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
      }),
    );
  }

  function updateSessionField(
    id: string,
    field:
      | "title"
      | "description"
      | "level"
      | "session_date"
      | "start_time"
      | "end_time"
      | "location"
      | "display_order"
      | "is_active",
    value: string | number | boolean,
  ) {
    setSessions((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const next = { ...item, dirty: true };

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
      }),
    );
  }

  function updateSectionField(sectionKey: string, isActive: boolean) {
    setSections((prev) =>
      prev.map((item) => {
        if (item.section_key !== sectionKey) {
          return item;
        }

        return {
          ...item,
          draftIsActive: isActive,
          dirty: item.is_active !== isActive,
        };
      }),
    );
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
      await Promise.all([
        ...highlights
          .filter((item) => item.dirty)
          .map(async (item) => {
            const { error: updateError } = await supabase
              .from("academy_highlights")
              .update({
                title: item.draftTitle.trim(),
                description: item.draftDescription.trim(),
                display_order: item.draftDisplayOrder,
                is_active: item.draftIsActive,
              })
              .eq("id", item.id);

            if (updateError) {
              throw updateError;
            }
          }),
        ...sessions
          .filter((item) => item.dirty)
          .map(async (item) => {
            const { error: updateError } = await supabase
              .from("academy_sessions")
              .update({
                title: item.draftTitle.trim(),
                description: item.draftDescription.trim(),
                level: item.draftLevel.trim(),
                session_date: item.draftSessionDate,
                start_time: item.draftStartTime,
                end_time: item.draftEndTime,
                location: item.draftLocation.trim(),
                display_order: item.draftDisplayOrder,
                is_active: item.draftIsActive,
              })
              .eq("id", item.id);

            if (updateError) {
              throw updateError;
            }
          }),
        ...sections
          .filter((item) => item.dirty)
          .map(async (item) => {
            const payload = {
              id: item.id,
              section_key: item.section_key,
              label: item.label,
              is_active: item.draftIsActive,
            };

            const { error: updateError } = await supabase
              .from("site_sections")
              .upsert(payload, { onConflict: "section_key" });

            if (updateError) {
              throw updateError;
            }
          }),
      ]);

      setMessage("Changes saved.");
      await Promise.all([fetchHighlights(), fetchSessions(), fetchSectionSettings()]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setIsSavingAll(false);
    }
  }

  async function handleCreateHighlight(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreatingHighlight(true);
    setError(null);
    setMessage(null);

    const payload = {
      title: highlightForm.title.trim(),
      description: highlightForm.description.trim(),
      display_order: Number(highlightForm.display_order) || 1,
      is_active: highlightForm.is_active,
    };

    const { error: insertError } = await supabase.from("academy_highlights").insert(payload);

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

  async function handleCreateSession(event: React.FormEvent<HTMLFormElement>) {
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
      is_active: sessionForm.is_active,
    };

    const { error: insertError } = await supabase.from("academy_sessions").insert(payload);

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

  async function handleDeleteHighlight(id: string) {
    setHighlights((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleting: true } : item)));
    setError(null);
    setMessage(null);

    const { error: deleteError } = await supabase.from("academy_highlights").delete().eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setHighlights((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isDeleting: false } : item)),
      );
      return;
    }

    setMessage("Highlight removed.");
    await fetchHighlights();
  }

  async function handleDeleteSession(id: string) {
    setSessions((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleting: true } : item)));
    setError(null);
    setMessage(null);

    const { error: deleteError } = await supabase.from("academy_sessions").delete().eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setSessions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isDeleting: false } : item)),
      );
      return;
    }

    setMessage("Session removed.");
    await fetchSessions();
  }

  async function handleCloneSession(id: string) {
    const source = sessions.find((item) => item.id === id);

    if (!source) {
      return;
    }

    setSessions((prev) => prev.map((item) => (item.id === id ? { ...item, isCloning: true } : item)));
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
      is_active: source.draftIsActive,
    };

    const { error: cloneError } = await supabase.from("academy_sessions").insert(payload);

    if (cloneError) {
      console.error(cloneError);
      setError(cloneError.message);
      setSessions((prev) => prev.map((item) => (item.id === id ? { ...item, isCloning: false } : item)));
      return;
    }

    setMessage("Session cloned. Update the new entry and save when ready.");
    await fetchSessions();
  }

  const renderActionButtons = () => (
    <>
      <button
        type="button"
        onClick={() => void refreshAll()}
        disabled={isRefreshing || isSavingAll}
        className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
      >
        {isRefreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
        Refresh data
      </button>
      <button
        type="button"
        onClick={() => void handleSaveAll()}
        disabled={!hasDirty || isSavingAll}
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSavingAll ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        Save changes
      </button>
    </>
  );

  return (
    <PageShell>
      <PageHero
        eyebrow="Internal"
        title="Admin Dashboard"
        subtitle="Manage the academy highlights that share the program story on the public homepage."
      />

      <section className="border-b border-border bg-card/20 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <div className="flex gap-2">{renderActionButtons()}</div>
          </div>
          {(message || error) && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              {message && (
                <div className="inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                  {message}
                </div>
              )}
              {error && (
                <div className="inline-flex items-center gap-2 rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-destructive">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-background">
              <button
                type="button"
                onClick={() => toggleSection("sections")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.sections}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Site Sections</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingSections ? "Loading" : `${sections.filter((item) => item.draftIsActive).length} visible`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${collapsed.sections ? "" : "rotate-180"}`} />
                </div>
              </button>
              {!collapsed.sections && (
                <div className="space-y-4 border-t border-border p-6">
                  {loadingSections ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading section visibility from Supabase…
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div key={section.section_key} className="rounded-sm border border-border bg-card/20 p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-display text-lg uppercase tracking-[0.25em]">
                                  {section.label}
                                </span>
                                {section.dirty && (
                                  <span className="inline-flex items-center rounded-sm bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">
                                    Unsaved
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                                {section.description}
                              </p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={section.draftIsActive}
                                onChange={(event) => updateSectionField(section.section_key, event.target.checked)}
                              />
                              <div className="h-6 w-12 rounded-full border border-border bg-muted transition peer-checked:border-primary peer-checked:bg-primary/60"></div>
                              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background transition-transform peer-checked:translate-x-6"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-sm border border-border bg-background">
              <button
                type="button"
                onClick={() => toggleSection("highlights")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.highlights}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Highlights</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingHighlights ? "Loading" : `${sortedHighlights.length} items`}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${collapsed.highlights ? "" : "rotate-180"}`}
                  />
                </div>
              </button>
              {!collapsed.highlights && (
                <div className="space-y-6 border-t border-border p-6">
                  {loadingHighlights ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading highlights from Supabase…
                    </div>
                  ) : sortedHighlights.length === 0 ? (
                    <div className="rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground">
                      No highlights yet. Use the form below to create your first academy story.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedHighlights.map((highlight) => (
                        <div key={highlight.id} className="space-y-4 rounded-sm border border-border bg-background p-6">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            <span>Highlight</span>
                            {highlight.dirty && (
                              <span className="rounded-sm bg-primary/10 px-2 py-1 text-primary">Unsaved</span>
                            )}
                          </div>
                          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Title</label>
                              <input
                                value={highlight.draftTitle}
                                onChange={(event) =>
                                  updateHighlightField(highlight.id, "title", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Display Order
                              </label>
                              <input
                                type="number"
                                min={1}
                                value={highlight.draftDisplayOrder}
                                onChange={(event) =>
                                  updateHighlightField(highlight.id, "display_order", Number(event.target.value))
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Description
                              </label>
                              <textarea
                                value={highlight.draftDescription}
                                onChange={(event) =>
                                  updateHighlightField(highlight.id, "description", event.target.value)
                                }
                                rows={3}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Status</label>
                              <select
                                value={highlight.draftIsActive ? "active" : "inactive"}
                                onChange={(event) =>
                                  updateHighlightField(
                                    highlight.id,
                                    "is_active",
                                    event.target.value === "active",
                                  )
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Hidden</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => void handleDeleteHighlight(highlight.id)}
                              className="inline-flex items-center gap-2 rounded-sm border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                              disabled={highlight.isDeleting}
                            >
                              {highlight.isDeleting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rounded-sm border border-border bg-background p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                      <Plus className="h-3.5 w-3.5" /> New highlight
                    </div>
                    <form className="space-y-4" onSubmit={handleCreateHighlight}>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                          Title
                        </label>
                        <input
                          value={highlightForm.title}
                          onChange={(event) =>
                            setHighlightForm((prev) => ({ ...prev, title: event.target.value }))
                          }
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                          Description
                        </label>
                        <textarea
                          value={highlightForm.description}
                          onChange={(event) =>
                            setHighlightForm((prev) => ({ ...prev, description: event.target.value }))
                          }
                          rows={4}
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                            Display Order
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={highlightForm.display_order}
                            onChange={(event) =>
                              setHighlightForm((prev) => ({
                                ...prev,
                                display_order: Number(event.target.value) || 1,
                              }))
                            }
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={highlightForm.is_active ? "active" : "inactive"}
                            onChange={(event) =>
                              setHighlightForm((prev) => ({
                                ...prev,
                                is_active: event.target.value === "active",
                              }))
                            }
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Hidden</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={creatingHighlight}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {creatingHighlight ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                        {creatingHighlight ? "Saving" : "Add highlight"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-sm border border-border bg-background">
              <button
                type="button"
                onClick={() => toggleSection("sessions")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.sessions}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Academy Sessions</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingSessions ? "Loading" : `${sortedSessions.length} items`}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${collapsed.sessions ? "" : "rotate-180"}`}
                  />
                </div>
              </button>
              {!collapsed.sessions && (
                <div className="space-y-6 border-t border-border p-6">
                  {loadingSessions ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading sessions from Supabase…
                    </div>
                  ) : sortedSessions.length === 0 ? (
                    <div className="rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground">
                      No sessions yet. Use the form below to add the first academy session.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedSessions.map((session) => (
                        <div key={session.id} className="space-y-4 rounded-sm border border-border bg-background p-6">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            <span>Session</span>
                            {session.dirty && (
                              <span className="rounded-sm bg-primary/10 px-2 py-1 text-primary">Unsaved</span>
                            )}
                          </div>
                          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Title
                              </label>
                              <input
                                value={session.draftTitle}
                                onChange={(event) =>
                                  updateSessionField(session.id, "title", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Level
                              </label>
                              <input
                                value={session.draftLevel}
                                onChange={(event) =>
                                  updateSessionField(session.id, "level", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2 lg:col-span-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Description
                              </label>
                              <textarea
                                value={session.draftDescription}
                                onChange={(event) =>
                                  updateSessionField(session.id, "description", event.target.value)
                                }
                                rows={3}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Date
                              </label>
                              <input
                                type="date"
                                value={session.draftSessionDate}
                                onChange={(event) =>
                                  updateSessionField(session.id, "session_date", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Location
                              </label>
                              <input
                                value={session.draftLocation}
                                onChange={(event) =>
                                  updateSessionField(session.id, "location", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Start time
                              </label>
                              <input
                                type="time"
                                value={session.draftStartTime}
                                onChange={(event) =>
                                  updateSessionField(session.id, "start_time", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                End time
                              </label>
                              <input
                                type="time"
                                value={session.draftEndTime}
                                onChange={(event) =>
                                  updateSessionField(session.id, "end_time", event.target.value)
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Display Order
                              </label>
                              <input
                                type="number"
                                min={1}
                                value={session.draftDisplayOrder}
                                onChange={(event) =>
                                  updateSessionField(
                                    session.id,
                                    "display_order",
                                    Number(event.target.value),
                                  )
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Status
                              </label>
                              <select
                                value={session.draftIsActive ? "active" : "inactive"}
                                onChange={(event) =>
                                  updateSessionField(
                                    session.id,
                                    "is_active",
                                    event.target.value === "active",
                                  )
                                }
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Hidden</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => void handleCloneSession(session.id)}
                              className="inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                              disabled={session.isCloning}
                            >
                              {session.isCloning ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                              Clone
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteSession(session.id)}
                              className="inline-flex items-center gap-2 rounded-sm border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                              disabled={session.isDeleting}
                            >
                              {session.isDeleting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rounded-sm border border-border bg-background p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                      <Plus className="h-3.5 w-3.5" /> New session
                    </div>
                    <form className="space-y-4" onSubmit={handleCreateSession}>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Title</label>
                        <input
                          value={sessionForm.title}
                          onChange={(event) => setSessionForm((prev) => ({ ...prev, title: event.target.value }))}
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Level</label>
                        <input
                          value={sessionForm.level}
                          onChange={(event) => setSessionForm((prev) => ({ ...prev, level: event.target.value }))}
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Description</label>
                        <textarea
                          value={sessionForm.description}
                          onChange={(event) =>
                            setSessionForm((prev) => ({ ...prev, description: event.target.value }))
                          }
                          rows={4}
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Date</label>
                          <input
                            type="date"
                            value={sessionForm.session_date}
                            onChange={(event) =>
                              setSessionForm((prev) => ({ ...prev, session_date: event.target.value }))
                            }
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Location</label>
                          <input
                            value={sessionForm.location}
                            onChange={(event) =>
                              setSessionForm((prev) => ({ ...prev, location: event.target.value }))
                            }
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Start time</label>
                          <input
                            type="time"
                            value={sessionForm.start_time}
                            onChange={(event) =>
                              setSessionForm((prev) => ({ ...prev, start_time: event.target.value }))
                            }
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">End time</label>
                          <input
                            type="time"
                            value={sessionForm.end_time}
                            onChange={(event) =>
                              setSessionForm((prev) => ({ ...prev, end_time: event.target.value }))
                            }
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                            Display Order
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={sessionForm.display_order}
                            onChange={(event) =>
                              setSessionForm((prev) => ({
                                ...prev,
                                display_order: Number(event.target.value) || 1,
                              }))
                            }
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Status</label>
                          <select
                            value={sessionForm.is_active ? "active" : "inactive"}
                            onChange={(event) =>
                              setSessionForm((prev) => ({
                                ...prev,
                                is_active: event.target.value === "active",
                              }))
                            }
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Hidden</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={creatingSession}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {creatingSession ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                        {creatingSession ? "Saving" : "Add session"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/20 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Manage academy content
            </span>
            <div className="flex gap-2">{renderActionButtons()}</div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

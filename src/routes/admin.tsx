import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Copy, FileDown, Loader2, Plus, Printer, RefreshCw, Save, Trash2 } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/lib/supabase/client";
import type {
  AcademyHighlight,
  AcademySession,
  SiteSectionSetting,
  HomepageHeroSettings,
  AcademyCoach,
  AcademyRegistration,
} from "@/lib/supabase/types";
import summerTrainFlyer from "@/assets/summertrain.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Saint Peters Basketball Academy" },
      {
        name: "description",
        content: "Manage Saint Peters academy highlights, sessions, and homepage modules.",
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

type EditableHero = {
  id?: string;
  badgeText: string;
  draftBadgeText: string;
  headline: string;
  draftHeadline: string;
  description: string;
  draftDescription: string;
  primaryLabel: string;
  draftPrimaryLabel: string;
  primaryHref: string;
  draftPrimaryHref: string;
  secondaryLabel: string;
  draftSecondaryLabel: string;
  secondaryHref: string;
  draftSecondaryHref: string;
  imageUrl: string;
  draftImageUrl: string;
  dirty: boolean;
};

type EditableCoach = AcademyCoach & {
  draftName: string;
  draftTitle: string;
  draftYears: string;
  draftBio: string;
  draftDisplayOrder: number;
  draftIsActive: boolean;
  draftHeadshotUrl: string;
  dirty: boolean;
  isDeleting?: boolean;
};

type EditableRegistration = AcademyRegistration & {
  draftIsPaid: boolean;
  draftWaiverSubmitted: boolean;
  dirty: boolean;
};

type CollapsibleKey = "hero" | "sections" | "highlights" | "sessions" | "coaches" | "registrations";

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

const defaultCoachForm = {
  name: "",
  title: "",
  years: "",
  bio: "",
  display_order: 1,
  is_active: true,
  headshot_url: "",
};

function toEditableHero(record?: HomepageHeroSettings | null): EditableHero {
  const badgeText = record?.badge_text ?? "";
  const headline = record?.headline ?? "";
  const description = record?.description ?? "";
  const primaryLabel = record?.primary_cta_label ?? "";
  const primaryHref = record?.primary_cta_href ?? "";
  const secondaryLabel = record?.secondary_cta_label ?? "";
  const secondaryHref = record?.secondary_cta_href ?? "";
  const imageUrl = record?.image_url ?? "";

  return {
    id: record?.id,
    badgeText,
    draftBadgeText: badgeText,
    headline,
    draftHeadline: headline,
    description,
    draftDescription: description,
    primaryLabel,
    draftPrimaryLabel: primaryLabel,
    primaryHref,
    draftPrimaryHref: primaryHref,
    secondaryLabel,
    draftSecondaryLabel: secondaryLabel,
    secondaryHref,
    draftSecondaryHref: secondaryHref,
    imageUrl,
    draftImageUrl: imageUrl,
    dirty: false,
  };
}

const emptyHero: EditableHero = toEditableHero();

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
  {
    key: "home_highlights",
    label: "Homepage Highlights",
    description: "Toggle the three-value highlight tiles under the hero.",
  },
  {
    key: "home_sessions",
    label: "Homepage Sessions",
    description: "Toggle the upcoming academy sessions grid on the homepage.",
  },
];

function escapeHtml(value: string) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function AdminDashboard() {
  const [highlights, setHighlights] = useState<EditableHighlight[]>([]);
  const [sessions, setSessions] = useState<EditableSession[]>([]);
  const [coaches, setCoaches] = useState<EditableCoach[]>([]);
  const [registrations, setRegistrations] = useState<EditableRegistration[]>([]);
  const [sections, setSections] = useState<EditableSectionSetting[]>([]);
  const [hero, setHero] = useState<EditableHero>(emptyHero);
  const [loadingHighlights, setLoadingHighlights] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingSections, setLoadingSections] = useState(true);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [creatingHighlight, setCreatingHighlight] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [creatingCoach, setCreatingCoach] = useState(false);
  const [highlightForm, setHighlightForm] = useState(defaultHighlightForm);
  const [sessionForm, setSessionForm] = useState(defaultSessionForm);
  const [coachForm, setCoachForm] = useState(defaultCoachForm);
  const [collapsed, setCollapsed] = useState<Record<CollapsibleKey, boolean>>({
    hero: false,
    sections: true,
    highlights: true,
    sessions: true,
    coaches: true,
    registrations: true,
  });
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

  const sortedCoaches = useMemo(
    () => [...coaches].sort((a, b) => a.draftDisplayOrder - b.draftDisplayOrder),
    [coaches],
  );

  const sortedRegistrations = useMemo(() => {
    return [...registrations].sort((a, b) => {
      const sessionCompare = (a.session_title ?? "").localeCompare(b.session_title ?? "");
      if (sessionCompare !== 0) {
        return sessionCompare;
      }

      return (a.player_name ?? "").localeCompare(b.player_name ?? "");
    });
  }, [registrations]);

  const registrationCsvContent = useMemo(() => {
    if (sortedRegistrations.length === 0) {
      return "";
    }

    const header = [
      "Session",
      "Player Name",
      "Parent/Guardian Name",
      "Phone Number",
      "Grade Level",
      "Paid",
      "Waiver",
      "Submitted",
    ];

    const rows = sortedRegistrations.map((entry) => [
      entry.session_title ?? "",
      entry.player_name,
      entry.guardian_name,
      entry.phone_number,
      entry.grade_level,
      entry.draftIsPaid ? "Paid" : "Unpaid",
      entry.draftWaiverSubmitted ? "Waiver Submitted" : "Waiver Pending",
      entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "",
    ]);

    return [header, ...rows]
      .map((cols) => cols.map((col) => `"${String(col ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
  }, [sortedRegistrations]);

  const hasDirty = useMemo(
    () =>
      hero.dirty ||
      highlights.some((item) => item.dirty) ||
      sessions.some((item) => item.dirty) ||
      sections.some((item) => item.dirty) ||
      coaches.some((item) => item.dirty) ||
      registrations.some((item) => item.dirty),
    [hero.dirty, highlights, sessions, sections, coaches, registrations],
  );

  async function refreshAll() {
    setIsRefreshing(true);
    setError(null);
    setMessage(null);
    await Promise.all([
      fetchHeroSettings(),
      fetchHighlights(),
      fetchSessions(),
      fetchCoachRoster(),
      fetchRegistrations(),
      fetchSectionSettings(),
    ]);
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

  async function fetchHeroSettings() {
    setLoadingHero(true);
    const { data, error: fetchError } = await supabase
      .from("homepage_hero_settings")
      .select("id,badge_text,headline,description,primary_cta_label,primary_cta_href,secondary_cta_label,secondary_cta_href,image_url")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError);
      setError(fetchError.message);
      setHero(emptyHero);
      setLoadingHero(false);
      return;
    }

    setHero(toEditableHero(data ?? undefined));
    setLoadingHero(false);
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

  async function fetchCoachRoster() {
    setLoadingCoaches(true);
    const { data, error: fetchError } = await supabase
      .from("academy_coaches")
      .select("id,name,title,years,bio,display_order,is_active,headshot_url")
      .order("display_order", { ascending: true });

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingCoaches(false);
      return;
    }

    setCoaches(
      (data ?? []).map((item) => ({
        ...item,
        draftName: item.name ?? "",
        draftTitle: item.title ?? "",
        draftYears: item.years ?? "",
        draftBio: item.bio ?? "",
        draftDisplayOrder: item.display_order ?? 1,
        draftIsActive: item.is_active ?? true,
        draftHeadshotUrl: item.headshot_url ?? "",
        dirty: false,
        isDeleting: false,
      })),
    );
    setLoadingCoaches(false);
  }

  async function fetchRegistrations() {
    setLoadingRegistrations(true);
    const { data, error: fetchError } = await supabase
      .from("academy_registrations")
      .select(
        "id,session_id,session_title,player_name,guardian_name,phone_number,grade_level,is_paid,waiver_submitted,created_at",
      )
      .order("session_title", { ascending: true })
      .order("player_name", { ascending: true });

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoadingRegistrations(false);
      return;
    }

    setRegistrations(
      (data ?? []).map((item) => ({
        ...item,
        draftIsPaid: item.is_paid ?? false,
        draftWaiverSubmitted: item.waiver_submitted ?? false,
        dirty: false,
      })),
    );
    setLoadingRegistrations(false);
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

  function toggleSection(section: CollapsibleKey) {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function handleDownloadRegistrationsCsv() {
    if (!registrationCsvContent) {
      setMessage("No registrations to export yet.");
      return;
    }

    const blob = new Blob([registrationCsvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `spba-summer-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handlePrintRegistrations() {
    const printContents = document.getElementById("registrations-print-area");
    if (!printContents) {
      setError("Unable to open print view.");
      return;
    }

    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");

    if (!printWindow) {
      setError("Popup blocked. Allow pop-ups to print the roster.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>SPBA Summer Academy Sign-In</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 32px; color: #111827; }
            h1 { text-transform: uppercase; letter-spacing: 0.2em; font-size: 20px; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #111827; padding: 8px; font-size: 12px; text-align: left; }
            th { text-transform: uppercase; letter-spacing: 0.16em; font-weight: 600; background: #f8fafc; }
            .signature { height: 32px; }
          </style>
        </head>
        <body>
          ${printContents.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  function updateHeroField(
    field:
      | "badgeText"
      | "headline"
      | "description"
      | "primaryLabel"
      | "primaryHref"
      | "secondaryLabel"
      | "secondaryHref"
      | "imageUrl",
    value: string,
  ) {
    setHero((prev) => {
      const next = { ...prev, dirty: true };

      switch (field) {
        case "badgeText":
          next.draftBadgeText = value;
          break;
        case "headline":
          next.draftHeadline = value;
          break;
        case "description":
          next.draftDescription = value;
          break;
        case "primaryLabel":
          next.draftPrimaryLabel = value;
          break;
        case "primaryHref":
          next.draftPrimaryHref = value;
          break;
        case "secondaryLabel":
          next.draftSecondaryLabel = value;
          break;
        case "secondaryHref":
          next.draftSecondaryHref = value;
          break;
        case "imageUrl":
          next.draftImageUrl = value;
          break;
      }

      return next;
    });
  }

  function resetHeroDraft() {
    setHero((prev) =>
      prev.dirty
        ? {
            ...prev,
            draftBadgeText: prev.badgeText,
            draftHeadline: prev.headline,
            draftDescription: prev.description,
            draftPrimaryLabel: prev.primaryLabel,
            draftPrimaryHref: prev.primaryHref,
            draftSecondaryLabel: prev.secondaryLabel,
            draftSecondaryHref: prev.secondaryHref,
            draftImageUrl: prev.imageUrl,
            dirty: false,
          }
        : prev,
    );
  }

  function updateRegistrationField(id: string, field: "is_paid" | "waiver_submitted", value: boolean) {
    setRegistrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              draftIsPaid: field === "is_paid" ? value : item.draftIsPaid,
              draftWaiverSubmitted: field === "waiver_submitted" ? value : item.draftWaiverSubmitted,
              dirty:
                (field === "is_paid" ? value : item.draftIsPaid) !== item.is_paid ||
                (field === "waiver_submitted" ? value : item.draftWaiverSubmitted) !== item.waiver_submitted,
            }
          : item,
      ),
    );
  }

  function updateCoachField(
    id: string,
    field: "name" | "title" | "years" | "bio" | "display_order" | "is_active" | "headshot_url",
    value: string | number | boolean,
  ) {
    setCoaches((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const next = { ...item, dirty: true };

        switch (field) {
          case "name":
            next.draftName = String(value);
            break;
          case "title":
            next.draftTitle = String(value);
            break;
          case "years":
            next.draftYears = String(value);
            break;
          case "bio":
            next.draftBio = String(value);
            break;
          case "display_order":
            next.draftDisplayOrder = Number(value) || 1;
            break;
          case "is_active":
            next.draftIsActive = Boolean(value);
            break;
          case "headshot_url":
            next.draftHeadshotUrl = String(value);
            break;
        }

        return next;
      }),
    );
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
      const updates: Promise<unknown>[] = [];

      if (hero.dirty) {
        updates.push(
          (async () => {
            const payload = {
              badge_text: hero.draftBadgeText.trim() || null,
              headline: hero.draftHeadline.trim() || null,
              description: hero.draftDescription.trim() || null,
              primary_cta_label: hero.draftPrimaryLabel.trim() || null,
              primary_cta_href: hero.draftPrimaryHref.trim() || null,
              secondary_cta_label: hero.draftSecondaryLabel.trim() || null,
              secondary_cta_href: hero.draftSecondaryHref.trim() || null,
              image_url: hero.draftImageUrl.trim() || null,
            } satisfies Omit<HomepageHeroSettings, "id">;

            const { error: updateError } = await supabase
              .from("homepage_hero_settings")
              .upsert({ id: hero.id, ...payload }, { onConflict: "id" });

            if (updateError) {
              throw updateError;
            }
          })(),
        );
      }

      updates.push(
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
      );

      updates.push(
        ...coaches
          .filter((item) => item.dirty)
          .map(async (item) => {
            const payload = {
              name: item.draftName.trim(),
              title: item.draftTitle.trim(),
              years: item.draftYears.trim(),
              bio: item.draftBio.trim(),
              display_order: item.draftDisplayOrder,
              is_active: item.draftIsActive,
              headshot_url: item.draftHeadshotUrl.trim() || null,
            } satisfies Omit<AcademyCoach, "id">;

            const { error: updateError } = await supabase
              .from("academy_coaches")
              .update(payload)
              .eq("id", item.id);

            if (updateError) {
              throw updateError;
            }
          }),
      );

      updates.push(
        ...registrations
          .filter((item) => item.dirty)
          .map(async (item) => {
            const { error: updateError } = await supabase
              .from("academy_registrations")
              .update({
                is_paid: item.draftIsPaid,
                waiver_submitted: item.draftWaiverSubmitted,
              })
              .eq("id", item.id);

            if (updateError) {
              throw updateError;
            }
          }),
      );

      await Promise.all(updates);

      setMessage("Changes saved.");
      await Promise.all([
        fetchHeroSettings(),
        fetchHighlights(),
        fetchSessions(),
        fetchCoachRoster(),
        fetchRegistrations(),
        fetchSectionSettings(),
      ]);
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

  async function handleDeleteCoach(id: string) {
    setCoaches((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleting: true } : item)));
    setError(null);
    setMessage(null);

    const { error: deleteError } = await supabase.from("academy_coaches").delete().eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setCoaches((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleting: false } : item)));
      return;
    }

    setMessage("Coach removed.");
    await fetchCoachRoster();
  }

  async function handleCreateCoach(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreatingCoach(true);
    setError(null);
    setMessage(null);

    const payload = {
      name: coachForm.name.trim(),
      title: coachForm.title.trim(),
      years: coachForm.years.trim(),
      bio: coachForm.bio.trim(),
      display_order: Number(coachForm.display_order) || 1,
      is_active: coachForm.is_active,
      headshot_url: coachForm.headshot_url.trim() || null,
    } satisfies Omit<AcademyCoach, "id">;

    const { error: insertError } = await supabase.from("academy_coaches").insert(payload);

    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setCreatingCoach(false);
      return;
    }

    setCoachForm(defaultCoachForm);
    setCreatingCoach(false);
    setMessage("Coach added.");
    await fetchCoachRoster();
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
        subtitle="Update the homepage hero, highlights, sessions, and staff so SPBA stays ready for the next rollout."
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
                onClick={() => toggleSection("hero")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.hero}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Homepage Hero</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingHero ? "Loading" : hero.dirty ? "Unsaved changes" : "Live"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${collapsed.hero ? "" : "rotate-180"}`} />
                </div>
              </button>
              {!collapsed.hero && (
                <div className="space-y-6 border-t border-border p-6">
                  {loadingHero ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading hero settings from Supabase…
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Badge
                              </label>
                              <input
                                value={hero.draftBadgeText}
                                onChange={(event) => updateHeroField("badgeText", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="Lion Pride Summer"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Primary Button Label
                              </label>
                              <input
                                value={hero.draftPrimaryLabel}
                                onChange={(event) => updateHeroField("primaryLabel", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="Sign up for Summer Academy"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                              Headline
                            </label>
                            <textarea
                              value={hero.draftHeadline}
                              onChange={(event) => updateHeroField("headline", event.target.value)}
                              rows={2}
                              className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder="For middle & elementary school we are having basketball."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                              Description
                            </label>
                            <textarea
                              value={hero.draftDescription}
                              onChange={(event) => updateHeroField("description", event.target.value)}
                              rows={4}
                              className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder="Saint Peters Basketball Academy is the summer home for lion-hearted hoopers..."
                            />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Primary URL
                              </label>
                              <input
                                value={hero.draftPrimaryHref}
                                onChange={(event) => updateHeroField("primaryHref", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="/summer-academy"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Secondary Label
                              </label>
                              <input
                                value={hero.draftSecondaryLabel ?? ""}
                                onChange={(event) => updateHeroField("secondaryLabel", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="View Full Schedule"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Secondary URL
                              </label>
                              <input
                                value={hero.draftSecondaryHref ?? ""}
                                onChange={(event) => updateHeroField("secondaryHref", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="/schedule"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Flyer / Hero Image URL
                              </label>
                              <input
                                value={hero.draftImageUrl ?? ""}
                                onChange={(event) => updateHeroField("imageUrl", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                placeholder="https://.../summertrain.png"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="rounded-sm border border-border bg-card/20 p-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Live Preview
                          </div>
                          <div className="rounded-sm border border-border bg-white p-4 shadow-elevated">
                            <div className="text-[10px] uppercase tracking-[0.4em] text-primary">
                              {hero.draftBadgeText || "Badge"}
                            </div>
                            <div className="mt-3 font-display text-xl uppercase">
                              {hero.draftHeadline || "Headline"}
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">
                              {hero.draftDescription || "Add description to tell families about the current focus."}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.35em]">
                              <span className="inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-2 text-primary-foreground">
                                {hero.draftPrimaryLabel || "Primary CTA"}
                              </span>
                              {hero.draftSecondaryLabel && (
                                <span className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-foreground/70">
                                  {hero.draftSecondaryLabel}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="overflow-hidden rounded-sm border border-border bg-card/20">
                            <img
                              src={hero.draftImageUrl || hero.imageUrl || summerTrainFlyer}
                              alt="Hero preview"
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between gap-3">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                          {hero.dirty ? "Unsaved hero changes" : "Hero synced with Supabase"}
                        </div>
                        <button
                          type="button"
                          onClick={resetHeroDraft}
                          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                          disabled={!hero.dirty}
                        >
                          Reset to saved
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

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

            <div className="rounded-sm border border-border bg-background">
              <button
                type="button"
                onClick={() => toggleSection("coaches")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.coaches}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Coaches</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingCoaches ? "Loading" : `${coaches.length} active`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${collapsed.coaches ? "" : "rotate-180"}`} />
                </div>
              </button>
              {!collapsed.coaches && (
                <div className="space-y-6 border-t border-border p-6">
                  {loadingCoaches ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading coaches from Supabase…
                    </div>
                  ) : coaches.length === 0 ? (
                    <div className="rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground">
                      No coaches yet. Use the form below to add the Saint Peters staff.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedCoaches.map((coach) => (
                        <div key={coach.id} className="space-y-4 rounded-sm border border-border bg-background p-6">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            <span>Coach</span>
                            {coach.dirty && (
                              <span className="rounded-sm bg-primary/10 px-2 py-1 text-primary">Unsaved</span>
                            )}
                          </div>
                          <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Name</label>
                              <input
                                value={coach.draftName}
                                onChange={(event) => updateCoachField(coach.id, "name", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Title</label>
                              <input
                                value={coach.draftTitle}
                                onChange={(event) => updateCoachField(coach.id, "title", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Years</label>
                              <input
                                value={coach.draftYears}
                                onChange={(event) => updateCoachField(coach.id, "years", event.target.value)}
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
                                value={coach.draftDisplayOrder}
                                onChange={(event) => updateCoachField(coach.id, "display_order", Number(event.target.value))}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2 lg:col-span-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Bio</label>
                              <textarea
                                value={coach.draftBio}
                                onChange={(event) => updateCoachField(coach.id, "bio", event.target.value)}
                                rows={4}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                                Headshot URL
                              </label>
                              <input
                                value={coach.draftHeadshotUrl}
                                onChange={(event) => updateCoachField(coach.id, "headshot_url", event.target.value)}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Status</label>
                              <select
                                value={coach.draftIsActive ? "active" : "inactive"}
                                onChange={(event) => updateCoachField(coach.id, "is_active", event.target.value === "active")}
                                className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Hidden</option>
                              </select>
                            </div>
                          </div>
                          {coach.draftHeadshotUrl && (
                            <div className="overflow-hidden rounded-sm border border-border bg-card/20">
                              <img src={coach.draftHeadshotUrl} alt={coach.draftName} className="h-48 w-full object-cover" />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => void handleDeleteCoach(coach.id)}
                              className="inline-flex items-center gap-2 rounded-sm border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                              disabled={coach.isDeleting}
                            >
                              {coach.isDeleting ? (
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
                      <Plus className="h-3.5 w-3.5" /> New coach
                    </div>
                    <form className="space-y-4" onSubmit={handleCreateCoach}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Name</label>
                          <input
                            value={coachForm.name}
                            onChange={(event) => setCoachForm((prev) => ({ ...prev, name: event.target.value }))}
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Title</label>
                          <input
                            value={coachForm.title}
                            onChange={(event) => setCoachForm((prev) => ({ ...prev, title: event.target.value }))}
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Years</label>
                          <input
                            value={coachForm.years}
                            onChange={(event) => setCoachForm((prev) => ({ ...prev, years: event.target.value }))}
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
                            value={coachForm.display_order}
                            onChange={(event) =>
                              setCoachForm((prev) => ({ ...prev, display_order: Number(event.target.value) || 1 }))
                            }
                            required
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Bio</label>
                        <textarea
                          value={coachForm.bio}
                          onChange={(event) => setCoachForm((prev) => ({ ...prev, bio: event.target.value }))}
                          rows={4}
                          required
                          className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Headshot URL</label>
                          <input
                            value={coachForm.headshot_url}
                            onChange={(event) =>
                              setCoachForm((prev) => ({ ...prev, headshot_url: event.target.value }))
                            }
                            className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Status</label>
                          <select
                            value={coachForm.is_active ? "active" : "inactive"}
                            onChange={(event) =>
                              setCoachForm((prev) => ({ ...prev, is_active: event.target.value === "active" }))
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
                        disabled={creatingCoach}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {creatingCoach ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                        {creatingCoach ? "Saving" : "Add coach"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-sm border border-border bg-background">
              <button
                type="button"
                onClick={() => toggleSection("registrations")}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={!collapsed.registrations}
              >
                <div className="font-display text-2xl uppercase tracking-tight">Summer Academy Sign-Ups</div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {loadingRegistrations ? "Loading" : `${sortedRegistrations.length} entries`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${collapsed.registrations ? "" : "rotate-180"}`} />
                </div>
              </button>
              {!collapsed.registrations && (
                <div className="space-y-6 border-t border-border p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Export roster and bring a printed sign-in sheet on day one.
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadRegistrationsCsv}
                        className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                        disabled={loadingRegistrations || sortedRegistrations.length === 0}
                      >
                        <FileDown className="h-3.5 w-3.5" /> Download CSV
                      </button>
                      <button
                        type="button"
                        onClick={handlePrintRegistrations}
                        className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.3em] text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                        disabled={loadingRegistrations || sortedRegistrations.length === 0}
                      >
                        <Printer className="h-3.5 w-3.5" /> Print sign-in sheet
                      </button>
                    </div>
                  </div>

                  {loadingRegistrations ? (
                    <div className="flex items-center gap-3 rounded-sm border border-border bg-card/30 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading registrations from Supabase…
                    </div>
                  ) : sortedRegistrations.length === 0 ? (
                    <div className="rounded-sm border border-dashed border-border/60 bg-card/30 p-8 text-sm text-muted-foreground">
                      No registrations yet. Once families submit the Summer Academy form, the roster will populate here.
                    </div>
                  ) : (
                    <>
                      <div className="overflow-auto rounded-sm border border-border bg-card/10">
                        <table className="min-w-full divide-y divide-border text-left text-xs">
                          <thead className="bg-card/40 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                            <tr>
                              <th className="px-4 py-3">Session</th>
                              <th className="px-4 py-3">Player</th>
                              <th className="px-4 py-3">Parent / Guardian</th>
                              <th className="px-4 py-3">Phone</th>
                              <th className="px-4 py-3">Grade</th>
                              <th className="px-4 py-3">Paid</th>
                              <th className="px-4 py-3">Waiver</th>
                              <th className="px-4 py-3">Submitted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedRegistrations.map((entry) => (
                              <tr key={entry.id} className="border-b border-border/60 text-[11px]">
                                <td className="px-4 py-3 font-semibold uppercase tracking-[0.2em] text-primary">
                                  {entry.session_title ?? "Pending Session"}
                                </td>
                                <td className="px-4 py-3 font-display text-sm uppercase tracking-[0.2em] text-foreground">
                                  {entry.player_name}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{entry.guardian_name}</td>
                                <td className="px-4 py-3 text-muted-foreground">{entry.phone_number}</td>
                                <td className="px-4 py-3 text-muted-foreground">{entry.grade_level}</td>
                                <td className="px-4 py-3">
                                  <label className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
                                    <input
                                      type="checkbox"
                                      checked={entry.draftIsPaid}
                                      onChange={(event) => updateRegistrationField(entry.id, "is_paid", event.target.checked)}
                                    />
                                    Paid
                                  </label>
                                </td>
                                <td className="px-4 py-3">
                                  <label className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
                                    <input
                                      type="checkbox"
                                      checked={entry.draftWaiverSubmitted}
                                      onChange={(event) =>
                                        updateRegistrationField(entry.id, "waiver_submitted", event.target.checked)
                                      }
                                    />
                                    Waiver
                                  </label>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div id="registrations-print-area" className="hidden">
                        <h1>Saint Peters Basketball Academy — Summer Sign-In</h1>
                        <table>
                          <thead>
                            <tr>
                              <th>Session</th>
                              <th>Player</th>
                              <th>Parent / Guardian</th>
                              <th>Grade</th>
                              <th>Paid</th>
                              <th>Waiver</th>
                              <th className="signature">Day-of Signature</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedRegistrations.map((entry) => (
                              <tr key={entry.id}>
                                <td>{escapeHtml(entry.session_title ?? "")}</td>
                                <td>{escapeHtml(entry.player_name)}</td>
                                <td>{escapeHtml(entry.guardian_name)}</td>
                                <td>{escapeHtml(entry.grade_level)}</td>
                                <td>{entry.draftIsPaid ? "Paid" : "Unpaid"}</td>
                                <td>{entry.draftWaiverSubmitted ? "Waiver submitted" : "Waiver pending"}</td>
                                <td className="signature" />
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
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

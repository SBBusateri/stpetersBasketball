import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/lib/supabase/client";
import type { AcademyRegistration, AcademySession } from "@/lib/supabase/types";

export const Route = createFileRoute("/summer-academy")({
  head: () => ({
    meta: [
      { title: "Summer Academy Sign-Up — Saint Peters" },
      {
        name: "description",
        content:
          "Reserve a spot in the Saint Peters Basketball Academy summer programming for middle and elementary hoopers.",
      },
      { property: "og:title", content: "Summer Academy — Saint Peters Basketball" },
      {
        property: "og:description",
        content: "Lion Pride summer sessions for Saint Peters student-athletes and families.",
      },
    ],
  }),
  component: SummerAcademyPage,
});

function SummerAcademyPage() {
  const [sessions, setSessions] = useState<AcademySession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [formState, setFormState] = useState({
    session_id: "",
    player_name: "",
    guardian_name: "",
    phone_number: "",
    grade_level: "",
    is_paid: false,
    waiver_submitted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSessions() {
      setLoadingSessions(true);
      const { data, error: fetchError } = await supabase
        .from("academy_sessions")
        .select("id,title,description,level,session_date,start_time,end_time,location,display_order,is_active")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load sessions. Please try again soon.");
        setLoadingSessions(false);
        return;
      }

      setSessions(data ?? []);
      setLoadingSessions(false);
    }

    void loadSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  const sessionOptions = useMemo(() => {
    return sessions.map((session) => ({
      id: session.id,
      label: `${session.title} (${session.level})`,
    }));
  }, [sessions]);

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === formState.session_id) ?? null,
    [formState.session_id, sessions],
  );

  const helperText = selectedSession
    ? `${selectedSession.location} • ${selectedSession.session_date} • ${selectedSession.start_time}-${selectedSession.end_time}`
    : "Select a session to view schedule details.";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    const payload: Partial<AcademyRegistration> = {
      session_id: formState.session_id || null,
      session_title: selectedSession?.title ?? null,
      player_name: formState.player_name.trim(),
      guardian_name: formState.guardian_name.trim(),
      phone_number: formState.phone_number.trim(),
      grade_level: formState.grade_level.trim(),
      is_paid: formState.is_paid,
      waiver_submitted: formState.waiver_submitted,
    };

    const { error: insertError } = await supabase.from("academy_registrations").insert(payload);

    if (insertError) {
      console.error(insertError);
      setError(insertError.message || "Unable to submit registration.");
      setSubmitting(false);
      return;
    }

    setFormState({
      session_id: "",
      player_name: "",
      guardian_name: "",
      phone_number: "",
      grade_level: "",
      is_paid: false,
      waiver_submitted: false,
    });
    setSubmitting(false);
    setMessage("Registration received! We'll confirm details within 48 hours.");
  }

  const disableSubmit =
    submitting ||
    !formState.player_name.trim() ||
    !formState.guardian_name.trim() ||
    !formState.phone_number.trim() ||
    !formState.grade_level.trim() ||
    !formState.session_id;

  return (
    <PageShell>
      <PageHero
        eyebrow="Summer Academy"
        title="Reserve Your Spot"
        subtitle="Fill out the interest form and our staff will confirm placement by grade and skill group."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-card/20 p-6">
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">Summer Tracks</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">Lion Cubs (Grades 3-4):</span> Introducing fundamentals,
                  coordination, and joyful competition.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Rising Lions (Grades 5-6):</span> Skill breakdowns, shooting labs,
                  and team play concepts.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Lion Leaders (Grades 7-8):</span> Advanced reads, leadership
                  workshops, and game situations.
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-border bg-card/20 p-6">
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">What to Expect</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="rounded-sm bg-primary/5 p-3">
                  <span className="font-semibold text-primary">Weekly Skill Blocks</span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Dedicated courts for ball-handling, finishing, passing, and decision-making.
                  </p>
                </li>
                <li className="rounded-sm bg-primary/5 p-3">
                  <span className="font-semibold text-primary">Lion Strength</span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Age-appropriate movement prep led by Saint Peters performance staff.
                  </p>
                </li>
                <li className="rounded-sm bg-primary/5 p-3">
                  <span className="font-semibold text-primary">Character Circles</span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Daily huddles focused on effort, accountability, and being great teammates.
                  </p>
                </li>
                <li className="rounded-sm bg-primary/5 p-3">
                  <span className="font-semibold text-primary">Family Communication</span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Weekly emails with progress notes, video recaps, and upcoming logistics.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-sm border border-border bg-card/20 p-6 shadow-elevated">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl uppercase text-foreground">Sign up today</h3>
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your session, share your player details, and let us know if payment or paperwork is complete.
                We'll confirm your spot and follow up with next steps.
              </p>
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Session</label>
                  {loadingSessions ? (
                    <div className="flex items-center gap-2 rounded-sm border border-border bg-card/20 px-3 py-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading sessions…
                    </div>
                  ) : sessionOptions.length === 0 ? (
                    <div className="rounded-sm border border-dashed border-border/60 bg-card/20 px-3 py-2 text-sm text-muted-foreground">
                      No active summer sessions published. Check back soon or contact our staff.
                    </div>
                  ) : (
                    <select
                      value={formState.session_id}
                      onChange={(event) => setFormState((prev) => ({ ...prev, session_id: event.target.value }))}
                      required
                      className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a session</option>
                      {sessionOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{helperText}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Player Name</label>
                    <input
                      value={formState.player_name}
                      onChange={(event) => setFormState((prev) => ({ ...prev, player_name: event.target.value }))}
                      required
                      className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Parent / Guardian</label>
                    <input
                      value={formState.guardian_name}
                      onChange={(event) => setFormState((prev) => ({ ...prev, guardian_name: event.target.value }))}
                      required
                      className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Phone Number</label>
                    <input
                      value={formState.phone_number}
                      onChange={(event) => setFormState((prev) => ({ ...prev, phone_number: event.target.value }))}
                      placeholder="(555) 123-4567"
                      required
                      className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Grade Level</label>
                    <input
                      value={formState.grade_level}
                      onChange={(event) => setFormState((prev) => ({ ...prev, grade_level: event.target.value }))}
                      placeholder="Example: Rising 5th"
                      required
                      className="w-full rounded-sm border border-border bg-card/20 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={formState.is_paid}
                      onChange={(event) => setFormState((prev) => ({ ...prev, is_paid: event.target.checked }))}
                    />
                    Paid
                  </label>
                  <label className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={formState.waiver_submitted}
                      onChange={(event) => setFormState((prev) => ({ ...prev, waiver_submitted: event.target.checked }))}
                    />
                    Waiver Submitted
                  </label>
                </div>

                {message && (
                  <div className="rounded-sm border border-primary/40 bg-primary/10 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-destructive">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={disableSubmit}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  {submitting ? "Sending" : "Submit registration"}
                </button>
              </form>
            </div>

            <div className="rounded-sm border border-border bg-primary/10 p-6 text-sm text-foreground">
              <div className="font-display text-lg uppercase text-primary">Prefer to chat?</div>
              <p className="mt-2 text-muted-foreground">
                Not sure which track fits your player? Our staff will guide you through the summer pathway.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-elevated"
              >
                Talk with a Coach
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

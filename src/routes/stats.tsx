import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Team Stats — Reign Athletics Basketball" },
      { name: "description", content: "Individual and team statistics for the 2025-26 Reign Athletics season." },
      { property: "og:title", content: "Stats — Reign Athletics" },
      { property: "og:description", content: "Player and team statistics." },
    ],
  }),
  component: StatsPage,
});

const teamStats = [
  { label: "Record", value: "18-3" },
  { label: "PPG", value: "82.4" },
  { label: "OPP PPG", value: "64.1" },
  { label: "FG%", value: "48.7" },
  { label: "3PT%", value: "39.2" },
  { label: "REB/GAME", value: "41.3" },
];

const leaders = [
  { name: "Jalen Carter", num: 0, pos: "PG", gp: 21, ppg: 18.6, rpg: 4.1, apg: 6.8, fg: 47.3 },
  { name: "Marcus Thompson", num: 3, pos: "SG", gp: 21, ppg: 16.2, rpg: 3.8, apg: 3.1, fg: 44.1 },
  { name: "Tyrese Walker", num: 5, pos: "SF", gp: 20, ppg: 14.9, rpg: 6.2, apg: 2.4, fg: 51.2 },
  { name: "Cameron Reed", num: 21, pos: "PF", gp: 21, ppg: 12.5, rpg: 8.1, apg: 1.6, fg: 54.8 },
  { name: "Trey Robinson", num: 34, pos: "C", gp: 19, ppg: 10.4, rpg: 9.3, apg: 0.9, fg: 58.2 },
  { name: "Andre Brooks", num: 14, pos: "SF", gp: 21, ppg: 9.7, rpg: 4.5, apg: 2.0, fg: 45.6 },
];

function StatsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="2025–26 Season"
        title="Stats"
        subtitle="Through 21 games. Updated after every contest."
      />

      <section className="border-b border-border bg-card/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 font-display text-xs uppercase tracking-[0.4em] text-primary">
            Team Snapshot
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
            {teamStats.map((s) => (
              <div key={s.label} className="bg-background px-6 py-6 text-center">
                <div className="font-display text-3xl text-primary md:text-4xl">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <div className="font-display text-xs uppercase tracking-[0.4em] text-primary">
              Individual Leaders
            </div>
            <h2 className="mt-3 font-display text-4xl uppercase">Player Statistics</h2>
          </div>
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-border bg-card/50 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-left">Pos</th>
                  <th className="px-4 py-3 text-right">GP</th>
                  <th className="px-4 py-3 text-right">PPG</th>
                  <th className="px-4 py-3 text-right">RPG</th>
                  <th className="px-4 py-3 text-right">APG</th>
                  <th className="px-4 py-3 text-right">FG%</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((p) => (
                  <tr
                    key={p.num}
                    className="border-b border-border bg-card/20 transition-colors last:border-b-0 hover:bg-card"
                  >
                    <td className="px-4 py-4 font-display text-lg text-primary">{p.num}</td>
                    <td className="px-4 py-4 font-display uppercase">{p.name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{p.pos}</td>
                    <td className="px-4 py-4 text-right">{p.gp}</td>
                    <td className="px-4 py-4 text-right font-display text-base text-primary">{p.ppg}</td>
                    <td className="px-4 py-4 text-right">{p.rpg}</td>
                    <td className="px-4 py-4 text-right">{p.apg}</td>
                    <td className="px-4 py-4 text-right">{p.fg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

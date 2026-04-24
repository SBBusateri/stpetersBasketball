import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "SPBA / Roster" },
      {
        name: "description",
        content: "Meet the 2025-26 Saint Peters Basketball academy roster — elite student-athletes from across the country.",
      },
      { property: "og:title", content: "SPBA / Roster" },
      { property: "og:description", content: "Meet the 2025-26 roster." },
    ],
  }),
  component: TeamPage,
});

type Player = {
  num: number;
  name: string;
  pos: string;
  year: string;
  height: string;
  weight: number;
  hometown: string;
  bio: string;
};

const roster: Player[] = [
  { num: 0, name: "Jalen Carter", pos: "PG", year: "Sr", height: "6'2\"", weight: 185, hometown: "Atlanta, GA", bio: "Three-year captain. Leads the team in assists and steals. Top-50 national recruit out of Westlake HS." },
  { num: 3, name: "Marcus Thompson", pos: "SG", year: "Jr", height: "6'5\"", weight: 195, hometown: "Houston, TX", bio: "Lethal three-point shooter. Five-star guard with offers from every major D1 program." },
  { num: 5, name: "Tyrese Walker", pos: "SF", year: "Sr", height: "6'7\"", weight: 210, hometown: "Chicago, IL", bio: "Two-way wing and emotional leader. Holds the program record for career rebounds." },
  { num: 11, name: "Devin Holloway", pos: "PG", year: "So", height: "6'1\"", weight: 175, hometown: "Brooklyn, NY", bio: "Quick, crafty backup point guard. Averaged 22 PPG in junior varsity last season." },
  { num: 14, name: "Andre Brooks", pos: "SF", year: "Jr", height: "6'6\"", weight: 205, hometown: "Memphis, TN", bio: "Defensive specialist. Guards 1-4 with elite lateral quickness." },
  { num: 21, name: "Cameron Reed", pos: "PF", year: "Sr", height: "6'9\"", weight: 230, hometown: "Los Angeles, CA", bio: "Stretch four and team captain. Shooting 41% from beyond the arc this season." },
  { num: 23, name: "Isaiah Mitchell", pos: "SG", year: "Fr", height: "6'4\"", weight: 180, hometown: "Detroit, MI", bio: "Highly-touted freshman. McDonald's All-American nominee with explosive athleticism." },
  { num: 32, name: "Marquise Davis", pos: "PF", year: "Jr", height: "6'8\"", weight: 220, hometown: "Dallas, TX", bio: "Energy big who plays above the rim. Top shot-blocker on the roster." },
  { num: 34, name: "Trey Robinson", pos: "C", year: "Sr", height: "6'11\"", weight: 245, hometown: "Philadelphia, PA", bio: "Anchor of the defense. Verbally committed to a Power Five program for 2026." },
  { num: 42, name: "Bryce Williams", pos: "C", year: "So", height: "7'0\"", weight: 250, hometown: "Miami, FL", bio: "Skilled seven-footer with a soft touch. Developing into a complete two-way center." },
];

function TeamPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PageShell>
      <PageHero
        eyebrow="2025–26 Season"
        title="Roster"
        subtitle="Ten players. One pride. Tap a player to view their full bio."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-sm border border-border">
            <div className="hidden grid-cols-12 gap-4 border-b border-border bg-card/50 px-6 py-4 font-display text-xs uppercase tracking-[0.25em] text-muted-foreground md:grid">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-1">Pos</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-1">HT</div>
              <div className="col-span-1">WT</div>
              <div className="col-span-3">Hometown</div>
              <div className="col-span-1 text-right">Bio</div>
            </div>
            {roster.map((p) => {
              const open = expanded === p.num;
              return (
                <div key={p.num} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => setExpanded(open ? null : p.num)}
                    className="grid w-full grid-cols-2 items-center gap-4 bg-card/20 px-6 py-5 text-left transition-colors hover:bg-card md:grid-cols-12"
                  >
                    <div className="col-span-1 font-display text-2xl text-primary md:text-xl">
                      {p.num}
                    </div>
                    <div className="col-span-1 font-display text-lg uppercase md:col-span-3">
                      {p.name}
                    </div>
                    <div className="col-span-1 text-sm md:col-span-1">
                      <span className="font-display uppercase tracking-wider">{p.pos}</span>
                    </div>
                    <div className="col-span-1 text-sm text-muted-foreground md:col-span-1">{p.year}</div>
                    <div className="col-span-1 text-sm text-muted-foreground md:col-span-1">{p.height}</div>
                    <div className="col-span-1 hidden text-sm text-muted-foreground md:col-span-1 md:block">{p.weight}</div>
                    <div className="col-span-2 text-sm text-muted-foreground md:col-span-3">{p.hometown}</div>
                    <div className="col-span-2 flex justify-end md:col-span-1">
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  {open && (
                    <div className="border-t border-border bg-background/60 px-6 py-6">
                      <div className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                        Full Bio
                      </div>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {p.bio}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

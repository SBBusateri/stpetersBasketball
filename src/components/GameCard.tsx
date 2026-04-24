type Game = {
  date: string;
  opp: string;
  venue: "Home" | "Away" | "Neutral";
  time?: string;
  result?: string;
  status: "upcoming" | "final";
  note?: string;
};

export function GameCard({ game }: { game: Game }) {
  const win = game.result?.startsWith("W");
  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card/30 transition-colors hover:border-primary hover:bg-card">
      <div className="flex items-center justify-between border-b border-border bg-background/40 px-5 py-3">
        <div className="font-display text-sm uppercase tracking-[0.25em] text-primary">
          {game.date}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {game.venue}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {game.venue === "Home" ? "vs" : game.venue === "Away" ? "at" : "vs"}
          </div>
          <div className="mt-1 font-display text-2xl uppercase leading-tight">{game.opp}</div>
          {game.note && (
            <div className="mt-1 text-[11px] uppercase tracking-wider text-primary/80">
              {game.note}
            </div>
          )}
        </div>
        <div className="mt-4 border-t border-border pt-3">
          {game.status === "final" ? (
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-xs uppercase tracking-wider ${win ? "text-primary" : "text-muted-foreground"}`}
              >
                {win ? "Win" : "Loss"}
              </span>
              <span className="font-display text-xl">{game.result?.replace(/^[WL]\s/, "")}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-display text-base">{game.time}</span>
              <a
                href="#"
                className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Tickets →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { Game };

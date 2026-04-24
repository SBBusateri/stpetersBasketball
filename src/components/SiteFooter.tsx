import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary font-display text-xl font-bold text-primary-foreground">
                R
              </div>
              <div>
                <div className="font-display text-xl uppercase tracking-wider">
                  Reign Athletics
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Basketball Program
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              An elite basketball academy developing the next generation of student-athletes
              through discipline, competition, and excellence on and off the court.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-primary">
              Program
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/schedule" className="hover:text-foreground">Schedule</Link></li>
              <li><Link to="/team" className="hover:text-foreground">Roster</Link></li>
              <li><Link to="/coaches" className="hover:text-foreground">Coaches</Link></li>
              <li><Link to="/stats" className="hover:text-foreground">Stats</Link></li>
              <li><Link to="/recruits" className="hover:text-foreground">Recruiting</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-primary">
              Contact
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1500 Hardwood Drive</li>
              <li>Atlanta, GA 30303</li>
              <li>info@reignathletics.com</li>
              <li>(404) 555-0117</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs uppercase tracking-wider text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Reign Athletics. All rights reserved.</div>
          <div>Built for champions.</div>
        </div>
      </div>
    </footer>
  );
}

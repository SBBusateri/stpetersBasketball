import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, Twitter, Youtube } from "lucide-react";

const navItems = [
  { to: "/schedule" as const, label: "Schedule" },
  { to: "/coaches" as const, label: "Coaches" },
  { to: "/contact" as const, label: "Contact" },
  { to: "/admin" as const, label: "Admin" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-display text-lg font-bold text-primary-foreground">
              R
            </div>
            <div className="leading-tight">
              <div className="font-display text-base uppercase tracking-wider sm:text-lg">
                Reign Basketball
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
                Youth Academy & Feeder Program
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-1 border-l border-border pl-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-card hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-sm p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/40 py-3 text-sm font-semibold uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-card hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

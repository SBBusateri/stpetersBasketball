import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, Twitter, Youtube } from "lucide-react";
import homeScreenBar from "@/assets/HomeScreenBar.png";

const navItems = [
  { to: "/" as const, label: "Home" },
  { to: "/summer-academy" as const, label: "Summer Academy" },
  { to: "/schedule" as const, label: "Schedule" },
  { to: "/coaches" as const, label: "Coaches" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border/40 bg-black">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6">
          <Link to="/" className="flex h-full items-center">
            <img
              src={homeScreenBar}
              alt="Saint Peters Basketball Academy"
              className="h-full w-auto"
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            {/* <div className="ml-4 flex items-center gap-1 border-l border-border/40 pl-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-card hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div> */}
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
        <div className="border-t border-border/40 bg-black lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/40 py-3 text-sm font-semibold uppercase tracking-wider text-white/85"
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
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-card hover:text-primary"
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

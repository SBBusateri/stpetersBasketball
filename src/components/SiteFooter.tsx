import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import homeScreenBar from "@/assets/HomeScreenBar.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src={homeScreenBar}
                alt="Saint Peters Basketball Academy"
                className="h-12 w-auto"
              />
            </Link>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-card hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-primary">
              Links
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/summer-academy" className="hover:text-primary transition-colors">Summer Academy</Link></li>
              <li><Link to="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
              <li><Link to="/coaches" className="hover:text-primary transition-colors">Coaches</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-primary">
              Contact
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>1500 Hardwood Drive</li>
              <li>Atlanta, GA 30303</li>
              <li>info@saintpetersacademy.com</li>
              <li>(404) 555-0117</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 text-xs font-bold uppercase tracking-wider text-white/60 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Saint Peters Basketball Academy. All rights reserved.</div>
          <div>Fear the Lions.</div>
        </div>
      </div>
    </footer>
  );
}

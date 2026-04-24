import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-court-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {eyebrow && (
          <div className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-5xl uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

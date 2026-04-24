import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import logoMark from "@/assets/Logo/SPBALogoNoBackground.png";
import heroBackground from "@/assets/homebackground.png";

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
    <section
      className="relative overflow-hidden border-b border-border"
      style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-6 flex justify-center">
        <img src={logoMark} alt="Saint Peters Basketball Academy" className="h-20 w-auto sm:h-24" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28">
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

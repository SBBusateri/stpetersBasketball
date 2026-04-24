import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "SPBA / Contact" },
      {
        name: "description",
        content: "Get in touch with Saint Peters Basketball Academy. Visit our facility, call, or send us a message.",
      },
      { property: "og:title", content: "SPBA / Contact" },
      { property: "og:description", content: "Reach the Lions staff directly." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Questions, media inquiries, or summer academy interest — we want to hear from you."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
          {[
            { Icon: MapPin, t: "Facility", v: "1500 Hardwood Drive\nAtlanta, GA 30303" },
            { Icon: Phone, t: "Phone", v: "(404) 555-0117\nMon–Fri, 9am–6pm" },
            { Icon: Mail, t: "Email", v: "info@saintpetersacademy.com\nsummer@saintpetersacademy.com" },
          ].map(({ Icon, t, v }) => (
            <div key={t} className="rounded-sm border border-border bg-card/20 p-8">
              <Icon className="h-7 w-7 text-primary" />
              <div className="mt-4 font-display text-2xl uppercase">{t}</div>
              <div className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

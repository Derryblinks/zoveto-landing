import { ArrowRight } from "lucide-react";
import { registerLink } from "@/config/site";
import { audiences, roleIcons } from "@/content";
import { reveal } from "@/lib/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PreviewRows } from "@/components/ui/preview-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Audiences() {
  return (
    <section id="who" aria-labelledby="who-title" className="py-24">
      <Container>
        <SectionHeading
          id="who-title"
          kicker="Who it’s for"
          title="A dashboard for each role"
          description="Farmers, animal keepers, vets and pharmacies each see only what they need."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {audiences.map((audience, index) => {
            const Icon = roleIcons[audience.role];
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={audience.role}
                {...reveal(Math.floor(index / 2), 140, side)}
                className="group bg-deep text-on-deep flex min-h-[420px] flex-col overflow-hidden rounded-3xl px-8 pt-8 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <Icon
                  className="text-mint mb-4 size-7 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden="true"
                />
                <h3 className="text-[1.65rem] text-white">{audience.title}</h3>
                <p className="text-on-deep-muted mt-3 mb-5 max-w-[44ch]">{audience.description}</p>
                <ButtonLink
                  href={registerLink(audience.role)}
                  variant="mint"
                  size="sm"
                  className="self-start"
                >
                  {audience.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </ButtonLink>
                <PreviewRows
                  title={audience.preview.title}
                  rows={audience.preview.rows}
                  className="mx-3 mt-auto rounded-b-none pt-4 transition-transform duration-300 group-hover:-translate-y-1.5"
                />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { registerLink } from "@/config/site";
import { audiences } from "@/content";
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
          title="Four communities, one connected platform"
          description="Every person gets a dashboard built for their work, and sees only what they need."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {audiences.map((audience) => (
            <article
              key={audience.role}
              className="bg-deep text-on-deep flex min-h-[420px] flex-col overflow-hidden rounded-3xl px-8 pt-8"
            >
              <h3 className="text-[1.65rem] text-white">{audience.title}</h3>
              <p className="text-on-deep-muted mt-3 mb-5 max-w-[44ch]">{audience.description}</p>
              <ButtonLink
                href={registerLink(audience.role)}
                variant="lime"
                size="sm"
                className="self-start"
              >
                {audience.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <PreviewRows
                title={audience.preview.title}
                rows={audience.preview.rows}
                className="mx-3 mt-auto rounded-b-none pt-4"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

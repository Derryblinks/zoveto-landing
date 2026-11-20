import { ArrowRight } from "lucide-react";
import { registerLink } from "@/config/site";
import { audiences } from "@/content";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Audiences() {
  return (
    <section id="who" aria-labelledby="who-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="who-title"
          kicker="Who it’s for"
          title="Support for every part of animal care"
          description="ZOVETO is being developed for the people who care for animals every day."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {audiences.map((audience) => (
            <Reveal key={audience.role} delay={audiences.indexOf(audience) * 70}>
              <article className="border-line bg-card flex min-h-[240px] flex-col items-start rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-sm sm:p-7">
                <span className="bg-surface text-forest mb-4 grid size-11 place-items-center rounded-xl">
                  <audience.icon className="size-[22px]" aria-hidden="true" />
                </span>
                <h3 className="text-xl">{audience.title}</h3>
                <p className="mt-2 mb-5 max-w-[48ch] text-[15px]">{audience.description}</p>
                <AppLink
                  href={registerLink(audience.role)}
                  className="text-forest mt-auto inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"
                >
                  {audience.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </AppLink>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

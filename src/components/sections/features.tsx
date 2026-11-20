import { features } from "@/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-surface py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="features-title"
            kicker="In development"
            title="The everyday details, kept together"
            description="Practical tools to help owners and veterinary professionals keep track of animal care."
          />
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="flex items-start gap-4">
              <Reveal delay={features.indexOf(feature) * 55}>
                <span className="bg-surface text-forest grid size-11 shrink-0 place-items-center rounded-xl">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg">{feature.title}</h3>
                  <p className="mt-1.5 text-[15px]">{feature.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

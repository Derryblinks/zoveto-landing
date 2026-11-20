import { CheckCircle2 } from "lucide-react";
import { registerLink } from "@/config/site";
import { plans } from "@/content";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export function Plans() {
  return (
    <section id="plans" aria-labelledby="plans-title" className="bg-surface py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="plans-title"
            kicker="Plans"
            title="Start with a free account"
            description="Registration is free. Optional paid tools for veterinary professionals are planned; prices will be shared before launch."
          />
        </Reveal>
        <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <li key={plan.name} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-[22px] border p-8",
                    plan.highlighted
                      ? "border-forest bg-forest dark:border-deep dark:bg-deep text-white"
                      : "border-line bg-card",
                  )}
                >
                  <h3 className={cn("text-xl", plan.highlighted && "text-white")}>{plan.name}</h3>
                  <p
                    className={cn(
                      "mt-1.5 mb-5 text-sm",
                      plan.highlighted ? "text-white/80" : "text-muted",
                    )}
                  >
                    {plan.note}
                  </p>
                  <ul className="mb-6 space-y-2.5 text-[15px]">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={cn(
                            "mt-0.5 size-[17px] shrink-0",
                            plan.highlighted ? "text-sage" : "text-accent",
                          )}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={registerLink(plan.cta.role)}
                    variant={plan.highlighted ? "cream" : "outline"}
                    className="mt-auto"
                  >
                    {plan.cta.label}
                  </ButtonLink>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

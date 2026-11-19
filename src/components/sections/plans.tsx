import { CheckCircle2 } from "lucide-react";
import { registerLink } from "@/config/site";
import { plans } from "@/content";
import { reveal } from "@/lib/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export function Plans() {
  return (
    <section id="plans" aria-labelledby="plans-title" className="bg-surface py-24">
      <Container>
        <SectionHeading
          id="plans-title"
          kicker="Plans"
          title="Start free. Upgrade when your practice grows."
          description="Farmers, animal keepers and vets can start free. Paid vet plan prices and pharmacy terms are announced at launch."
        />
        <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <li
              key={plan.name}
              {...reveal(index, 140, "scale")}
              className={cn(
                "relative flex flex-col rounded-[22px] border-2 p-8 transition-transform duration-300 hover:-translate-y-1.5",
                plan.highlighted ? "border-mint bg-deep text-on-deep" : "border-line bg-card",
              )}
            >
              <h3 className={cn("text-xl", plan.highlighted && "text-white")}>{plan.name}</h3>
              <p
                className={cn(
                  "mt-1.5 mb-5 text-sm",
                  plan.highlighted ? "text-on-deep-muted" : "text-muted",
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
                        plan.highlighted ? "text-mint" : "text-accent",
                      )}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={registerLink(plan.cta.role)}
                variant={plan.highlighted ? "mint" : "outline"}
                className="mt-auto"
              >
                {plan.cta.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

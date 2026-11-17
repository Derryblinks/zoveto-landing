import { CheckCircle2 } from "lucide-react";
import { registerLink } from "@/config/site";
import { plans } from "@/content";
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
          description="Registration is free for every role. Prices for paid plans are announced at launch."
        />
        <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "flex flex-col rounded-[22px] border p-8",
                plan.highlighted ? "border-lime bg-lime text-[#143523]" : "border-line bg-card",
              )}
            >
              <h3 className={cn("text-xl", plan.highlighted && "text-deep")}>{plan.name}</h3>
              <p
                className={cn("mt-1.5 mb-5 text-sm", plan.highlighted ? "text-deep" : "text-muted")}
              >
                {plan.note}
              </p>
              <ul className="mb-6 space-y-2.5 text-[15px]">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 size-[17px] shrink-0",
                        plan.highlighted ? "text-deep" : "text-accent",
                      )}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={registerLink(plan.cta.role)}
                variant={plan.highlighted ? "dark" : "outline"}
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

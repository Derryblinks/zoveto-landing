import { CalendarCheck, PawPrint, UserRoundPlus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    title: "Create a profile",
    description: "Choose the role that fits your work and add the details you want to share.",
    icon: UserRoundPlus,
  },
  {
    title: "Add animals",
    description: "Keep animal or herd information together so care is easier to follow.",
    icon: PawPrint,
  },
  {
    title: "Plan the next visit",
    description: "Find a veterinary professional and keep appointment details in one place.",
    icon: CalendarCheck,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="how-title"
            kicker="How it works"
            title="A clear way to keep care moving"
            description="Start with the basics. Add more detail as your animals and practice need it."
          />
        </Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 90}>
                <div className="border-line relative h-full border-t pt-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="bg-sage/35 text-forest grid size-11 place-items-center rounded-lg">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-muted font-display text-sm font-semibold">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="mt-2 text-[15px]">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
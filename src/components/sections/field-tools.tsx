import { CheckCircle2 } from "lucide-react";
import { toolColumns } from "@/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlannedTag } from "@/components/ui/planned-tag";

export function FieldTools() {
  return (
    <section id="field-tools" aria-labelledby="field-title" className="pb-24">
      <Container>
        <div className="bg-surface rounded-[28px] px-6 py-12 sm:px-11 sm:py-14">
          <Reveal>
            <SectionHeading
              id="field-title"
              kicker="For work in the field"
              title="Thoughtful tools for day-to-day practice"
              description="Planning for the realities of veterinary work in clinics, on farms and out in the field."
              align="left"
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {toolColumns.map((column, index) => (
              <li key={column.title} className="h-full">
                <Reveal delay={index * 70}>
                  <div className="border-line bg-card h-full rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-sm">
                    <span className="bg-cream text-deep grid size-10 place-items-center rounded-xl">
                      <column.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="mt-3.5 mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl">{column.title}</h3>
                      {column.planned ? <PlannedTag /> : null}
                    </div>
                    <p className="text-[15px]">{column.description}</p>
                    <ul className="text-body mt-4 space-y-2 text-sm">
                      {column.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="text-forest mt-0.5 size-[17px] shrink-0"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

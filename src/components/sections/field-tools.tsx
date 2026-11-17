import { CheckCircle2 } from "lucide-react";
import { toolColumns } from "@/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function FieldTools() {
  return (
    <section id="field-tools" aria-labelledby="field-title" className="pb-24">
      <Container>
        <div className="bg-deep text-on-deep rounded-[28px] px-6 py-14 sm:px-11">
          <SectionHeading
            id="field-title"
            kicker="Built for the field"
            title="Powerful tools for professional veterinary work"
            description="Designed with the realities of rural practice in mind."
            align="left"
            onDark
          />
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {toolColumns.map((column) => (
              <li
                key={column.title}
                className="bg-deep-2 rounded-[18px] border border-white/12 p-6"
              >
                <span className="bg-lime text-deep grid size-10 place-items-center rounded-[10px]">
                  <column.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 mb-2 text-xl text-white">{column.title}</h3>
                <p className="text-on-deep-muted text-[15px]">{column.description}</p>
                <ul className="mt-3.5 space-y-2 text-sm">
                  {column.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="text-lime mt-0.5 size-[17px] shrink-0"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

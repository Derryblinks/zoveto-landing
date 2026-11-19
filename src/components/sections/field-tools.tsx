import { CheckCircle2, ChevronRight, CloudOff, RefreshCw } from "lucide-react";
import { Fragment } from "react";
import { toolColumns } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { PlannedTag } from "@/components/ui/planned-tag";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const SYNC_STEPS = [
  { label: "Pending Sync", icon: CloudOff, tone: "text-waiting" },
  { label: "Syncing", icon: RefreshCw, tone: "text-[#9fd0f8]" },
  { label: "Synced", icon: CheckCircle2, tone: "text-mint" },
] as const;

/** Shows the states a record moves through after being saved offline. Static, nothing loops. */
function SyncDemo() {
  return (
    <ol aria-hidden="true" className="mt-6 flex flex-wrap items-center gap-1.5">
      {SYNC_STEPS.map((step, index) => (
        <Fragment key={step.label}>
          {index > 0 ? <ChevronRight className="size-4 text-white/40" /> : null}
          <li className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-white">
            <step.icon className={cn("size-4", step.tone)} />
            {step.label}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5">
          <CheckCircle2 className="text-mint mt-0.5 size-[17px] shrink-0" aria-hidden="true" />
          {point}
        </li>
      ))}
    </ul>
  );
}

/** One main tool with a live illustration, then the others as a plain list. */
export function FieldTools() {
  const [main, ...others] = toolColumns;

  return (
    <section id="field-tools" aria-labelledby="field-title" className="pb-24">
      <Container>
        <div className="bg-deep text-on-deep relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-11">
          <SectionHeading
            id="field-title"
            kicker="Built for the field"
            title="Tools for vets working in the field"
            description="Planned tools to keep clinical records going, even without a signal."
            align="left"
            onDark
            className="relative"
          />

          <div className="relative mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
            {main ? (
              <div className="glass rounded-[22px] p-7 sm:p-9" {...reveal(0, 90, "left")}>
                <p className="text-mint text-[13px] font-semibold tracking-wider uppercase">
                  Main feature
                </p>
                <h3 className="mt-3 text-2xl text-white">
                  {main.title}
                  {main.planned ? <PlannedTag onDark className="ml-3" /> : null}
                </h3>
                <p className="text-on-deep-muted mt-2.5 max-w-[46ch]">{main.description}</p>
                <SyncDemo />
                <Points points={main.points} />
              </div>
            ) : null}

            <ul>
              {others.map((column, index) => (
                <li
                  key={column.title}
                  {...reveal(index + 1, 140, "right")}
                  className="border-t border-white/20 py-6 first:pt-0 lg:first:border-t-0"
                >
                  <div className="flex items-center gap-3">
                    <column.icon className="text-mint size-6 shrink-0" aria-hidden="true" />
                    <h3 className="text-xl text-white">
                      {column.title}
                      {column.planned ? <PlannedTag onDark className="ml-3" /> : null}
                    </h3>
                  </div>
                  <p className="text-on-deep-muted mt-2 text-[15px]">{column.description}</p>
                  <Points points={column.points} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

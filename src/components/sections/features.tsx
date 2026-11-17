import { features } from "@/content";
import { Container } from "@/components/ui/container";
import { PreviewMeter, PreviewRows } from "@/components/ui/preview-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-surface py-24">
      <Container>
        <SectionHeading
          id="features-title"
          kicker="Features"
          title="Everything a practice needs. Nothing it doesn’t."
          description="Simple enough for a first-time user, complete enough for a working clinic."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-6">
          {features.map((feature) => (
            <li
              key={feature.title}
              className={cn(
                "border-line bg-card flex flex-col gap-2.5 rounded-[22px] border p-6",
                feature.wide ? "md:col-span-3" : "md:col-span-2",
              )}
            >
              <span className="bg-lime text-deep mb-1 grid size-10 place-items-center rounded-[10px]">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl">{feature.title}</h3>
              <p className="text-[15px]">{feature.description}</p>
              <div className="mt-auto pt-3">
                {feature.preview.kind === "rows" ? (
                  <PreviewRows rows={feature.preview.rows} className="border-line border py-2" />
                ) : (
                  <PreviewMeter label={feature.preview.label} percent={feature.preview.percent} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

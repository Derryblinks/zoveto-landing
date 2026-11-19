import { features } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { PlannedTag } from "@/components/ui/planned-tag";
import { PreviewMeter, PreviewRows } from "@/components/ui/preview-card";
import { SectionHeading } from "@/components/ui/section-heading";

/** One main feature with its product preview, then the rest as a plain list. */
export function Features() {
  const [main, ...others] = features;

  return (
    <section id="features" aria-labelledby="features-title" className="bg-surface py-24">
      <Container>
        <SectionHeading
          id="features-title"
          kicker="Features"
          title="What you get"
          description="Booking comes first. Health records, reminders, a pharmacy catalogue and finance tracking are planned."
        />

        {main ? (
          <div
            className="border-line bg-card mt-12 grid items-center gap-8 rounded-[28px] border p-8 lg:grid-cols-2 lg:gap-14 lg:p-12"
            {...reveal(0, 90, "scale")}
          >
            <div>
              <p className="text-accent text-[13px] font-semibold tracking-wider uppercase">
                Main feature
              </p>
              <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">
                {main.title}
                {main.planned ? <PlannedTag className="ml-3" /> : null}
              </h3>
              <p className="mt-3 max-w-[46ch] text-lg">{main.description}</p>
            </div>
            <div className="bg-surface rounded-2xl p-5 sm:p-8">
              {main.preview.kind === "rows" ? (
                <PreviewRows rows={main.preview.rows} className="border-line border" />
              ) : (
                <PreviewMeter label={main.preview.label} percent={main.preview.percent} />
              )}
            </div>
          </div>
        ) : null}

        <ul className="mt-6 grid md:grid-cols-2 md:gap-x-12">
          {others.map((feature, index) => (
            <li
              key={feature.title}
              {...reveal(Math.floor(index / 2), 120, index % 2 === 0 ? "left" : "right")}
              className="group border-line flex gap-4 border-t py-7"
            >
              <feature.icon
                className="text-accent mt-1 size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl">
                  {feature.title}
                  {feature.planned ? <PlannedTag className="ml-3" /> : null}
                </h3>
                <p className="mt-1.5 max-w-[48ch] text-[15px]">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

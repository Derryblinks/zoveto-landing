import { facts } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";

export function Facts() {
  return (
    <section aria-label="ZOVETO in numbers" className="py-24">
      <Container>
        <dl className="grid gap-10 text-center sm:grid-cols-3">
          {facts.map((fact, index) => (
            <div key={fact.label} {...reveal(index, 140, "scale")}>
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="font-display text-accent block text-[clamp(2.6rem,6vw,4rem)] leading-none font-bold tracking-tight">
                  {fact.value}
                </span>
                <span className="mx-auto mt-2 block max-w-[22ch] text-[15px]">{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

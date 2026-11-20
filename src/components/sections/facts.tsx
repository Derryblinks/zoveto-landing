import { facts } from "@/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Facts() {
  return (
    <section aria-label="What guides ZOVETO" className="py-16">
      <Container>
        <Reveal>
          <dl className="border-line grid gap-8 border-y py-8 text-center sm:grid-cols-3 sm:py-10">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-forest text-lg font-semibold">{fact.value}</dt>
                <dd>
                  <span className="mx-auto mt-1 block max-w-[30ch] text-[15px]">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

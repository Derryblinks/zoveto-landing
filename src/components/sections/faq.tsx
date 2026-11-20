import { faq } from "@/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading id="faq-title" kicker="FAQ" title="Questions, answered" />
        </Reveal>
        <div className="mx-auto mt-10 max-w-[780px]">
          {faq.map((entry) => (
            <Reveal key={entry.question}>
              <details className="group border-line border-b py-[18px]">
                <summary className="text-ink flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {entry.question}
                  <span
                    aria-hidden="true"
                    className="text-accent text-2xl leading-none group-open:hidden"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-accent hidden text-2xl leading-none group-open:inline"
                  >
                    −
                  </span>
                </summary>
                <p className="mt-2 max-w-[62ch]">{entry.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

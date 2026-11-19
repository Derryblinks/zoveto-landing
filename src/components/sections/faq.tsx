import { Plus } from "lucide-react";
import { faq } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading
          id="faq-title"
          kicker="FAQ"
          title="Common questions"
          description="Answers about verification, privacy and working offline."
          align="left"
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <div>
          {faq.map((entry, index) => (
            <details
              key={entry.question}
              {...reveal(index % 4, 50)}
              className="faq-item group border-line border-b py-1"
            >
              <summary className="text-ink flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {entry.question}
                <Plus
                  className="text-accent size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[62ch] pb-4">{entry.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

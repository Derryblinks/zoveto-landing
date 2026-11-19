import { loginLink, registerLink } from "@/config/site";
import { hero } from "@/content";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PawPrint } from "lucide-react";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="hero-intro">
          <p className="text-forest border-line mb-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border bg-white px-3.5 py-1.5 text-sm">
            <span className="bg-sage/45 text-forest rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {hero.badge.highlight}
            </span>
            {hero.badge.text}
          </p>
          <h1
            id="hero-title"
            className="max-w-[15ch] text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.06]"
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-[56ch] text-lg">{hero.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={registerLink()} variant="primary">
              Create an account
            </ButtonLink>
            <ButtonLink href={loginLink()} variant="outline">
              Log in
            </ButtonLink>
          </div>
          <p className="text-muted mt-4 text-sm">{hero.note}</p>
        </div>

        <figure className="hero-picture bg-sage/25 relative overflow-hidden rounded-[24px] shadow-lg">
          <img
            src="/images/veterinary-care.jpg"
            alt="A veterinary professional caring for a dog at the clinic"
            className="aspect-[4/3] w-full rounded-[24px] object-cover"
            width="1200"
            height="900"
            fetchPriority="high"
          />
          <figcaption className="bg-bg/95 absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-xl p-3.5 shadow-lg sm:right-5 sm:bottom-5 sm:left-5 sm:p-4">
            <span className="bg-sage/45 text-forest grid size-10 shrink-0 place-items-center rounded-full">
              <PawPrint className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="text-ink block font-semibold">
                For animals at home and on the farm
              </span>
              <span className="text-muted block text-sm">
                Connecting the people who care for them
              </span>
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

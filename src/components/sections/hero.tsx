import { ArrowRight, Check } from "lucide-react";
import { loginLink, registerLink } from "@/config/site";
import { hero } from "@/content";
import { DashboardMock } from "@/components/mockups/dashboard-mock";
import { PhoneMock } from "@/components/mockups/phone-mock";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-deep relative overflow-hidden pt-16 pb-14 text-center"
    >
      <Container className="relative">
        <p className="text-mint kicker kicker-center mb-5 text-[13px] font-semibold tracking-wider uppercase">
          {hero.kicker}
        </p>
        <h1
          id="hero-title"
          className="mx-auto max-w-[18ch] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.05] text-white"
        >
          {hero.title}
        </h1>
        <p className="text-on-deep-muted mx-auto mt-6 max-w-[58ch] text-lg">{hero.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={registerLink()} variant="mint" size="lg">
            Create account
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </ButtonLink>
          <ButtonLink href={loginLink()} variant="outline-light" size="lg">
            Log in
          </ButtonLink>
        </div>
        <p className="text-on-deep-muted mt-4 inline-flex items-center gap-2 text-sm">
          <Check className="text-mint size-4" aria-hidden="true" />
          {hero.note}
        </p>
      </Container>

      <div className="relative mx-auto mt-14 max-w-[1040px] px-4">
        <div className="relative h-[360px] overflow-hidden sm:h-[400px]">
          <DashboardMock />
          <PhoneMock className="absolute top-[70px] right-[2%] hidden sm:block" />
        </div>
      </div>
      <p className="text-on-deep-muted relative mt-4 text-sm">
        Illustration with sample entries. Not real records or live figures.
      </p>
    </section>
  );
}

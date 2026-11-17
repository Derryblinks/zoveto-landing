import { loginLink, registerLink } from "@/config/site";
import { hero } from "@/content";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DashboardMock } from "@/components/mockups/dashboard-mock";
import { PhoneMock } from "@/components/mockups/phone-mock";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-deep overflow-hidden pt-16 text-center"
    >
      <Container>
        <p className="text-on-deep mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1 text-[13px]">
          <b className="bg-lime text-deep rounded-full px-2.5 py-px text-xs font-semibold">
            {hero.badge.highlight}
          </b>
          {hero.badge.text}
        </p>
        <h1
          id="hero-title"
          className="mx-auto max-w-[16ch] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.05] text-white"
        >
          {hero.title}
        </h1>
        <p className="text-on-deep-muted mx-auto mt-6 max-w-[58ch] text-lg">{hero.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={registerLink()} variant="lime">
            Create account
          </ButtonLink>
          <ButtonLink href={loginLink()} variant="outline-light">
            Log in
          </ButtonLink>
        </div>
        <p className="text-on-deep-muted mt-4 text-sm">{hero.note}</p>
      </Container>

      <div className="relative mx-auto mt-14 h-[360px] max-w-[980px] overflow-hidden px-4 sm:h-[400px]">
        <DashboardMock />
        <PhoneMock className="absolute top-[70px] right-[2%] hidden sm:block" />
        <p className="absolute inset-x-0 bottom-11 z-10 text-xs text-[#7b9285]">
          Illustration with sample entries
        </p>
      </div>
    </section>
  );
}

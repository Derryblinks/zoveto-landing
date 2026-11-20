import { registerLink, type Role } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const ROLES: { role: Role; label: string }[] = [
  { role: "farmer", label: "Farmer" },
  { role: "keeper", label: "Animal keeper" },
  { role: "vet", label: "Veterinary professional" },
  { role: "pharmacy", label: "Pharmacy" },
];

export function FinalCta() {
  return (
    <section id="join" aria-labelledby="join-title">
      <Container>
        <Reveal>
          <div className="bg-deep text-on-deep rounded-[24px] px-6 py-14 text-center sm:py-16">
            <h2
              id="join-title"
              className="mx-auto max-w-[18ch] text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.1] text-white"
            >
              Join ZOVETO today
            </h2>
            <p className="text-on-deep-muted mx-auto mt-4 max-w-[50ch] text-lg">
              Choose the option that best describes you to get started.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {ROLES.map(({ role, label }) => (
                <ButtonLink key={role} href={registerLink(role)} variant="cream">
                  {label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

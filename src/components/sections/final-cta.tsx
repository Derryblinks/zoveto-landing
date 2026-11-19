import { ArrowUpRight } from "lucide-react";
import { registerLink, type Role } from "@/config/site";
import { roleIcons } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";

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
        <div className="bg-deep text-on-deep relative overflow-hidden rounded-[28px] px-6 py-16 text-center">
          <div className="relative" {...reveal()}>
            <h2
              id="join-title"
              className="mx-auto max-w-[18ch] text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.1] text-white"
            >
              Join ZOVETO today
            </h2>
            <p className="text-on-deep-muted mx-auto mt-4 max-w-[50ch] text-lg">
              Choose the option that describes you. Registration takes a few minutes.
            </p>
          </div>

          <ul className="relative mx-auto mt-10 grid max-w-[900px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map(({ role, label }, index) => {
              const Icon = roleIcons[role];
              return (
                <li key={role} {...reveal(index, 110, "scale")}>
                  <a
                    href={registerLink(role)}
                    className="glass group relative flex h-full flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center font-semibold text-white transition duration-300 hover:-translate-y-1.5 hover:bg-white/20"
                  >
                    <ArrowUpRight
                      className="text-mint absolute top-3.5 right-3.5 size-4 -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <Icon
                      className="text-mint size-7 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

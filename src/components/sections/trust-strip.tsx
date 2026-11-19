import { HeartHandshake, MapPin, PawPrint } from "lucide-react";
import { Container } from "@/components/ui/container";

const PRINCIPLES = [
  { label: "Made with Ghana in mind", icon: MapPin },
  { label: "For livestock and pets", icon: PawPrint },
  { label: "Veterinary care stays in expert hands", icon: HeartHandshake },
] as const;

export function TrustStrip() {
  return (
    <Container className="py-8 sm:py-10">
      <ul className="text-ink flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium sm:text-[15px]">
        {PRINCIPLES.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="text-forest size-[18px]" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </Container>
  );
}

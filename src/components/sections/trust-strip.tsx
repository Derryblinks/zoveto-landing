import { trustPoints } from "@/content";
import { Container } from "@/components/ui/container";

export function TrustStrip() {
  return (
    <Container className="pt-12">
      <ul className="text-ink flex flex-wrap justify-center gap-x-10 gap-y-4 text-[15px] font-semibold">
        {trustPoints.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon className="text-accent size-5" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </Container>
  );
}

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { Audiences } from "@/components/sections/audiences";
import { Faq } from "@/components/sections/faq";
import { Facts } from "@/components/sections/facts";
import { Features } from "@/components/sections/features";
import { FieldTools } from "@/components/sections/field-tools";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Plans } from "@/components/sections/plans";
import { TrustStrip } from "@/components/sections/trust-strip";

export function LandingPage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <div className="bg-bg pb-24">
          <TrustStrip />
          <Features />
          <HowItWorks />
          <Audiences />
          <Facts />
          <FieldTools />
          <Plans />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
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
import { Plans } from "@/components/sections/plans";
import { TrustStrip } from "@/components/sections/trust-strip";

/** The landing page. Sections are independent, so they can be reordered or removed freely. */
export function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <div className="bg-bg relative -mt-8 rounded-t-[30px] pb-24">
          <TrustStrip />
          <Audiences />
          <Features />
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

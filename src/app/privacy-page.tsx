import { ClipboardList, Info } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { SimpleHeader } from "@/components/layout/simple-header";
import { SkipLink } from "@/components/layout/skip-link";
import { Container } from "@/components/ui/container";
import { privacy, privacySections } from "@/content";

/** The privacy notice page. Its words live in `src/content/privacy.ts`. */
export function PrivacyPage() {
  return (
    <>
      <SkipLink />
      <SimpleHeader />
      <main id="main">
        <section
          id="top"
          aria-labelledby="privacy-title"
          className="bg-deep pt-16 pb-24 text-center"
        >
          <Container>
            <p className="text-mint kicker kicker-center mb-5 text-[13px] font-semibold tracking-wider uppercase">
              Privacy
            </p>
            <h1
              id="privacy-title"
              className="mx-auto max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-white"
            >
              {privacy.title}
            </h1>
            <p className="text-on-deep-muted mx-auto mt-6 max-w-[58ch] text-lg">{privacy.intro}</p>
            <p className="text-on-deep-muted mt-4 text-sm">Last updated {privacy.updated}</p>
          </Container>
        </section>

        <div className="bg-bg relative -mt-8 rounded-t-[30px] pt-14 pb-24">
          <Container>
            <div className="mx-auto max-w-[72ch]">
              {privacy.draft ? (
                <aside
                  aria-label="Draft status"
                  className="border-line bg-surface mb-12 flex items-start gap-3 rounded-2xl border p-5"
                >
                  <Info className="text-accent mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <p className="text-ink font-medium">{privacy.draftNotice}</p>
                </aside>
              ) : null}

              <div className="space-y-12">
                {privacySections.map((section) => (
                  <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
                    <h2 id={`privacy-${section.id}`} className="text-2xl">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((text) => (
                      <p key={text} className="mt-3 text-[17px]">
                        {text}
                      </p>
                    ))}
                    {section.toConfirm && section.toConfirm.length > 0 ? (
                      <div className="border-line bg-surface mt-5 rounded-2xl border p-5">
                        <p className="text-accent flex items-center gap-2 text-sm font-semibold">
                          <ClipboardList className="size-4" aria-hidden="true" />
                          To be confirmed before launch
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px]">
                          {section.toConfirm.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <p className="mt-14">
                <a href="/" className="text-accent font-semibold underline underline-offset-4">
                  Back to the ZOVETO home page
                </a>
              </p>
            </div>
          </Container>
        </div>
      </main>
      <Footer homePath="/" />
    </>
  );
}

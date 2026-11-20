import type { PrivacySection } from "./types";

/**
 * The privacy notice for this website. Everything stated as fact describes what the website
 * does today, and a test keeps it true (no cookies, no analytics, no outside requests, one
 * item in local storage). Anything that needs a business or legal decision is listed in
 * `toConfirm` and shown as "To be confirmed". Nothing is invented. Finish the notice with the
 * ZOVETO team and a legal review, then clear `toConfirm`, set `draft` to false and remove the
 * noindex tag in privacy/index.html.
 */
export const privacy = {
  title: "Privacy notice",
  intro:
    "This notice explains what the ZOVETO website does with information about you. It is short because the website collects very little.",
  updated: "19 November 2026",
  draft: true,
  draftNotice:
    "This notice is a draft. The parts marked “To be confirmed” need decisions from the ZOVETO team and a legal review before launch.",
} as const;

export const privacySections: PrivacySection[] = [
  {
    id: "scope",
    heading: "What this notice covers",
    paragraphs: [
      "This notice covers the public ZOVETO website. It does not cover the ZOVETO web application, which you reach with the Log in and Create account buttons.",
    ],
  },
  {
    id: "collected",
    heading: "What this website collects",
    paragraphs: [
      "You do not enter any personal information on this website. It has no forms, no accounts and no comments.",
      "It does not use cookies, analytics, advertising or tracking tools. It does not load fonts, scripts or images from other companies.",
    ],
    toConfirm: ["Who hosts this website, and what visit records (server logs) the host keeps."],
  },
  {
    id: "browser",
    heading: "What is saved in your browser",
    paragraphs: [
      "If you use the light and dark mode switch, the site saves your choice in your browser’s local storage under the name zoveto-theme. It holds one word, light or dark. It stays on your device and is never sent to us.",
      "To remove it, clear this site’s data in your browser.",
    ],
  },
  {
    id: "application",
    heading: "The ZOVETO application",
    paragraphs: [
      "Log in and Create account take you to the ZOVETO web application. When you register there, you give information to the application, not to this website.",
    ],
    toConfirm: [
      "What personal information the application collects, why, who can see it and how long it is kept.",
      "How consent is asked for and recorded, including for email and SMS messages.",
      "How long veterinary professionals’ identity and credential documents are kept, who may open them and what happens to them after a decision.",
    ],
  },
  {
    id: "responsible",
    heading: "Who is responsible",
    paragraphs: [],
    toConfirm: [
      "The name and address of the organisation responsible for the website and the application.",
      "A contact email for privacy questions.",
      "The organisation’s registration with Ghana’s Data Protection Commission, if required.",
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    paragraphs: [
      "Ghana’s Data Protection Act, 2012 (Act 843) gives people rights over their personal information.",
    ],
    toConfirm: [
      "How to ask to see, correct or delete personal information, and how quickly we will reply.",
      "How long information is kept, and how it is backed up and protected.",
      "What happens if something goes wrong with personal information (incident response).",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this notice",
    paragraphs: ["When this notice changes, the date at the top will change too."],
  },
];

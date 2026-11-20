import type { PrivacySection } from "./types";

/**
 * The privacy notice for this website. Everything stated as fact describes what the website
 * does today, and a test keeps it true (no cookies, no analytics, no outside requests, only the
 * browser storage named below, no password saved). Anything that needs a business or legal decision is listed in
 * `toConfirm` and shown as "To be confirmed". Nothing is invented. Finish the notice with the
 * ZOVETO team and a legal review, then clear `toConfirm`, set `draft` to false and remove the
 * noindex tag in privacy/index.html.
 */
export const privacy = {
  title: "Privacy notice",
  intro:
    "This notice explains what the ZOVETO website does with information about you. It is short because the website sends nothing to a server: anything you type into the demonstration stays in your own browser.",
  updated: "20 November 2026",
  draft: true,
  draftNotice:
    "This notice is a draft. The parts marked “To be confirmed” need decisions from the ZOVETO team and a legal review before launch.",
} as const;

export const privacySections: PrivacySection[] = [
  {
    id: "scope",
    heading: "What this notice covers",
    paragraphs: [
      "This notice covers the public ZOVETO website, including its demonstration sign-in and sample workspaces. The real ZOVETO application is still being developed and is not covered here.",
    ],
  },
  {
    id: "collected",
    heading: "What this website collects",
    paragraphs: [
      "The website does not send any information to ZOVETO or to anyone else. It does not use cookies, analytics, advertising or tracking tools, and it does not load fonts, scripts or images from other companies.",
      "The demonstration has sign-in and registration forms that ask for a name, an email address, a password and a role. They create no real account. Do not enter real personal, payment or animal health information. The password is never saved.",
    ],
    toConfirm: ["Who hosts this website, and what visit records (server logs) the host keeps."],
  },
  {
    id: "browser",
    heading: "What is saved in your browser",
    paragraphs: [
      "If you use the light and dark mode switch, the site saves your choice in your browser’s local storage under the name zoveto-theme. It holds one word, light or dark.",
      "If you use the demonstration, your browser also keeps the profile you typed (name, email address and role) and the sample records you change, in local storage under the name zoveto.demo.workspace.v1. It keeps which profile is signed in in session storage under the name zoveto.demo.session.v1, which is cleared when you close the tab. The Export data button saves a copy of the demonstration data as a file on your device.",
      "All of this stays on your device and is never sent to us. To remove it, clear this site’s data in your browser.",
    ],
  },
  {
    id: "application",
    heading: "The real ZOVETO application",
    paragraphs: [
      "Log in and Create account currently open the demonstration. When the real application opens, this notice will be updated to explain what it collects and why.",
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

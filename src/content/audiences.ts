import type { Audience } from "./types";

export const audiences: Audience[] = [
  {
    role: "farmer",
    title: "For farmers",
    description:
      "Large buttons, short forms and clear steps. Register your herd and request a visit. Health reminders are planned.",
    cta: "Join as a farmer",
    preview: {
      title: "My herd",
      rows: [
        { label: "Cattle group A", tag: { text: "Vaccinated", tone: "ok" } },
        { label: "Goats", tag: { text: "Deworming due", tone: "warn" } },
        { label: "Next vet visit", tag: { text: "Confirmed", tone: "info" } },
      ],
    },
  },
  {
    role: "keeper",
    title: "For animal keepers",
    description:
      "Keep a profile for every animal, search vets near you and manage bookings in one place.",
    cta: "Join as a keeper",
    preview: {
      title: "My animals",
      rows: [
        { label: "Dog profile", tag: { text: "Up to date", tone: "ok" } },
        { label: "Cat profile", tag: { text: "Booster due", tone: "warn" } },
        { label: "Vet appointment", tag: { text: "Requested", tone: "info" } },
      ],
    },
  },
  {
    role: "vet",
    title: "For veterinary professionals",
    description:
      "Manage your profile and appointment requests. Clinical records, medicine stock, invoices and offline notes are planned.",
    cta: "Join as a vet",
    preview: {
      title: "Booking requests",
      rows: [
        { label: "Farm visit", tag: { text: "Requested", tone: "info" } },
        { label: "Clinic consultation", tag: { text: "Accepted", tone: "ok" } },
        { label: "Record saved offline", tag: { text: "Pending Sync", tone: "warn" } },
      ],
    },
  },
  {
    role: "pharmacy",
    title: "For pharmacies",
    description:
      "Planned: list your catalogue, track batches and expiry dates, and manage orders from vets and farmers. Pharmacy accounts are reviewed before listing.",
    cta: "Register a pharmacy",
    preview: {
      title: "Inventory",
      rows: [
        { label: "Dewormer, in stock", tag: { text: "In stock", tone: "ok" } },
        { label: "Vaccine, near expiry", tag: { text: "Near expiry", tone: "warn" } },
        { label: "Order awaiting reply", tag: { text: "Received", tone: "info" } },
      ],
    },
  },
];

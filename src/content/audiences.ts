import type { Audience } from "./types";

export const audiences: Audience[] = [
  {
    role: "farmer",
    title: "For farmers",
    description:
      "Large buttons, short forms and clear steps. Register your herd, request a visit and get reminders.",
    cta: "Join as a farmer",
    preview: {
      title: "My herd",
      rows: [
        { label: "Cattle group A", tag: { text: "Vaccinated", tone: "ok" } },
        { label: "Goats", tag: { text: "Deworming due", tone: "warn" } },
        { label: "Next vet visit", tag: { text: "Booked", tone: "info" } },
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
        { label: "Booking history", tag: { text: "View", tone: "info" } },
      ],
    },
  },
  {
    role: "vet",
    title: "For veterinary professionals",
    description:
      "Manage appointments, clinical records, medicine stock and invoices, even without a signal.",
    cta: "Join as a vet",
    preview: {
      title: "Booking requests",
      rows: [
        { label: "Farm visit", tag: { text: "New", tone: "info" } },
        { label: "Clinic consultation", tag: { text: "Accepted", tone: "ok" } },
        { label: "Record saved offline", tag: { text: "Pending sync", tone: "warn" } },
      ],
    },
  },
  {
    role: "pharmacy",
    title: "For pharmacies",
    description:
      "List your catalogue, track batches and expiry dates, and manage orders from vets and farmers.",
    cta: "Register a pharmacy",
    preview: {
      title: "Inventory",
      rows: [
        { label: "Dewormer, in stock", tag: { text: "In stock", tone: "ok" } },
        { label: "Vaccine, near expiry", tag: { text: "Expiring", tone: "warn" } },
        { label: "Order awaiting reply", tag: { text: "New order", tone: "info" } },
      ],
    },
  },
];

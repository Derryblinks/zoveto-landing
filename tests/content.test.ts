import { audiences, faq, features, navigation, plans, toolColumns } from "@/content";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("content integrity", () => {
  it("has unique identifiers and no empty copy", () => {
    expect(unique(navigation.map((n) => n.href))).toBe(true);
    expect(unique(audiences.map((a) => a.role))).toBe(true);
    expect(unique(faq.map((f) => f.question))).toBe(true);
    for (const text of [
      ...audiences.flatMap((a) => [a.title, a.description, a.cta]),
      ...features.flatMap((f) => [f.title, f.description]),
      ...plans.flatMap((p) => [p.name, p.note, ...p.points]),
      ...toolColumns.flatMap((t) => [t.title, t.description, ...t.points]),
      ...faq.flatMap((f) => [f.question, f.answer]),
    ]) {
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  it("highlights exactly one plan", () => {
    expect(plans.filter((p) => p.highlighted)).toHaveLength(1);
  });

  it("uses the product guide's status words in previews, not near-synonyms", () => {
    // Bookings: Requested, Accepted, Reschedule Proposed, Confirmed, In Progress, Completed,
    // Cancelled, No-show. Orders start at Received. Offline records: Pending Sync, Syncing,
    // Synced, Sync Failed. These words stood in for them before and must not come back.
    const offGuide = ["New", "Pending", "Booked", "Scheduled", "New order", "Pending sync"];
    const tags = [
      ...audiences.flatMap((a) => a.preview.rows),
      ...features.flatMap((f) => (f.preview.kind === "rows" ? f.preview.rows : [])),
    ].map((row) => row.tag.text);

    expect(tags.length).toBeGreaterThan(5);
    expect(tags.filter((text) => offGuide.includes(text))).toEqual([]);
  });
});

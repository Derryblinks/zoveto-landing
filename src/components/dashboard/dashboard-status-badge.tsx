export function StatusBadge({ children }: { children: string }) {
  const tone =
    children === "Confirmed" || children === "Completed" || children === "Paid"
      ? "bg-[#e6f0df] text-[#31551f]"
      : children === "Requested" || children === "Enquiry" || children === "Outstanding"
        ? "bg-[#fbf0ba] text-[#695523]"
        : "bg-surface text-body";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
      {children}
    </span>
  );
}

const SLICES = [
  { label: "Cattle", percent: 52, color: "#123b35" },
  { label: "Goats and sheep", percent: 28, color: "#167c6a" },
  { label: "Poultry", percent: 20, color: "#8fd9c3" },
] as const;

/** Donut chart drawn with a conic gradient. Sample data for the illustration only. */
export function Donut() {
  const stops = SLICES.map((slice, index) => {
    const start = SLICES.slice(0, index).reduce((sum, previous) => sum + previous.percent, 0);
    return `${slice.color} ${start}% ${start + slice.percent}%`;
  }).join(", ");

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative size-[84px] shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
        role="img"
        aria-label="Animals by species"
      >
        <div className="absolute inset-[22%] rounded-full bg-white" />
      </div>
      <ul className="space-y-1 text-[12px]">
        {SLICES.map((slice) => (
          <li key={slice.label} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ background: slice.color }}
              aria-hidden="true"
            />
            {slice.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

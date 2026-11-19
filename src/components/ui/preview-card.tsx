import type { PreviewRow } from "@/content";
import { cn } from "@/lib/cn";
import { order } from "@/lib/reveal";
import { StatusTag } from "./status-tag";

/** Says out loud that a preview shows invented entries, not real records or live figures. */
function SampleLabel() {
  return <span className="text-app-muted shrink-0 text-xs font-medium">Sample entries</span>;
}

/** A small illustration of an app panel: a title and a few status rows. It always shows the light app. */
export function PreviewRows({
  title,
  rows,
  className,
}: {
  title?: string;
  rows: PreviewRow[];
  className?: string;
}) {
  return (
    <div className={cn("text-app-body rounded-2xl bg-white px-[18px] py-4 text-sm", className)}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        {title ? <h4 className="text-app-ink text-[15px]">{title}</h4> : <span />}
        <SampleLabel />
      </div>
      <ul>
        {rows.map((row, index) => (
          <li
            key={row.label}
            style={order(index)}
            className="row-in border-app-line flex items-center justify-between gap-3 border-t py-2.5 first:border-t-0"
          >
            <span>{row.label}</span>
            <StatusTag tone={row.tag.tone}>{row.tag.text}</StatusTag>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PreviewMeter({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="text-app-body rounded-2xl bg-white px-[18px] py-4 text-sm">
      <div className="mb-1.5 flex justify-end">
        <SampleLabel />
      </div>
      <div className="flex justify-between">
        <span>{label}</span>
        <b className="text-app-ink">{percent}%</b>
      </div>
      <div
        className="bg-app-line mt-2 h-2 overflow-hidden rounded-full"
        role="img"
        aria-label={`${label}: ${percent}%`}
      >
        <div className="bg-app-brand h-full rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

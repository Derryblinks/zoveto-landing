import type { PreviewRow } from "@/content";
import { cn } from "@/lib/cn";
import { StatusTag } from "./status-tag";

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
      {title ? <h4 className="text-app-ink mb-1.5 text-[15px]">{title}</h4> : null}
      <ul>
        {rows.map((row) => (
          <li
            key={row.label}
            className="border-app-line flex items-center justify-between gap-3 border-t py-2.5 first:border-t-0"
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
      <div className="flex justify-between">
        <span>{label}</span>
        <b className="text-app-ink">{percent}%</b>
      </div>
      <div
        className="bg-app-line mt-1.5 h-[7px] overflow-hidden rounded-full"
        role="img"
        aria-label={`${label}: ${percent}%`}
      >
        <div className="bg-app-brand h-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

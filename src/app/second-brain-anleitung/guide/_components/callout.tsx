import { Lightbulb, AlertTriangle, Info } from "lucide-react";

export function Callout({
  type = "info",
  children,
}: {
  type?: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  if (type === "tip") {
    return (
      <div className="rounded-xs border border-green-200 border-l-4 border-l-green-500 bg-green-50 p-4 my-6 flex gap-3">
        <Lightbulb className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Tipp</p>
          <div className="text-sm leading-relaxed text-green-900 [&>p]:m-0">{children}</div>
        </div>
      </div>
    );
  }
  if (type === "warning") {
    return (
      <div className="rounded-xs border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4 my-6 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Wichtig</p>
          <div className="text-sm leading-relaxed text-amber-900 [&>p]:m-0">{children}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xs border border-blue-200 border-l-4 border-l-blue-500 bg-blue-50 p-4 my-6 flex gap-3">
      <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Info</p>
        <div className="text-sm leading-relaxed text-blue-900 [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

import { Lightbulb, AlertTriangle, Info } from "lucide-react";

// Hinweise im Guide: Tipp als Haftnotiz, Wichtiges mit Stiftfarbe gerahmt,
// Info auf Pappe. Keine Signalfarben außerhalb der Palette.
const styles = {
  tip: { box: "bg-accent-100 text-ink", label: "Tipp", icon: Lightbulb, iconClass: "text-accent-800" },
  warning: { box: "border border-accent-600 bg-white text-charcoal", label: "Wichtig", icon: AlertTriangle, iconClass: "text-accent-600" },
  info: { box: "bg-pappe text-charcoal", label: "Info", icon: Info, iconClass: "text-primary" },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  const { box, label, icon: Icon, iconClass } = styles[type];
  return (
    <div className={`not-prose my-6 flex gap-3 rounded-[2px] p-5 ${box}`}>
      <Icon aria-hidden="true" strokeWidth={1.5} className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
      <div>
        <p className="type-label mb-1 text-[12px]">{label}</p>
        <div className="text-[16px] leading-[1.65] [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

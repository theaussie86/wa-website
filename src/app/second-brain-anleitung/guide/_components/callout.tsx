import { Lightbulb, AlertTriangle, Info } from "lucide-react";

const styles = {
  tip: {
    container: "bg-green-50 border-green-200 text-green-900",
    icon: <Lightbulb className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-900",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-900",
    icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  const { container, icon } = styles[type];

  return (
    <div className={`rounded-xs border p-4 my-6 flex gap-3 ${container}`}>
      {icon}
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

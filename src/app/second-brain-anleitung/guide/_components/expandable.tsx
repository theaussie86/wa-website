"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Expandable({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-primary/10 rounded-xs my-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-charcoal hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-charcoal/70 leading-relaxed [&>p]:m-0">
          {children}
        </div>
      )}
    </div>
  );
}

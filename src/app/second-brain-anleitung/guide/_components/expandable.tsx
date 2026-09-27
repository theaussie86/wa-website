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
    <div className="not-prose my-6 rounded-[2px] border border-primary/20">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left text-[16px] font-semibold text-primary hover:text-primary-600 transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-[16px] leading-[1.65] text-charcoal/85 [&>p]:m-0">
          {children}
        </div>
      )}
    </div>
  );
}

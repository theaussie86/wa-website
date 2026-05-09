"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

export function CopyTemplate({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    const text = contentRef.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-6 bg-primary/5 border border-primary/10 rounded-xs">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-xs bg-white border border-primary/10 text-charcoal/70 hover:text-primary transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600">Kopiert!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Kopieren</span>
          </>
        )}
      </button>
      <div ref={contentRef} className="p-4 pr-28 text-sm leading-relaxed text-charcoal/80 [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

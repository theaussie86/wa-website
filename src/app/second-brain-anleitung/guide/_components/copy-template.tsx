"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

export function CopyTemplate({ content, children }: { content?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLPreElement>(null);

  const text = content ?? (typeof children === "string" ? children : "");

  async function handleCopy() {
    const toCopy = content ?? contentRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(toCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="not-prose relative my-6 bg-primary/5 border border-primary/10 rounded-xs overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-xs bg-white border border-primary/10 text-charcoal/70 hover:text-primary transition-colors z-10"
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
      <pre
        ref={contentRef}
        className="p-4 pr-28 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto"
        style={{ background: "transparent", color: "#2D3436", margin: 0 }}
      >
        {content ?? children}
      </pre>
    </div>
  );
}

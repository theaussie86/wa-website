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
    <div className="not-prose my-6 overflow-hidden rounded-[2px] border border-primary/15 bg-white">
      <div className="flex items-center justify-end border-b border-primary/15 bg-pappe/60 px-3 py-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-[4px] bg-primary px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-600"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Kopiert</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={contentRef}
        className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap sm:p-5 sm:text-sm"
        style={{ background: "transparent", color: "#2D3436", margin: 0 }}
      >
        {content ?? children}
      </pre>
    </div>
  );
}

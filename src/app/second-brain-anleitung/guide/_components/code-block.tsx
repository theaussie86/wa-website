"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const code = typeof children === "string" ? children : "";
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-6 bg-charcoal/5 border border-charcoal/10 rounded-xs overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-xs bg-white border border-charcoal/10 text-charcoal/70 hover:text-primary transition-colors z-10"
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
      <pre className="p-4 pr-28 text-sm font-mono whitespace-pre overflow-x-auto text-charcoal/80 leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function MdxPre({ children }: { children: React.ReactNode }) {
  const code =
    typeof children === "object" &&
    children !== null &&
    "props" in (children as React.ReactElement)
      ? ((children as React.ReactElement).props as { children?: string }).children ?? ""
      : "";

  return <CodeBlock>{code}</CodeBlock>;
}

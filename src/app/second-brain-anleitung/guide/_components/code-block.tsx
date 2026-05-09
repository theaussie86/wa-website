"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import React from "react";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as React.ReactElement)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    const text = extractText(el.props.children);
    // block-level elements get a trailing newline
    const tag = typeof el.type === "string" ? el.type : "";
    if (/^(h[1-6]|p|li|div|pre)$/.test(tag)) return text + "\n";
    return text;
  }
  return "";
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="not-prose relative my-6 bg-charcoal/5 border border-charcoal/10 rounded-xs overflow-hidden">
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
      <pre
        className="p-4 pr-28 text-sm font-mono whitespace-pre overflow-x-auto leading-relaxed"
        style={{ background: "transparent", color: "#2D3436", margin: 0 }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MdxPre({ children }: { children: React.ReactNode }) {
  const code = extractText(children);
  return <CodeBlock code={code} />;
}

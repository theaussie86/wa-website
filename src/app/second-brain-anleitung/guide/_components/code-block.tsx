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
        className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed whitespace-pre sm:p-5 sm:text-sm"
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

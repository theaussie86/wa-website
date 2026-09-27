import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline" | "text" | "text-light";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-[16.5px] font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "rounded-[4px] bg-primary px-7 py-4 text-white hover:bg-primary-600 hover:text-white",
  // Auf blauem Ordnerleinen: weißes Etikett
  light: "rounded-[4px] bg-white px-7 py-4 text-primary hover:bg-primary-50",
  outline:
    "rounded-[4px] border border-primary/35 px-7 py-4 text-primary hover:border-primary hover:bg-primary-50",
  text: "font-medium text-primary underline decoration-primary/30 underline-offset-[6px] hover:decoration-primary",
  "text-light":
    "font-medium text-white underline decoration-white/40 underline-offset-[6px] hover:decoration-white",
};

/**
 * Design-System-Button (Relaunch 09/2026, Betriebsordner): rechteckiges Etikett.
 * Pro Sektion höchstens ein gefüllter Button, die Alternative ist ein Textlink.
 * Externe Links (http/mailto/tel) rendern als <a>, interne Pfade als next/link.
 */
export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

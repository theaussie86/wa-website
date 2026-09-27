import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "text";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-[16.5px] font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-primary px-7 py-3.5 text-warm-white hover:bg-primary-600 hover:text-warm-white",
  outline:
    "rounded-full border border-primary/30 px-7 py-3.5 text-primary hover:border-primary hover:bg-primary-50",
  text: "text-primary underline decoration-primary/30 underline-offset-[5px] hover:decoration-primary",
};

/**
 * Design-System-Button (Relaunch 09/2026): Pille in Primary-Blau.
 * Pro Sektion höchstens ein primary, die Alternative ist "text".
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

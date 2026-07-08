import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-xs font-sans text-[17px] font-semibold transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-600 px-[30px] py-4 text-white hover:bg-accent-700 hover:text-white",
  outline:
    "border-2 border-primary px-7 py-3.5 text-primary hover:bg-primary hover:text-white",
};

/**
 * Design-System-Button für den Startseiten-Relaunch.
 * Externe Links (http/mailto/tel) rendern als <a>, interne Pfade als next/link.
 * Primary nutzt accent-600 (weiße Schrift WCAG-konform, ~5:1).
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

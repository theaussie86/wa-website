"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";

// Kein "Home"-Link: dafür ist die Wortmarke da.
const navLinks = [
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/ki-mitarbeiter", label: "KI-Mitarbeiter" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/[0.08] bg-warm-white/90 backdrop-blur-md">
      <nav className="mx-auto max-w-[1240px] px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME}, Startseite`}>
            <Image
              src="/logo-icon.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="font-serif text-[19px] tracking-[-0.01em] text-primary">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] text-charcoal/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary/30 px-4 py-2 font-sans text-[15px] font-medium text-primary transition-colors hover:border-primary hover:bg-primary-50"
            >
              Direkter Draht
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-primary md:hidden"
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>

        {isOpen && (
          <div className="pt-4 pb-2 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2.5 font-sans text-[17px] text-charcoal transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3"
              >
                Direkter Draht
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-white">
      <nav className="mx-auto max-w-[1320px] px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME}, Startseite`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-white">
              <Image src="/logo-icon.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" priority />
            </span>
            <span className="type-label text-[15px] tracking-[0.08em] text-white">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] bg-white px-4 py-2 font-sans text-[15px] font-semibold text-primary transition-colors hover:bg-primary-50"
            >
              15 Minuten reden
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white md:hidden"
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
                  className="border-b border-white/10 py-3 font-sans text-[17px] text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-[4px] bg-white px-6 py-3.5 font-semibold text-primary"
              >
                15 Minuten reden
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

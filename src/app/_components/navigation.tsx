"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-primary/10">
      <nav className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl text-primary font-medium">
            {SITE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Kennenlernen
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-charcoal hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-2"
              >
                Kennenlernen
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

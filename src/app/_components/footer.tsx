import Link from "next/link";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  WHATSAPP_LINK,
  LOCATION,
  CAL_LINK,
} from "@/lib/constants";
import { CookieSettingsButton } from "@/app/_components/cookie-consent";

const navLinks = [
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/ki-mitarbeiter", label: "KI-Mitarbeiter" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const linkClass = "text-charcoal/75 transition-colors hover:text-primary";
const legalClass = "text-[14px] text-charcoal/70 transition-colors hover:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-warm-white font-sans">
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-5 max-w-[420px] text-balance font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.15] tracking-[-0.015em] text-primary">
              Deine Arbeit, so gut wie sie gehört.
            </p>
            <p className="text-[15px] text-charcoal/70">
              {SITE_NAME} · {LOCATION}
            </p>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal/70">
              Seiten
            </p>
            <ul className="space-y-2.5 text-[15.5px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal/70">
              Kontakt
            </p>
            <ul className="space-y-2.5 text-[15.5px]">
              <li>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  15 Minuten reden
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-primary/10 pt-8 md:flex-row md:items-center">
          <p className="text-[14px] text-charcoal/70">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className={legalClass}>
              Impressum
            </Link>
            <Link href="/datenschutz" className={legalClass}>
              Datenschutz
            </Link>
            <CookieSettingsButton className={legalClass} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

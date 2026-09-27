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
  { href: "/ki-arbeitsplatz", label: "KI-Arbeitsplatz" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const linkClass = "text-white/80 transition-colors hover:text-white";
const legalClass = "text-[14px] text-white/70 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-primary font-sans text-white">
      <div className="mx-auto max-w-[1320px] px-6 pt-24 pb-10 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="type-display mb-6 max-w-[12ch] text-balance text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] text-white">
              Deine Arbeit, so gut wie sie gehört.
            </p>
            <p className="text-[15px] text-white/70">
              {SITE_NAME} · {LOCATION}
            </p>
          </div>

          <div>
            <p className="type-label mb-5 text-[13px] text-white/60">
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
            <p className="type-label mb-5 text-[13px] text-white/60">
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

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 md:flex-row md:items-center">
          <p className="text-[14px] text-white/70">
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

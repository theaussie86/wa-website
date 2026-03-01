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
  { href: "/", label: "Home" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-4">{SITE_NAME}</h3>
            <p className="text-primary-200 mb-4">
              Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand.
            </p>
            <p className="text-primary-300 text-sm">{LOCATION}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Gespräch buchen
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-300 text-sm">
              © {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link
                href="/impressum"
                className="text-primary-300 hover:text-white text-sm transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-primary-300 hover:text-white text-sm transition-colors"
              >
                Datenschutz
              </Link>
              <CookieSettingsButton className="text-primary-300 hover:text-white text-sm transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

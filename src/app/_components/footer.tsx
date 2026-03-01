import Container from "@/app/_components/container";
import { SITE_NAME, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h3 className="text-xl font-serif text-white mb-2">
              {SITE_NAME}
            </h3>
            <p className="text-sage text-sm">
              {LOCATION}
            </p>
          </div>
          <div className="text-center lg:text-right">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sage hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-sage text-sm mt-2">
              &copy; {currentYear} {SITE_NAME}. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

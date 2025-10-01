import { Separator } from "./ui/separator";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface FooterProps {
  initialYear?: string;
}

export function Footer({ initialYear }: FooterProps) {
  const { t } = useLanguage();

  const displayYear = initialYear ?? String(new Date().getFullYear());

  const services = ["Web dizajn i razvoj", "SEO optimizacija", "Upravljanje društvenim mrežama", "Brendiranje", "Digitalna strategija"];

  const company = ["O nama", "Portfolio", "Karijera", "Kontakt"];

  return (
    <footer className="bg-bdigital-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* Logo matching the nav */}
              <div className="relative">
                <div className="w-10 h-10 bg-bdigital-cyan rounded-md flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 relative">
                    {/* Pixel-style B made with divs */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-px">
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-bdigital-navy"></div>
                      <div className="bg-transparent"></div>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-bdigital-cyan rounded-md blur-sm opacity-30 -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">BDigital</span>
                <span className="text-xs text-bdigital-cyan leading-tight">Digital Agency</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{t("footer.description")}</p>

            {/* Social Links */}
            <div className="flex space-x-4" role="list" aria-label={t("footer.social.title") ?? "Social media"}>
              {[
                {
                  href: "https://www.facebook.com/BDigitalAgency",
                  label: t("footer.social.facebook") ?? "Facebook",
                  Icon: Facebook,
                },
                {
                  href: "https://www.instagram.com/bdigitalagency",
                  label: t("footer.social.instagram") ?? "Instagram",
                  Icon: Instagram,
                },
                {
                  href: "https://www.linkedin.com/company/bdigital-agency",
                  label: t("footer.social.linkedin") ?? "LinkedIn",
                  Icon: Linkedin,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 bg-bdigital-dark-navy rounded-lg flex items-center justify-center hover:bg-bdigital-cyan hover:text-bdigital-navy transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-bdigital-cyan">{t("footer.services")}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-bdigital-cyan transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-bdigital-cyan">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-bdigital-cyan transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-bdigital-cyan">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-bdigital-cyan" />
                <span>{t("footer.address")}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-bdigital-cyan" />
                <span>{t("footer.phone")}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-bdigital-cyan" />
                <span>{t("footer.email")}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-bdigital-cyan">{t("footer.newsletter")}</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.newsletter.placeholder")}
                  className="flex-1 px-3 py-2 bg-bdigital-dark-navy border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bdigital-cyan transition-colors duration-200"
                />
                <button
                  type="button"
                  className="bg-bdigital-cyan hover:bg-bdigital-cyan-light text-bdigital-navy px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan"
                  aria-label={t("footer.newsletter.submit") ?? "Submit email"}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t("footer.newsletter.submit") ?? "Submit email"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {displayYear} BDigital. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-bdigital-cyan transition-colors duration-200">
              {t("footer.terms")}
            </a>
            <a href="#" className="hover:text-bdigital-cyan transition-colors duration-200">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-bdigital-cyan transition-colors duration-200">
              {t("footer.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

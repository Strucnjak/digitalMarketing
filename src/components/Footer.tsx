import { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath, type PageType } from "../routing";
import { Link } from "react-router-dom";

interface FooterProps {
  initialYear?: string;
}

export function Footer({ initialYear }: FooterProps) {
  const { t, language } = useLanguage();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayYear = initialYear ?? String(new Date().getFullYear());

  const services: { id: PageType; label: string }[] = [
    { id: "web-design", label: t("services.web.title") ?? "Web dizajn i razvoj" },
    { id: "seo", label: t("services.seo.title") ?? "SEO optimizacija" },
    { id: "social-media", label: t("services.social.title") ?? "Upravljanje društvenim mrežama" },
    { id: "branding", label: t("services.branding.title") ?? "Brendiranje" },
    { id: "strategy", label: t("services.strategy.title") ?? "Digitalna strategija" },
  ];

  const company = [
    t("footer.about.items.about"),
    t("footer.about.items.portfolio"),
    t("footer.about.items.careers"),
    t("footer.about.items.contact"),
  ];
  const resources = [
    t("footer.resources.items.blog"),
    t("footer.resources.items.insights"),
    t("footer.resources.items.caseStudies"),
    t("footer.resources.items.faq"),
  ];
  const certifications = [
    t("footer.certifications.items.google"),
    t("footer.certifications.items.hubspot"),
    t("footer.certifications.items.meta"),
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, phone: "", language }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.errors ? Object.values(data.errors).join(", ") : "Failed to send message";
        throw new Error(message);
      }

      setIsSubmitted(true);
      setFormData({ name: "", company: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
                <div className="w-10 h-10 bg-bdigital-cyan-dark rounded-md flex items-center justify-center shadow-lg">
                  <img src="/logo.svg" alt="DIAL Digital logo" className="w-7 h-7" loading="lazy" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-bdigital-cyan rounded-md blur-sm opacity-30 -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">DIAL Digital</span>
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
              {services.map(({ id, label }) => {
                const path = buildLocalizedPath(activeLocale, id, { includeLocalePrefix });
                return (
                  <li key={id}>
                    <Link
                      to={path}
                      className="text-gray-300 hover:text-bdigital-cyan transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-bdigital-cyan">{t("footer.about")}</h3>
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
            <div className="mt-8">
              <h4 className="font-medium mb-3 text-bdigital-cyan">{t("footer.resources")}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {resources.map((item, index) => (
                  <li key={index} className="transition-colors duration-200 hover:text-bdigital-cyan">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="font-medium mb-3 text-bdigital-cyan">{t("footer.form.title")}</h4>
              {isSubmitted ? (
                <p className="text-sm text-bdigital-cyan">{t("footer.form.success")}</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    value={formData.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    placeholder={t("contact.name")}
                    required
                    className="border-white/10 bg-bdigital-dark-navy/80 text-white placeholder:text-gray-400"
                  />
                  <Input
                    value={formData.company}
                    onChange={(event) => handleChange("company", event.target.value)}
                    placeholder={t("contact.company")}
                    className="border-white/10 bg-bdigital-dark-navy/80 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    placeholder={t("contact.email")}
                    required
                    className="border-white/10 bg-bdigital-dark-navy/80 text-white placeholder:text-gray-400"
                  />
                  <Textarea
                    value={formData.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    placeholder={t("contact.message")}
                    required
                    className="min-h-[90px] border-white/10 bg-bdigital-dark-navy/80 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold"
                  >
                    {isSubmitting ? t("footer.form.sending") : t("footer.form.submit")}
                  </Button>
                  <p className="text-xs text-gray-400">{t("footer.form.privacy")}</p>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                </form>
              )}
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-3 text-bdigital-cyan">{t("footer.certifications.title")}</h4>
              <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                {certifications.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-bdigital-cyan/30 bg-bdigital-cyan/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bdigital-cyan"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {displayYear} DIAL Digital. {t("footer.rights")}
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

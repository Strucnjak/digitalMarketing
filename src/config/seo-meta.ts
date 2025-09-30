import { defaultLocale, type Locale, type PageType } from "../routing";

export interface SeoMetadata {
  title: string;
  description: string;
}

const DEFAULT_SEO_METADATA: SeoMetadata = {
  title: "BDigital Agency",
  description:
    "BDigital is a full-service digital agency delivering design, marketing, and growth solutions.",
};

const SEO_METADATA: Record<Locale, Partial<Record<PageType, SeoMetadata>>> = {
  me: {
    home: {
      title: "BDigital agencija | Digitalni marketing i web dizajn",
      description:
        "BDigital je full-service digitalna agencija iz Crne Gore koja isporučuje dizajn, marketing i strategije rasta.",
    },
    "web-design": {
      title: "Web dizajn i development | BDigital agencija",
      description:
        "Pravimo moderne, responzivne sajtove optimizovane za konverzije i rast vašeg biznisa.",
    },
    seo: {
      title: "SEO usluge u Crnoj Gori | BDigital agencija",
      description:
        "Povećajte vidljivost na pretraživačima i osvojite više klijenata uz naš SEO tim.",
    },
    "social-media": {
      title: "Upravljanje društvenim mrežama | BDigital agencija",
      description:
        "Gradimo vašu zajednicu i povećavamo angažman kroz kreativne kampanje na društvenim mrežama.",
    },
    branding: {
      title: "Brending i grafički dizajn | BDigital agencija",
      description:
        "Razvijamo prepoznatljiv vizuelni identitet i profesionalne marketinške materijale za vaš brend.",
    },
    strategy: {
      title: "Digitalna strategija i konsalting | BDigital agencija",
      description:
        "Planovi zasnovani na podacima koji ubrzavaju rast i prodaju vašeg poslovanja.",
    },
    "service-inquiry": {
      title: "Zatražite ponudu | BDigital agencija",
      description:
        "Pošaljite detalje projekta i dobićete personalizovanu ponudu u roku od 24 sata.",
    },
    "free-consultation": {
      title: "Besplatne konsultacije | BDigital agencija",
      description:
        "Rezervišite besplatan razgovor sa našim timom digitalnog marketinga i saznajte kako možemo pomoći.",
    },
  },
  en: {
    home: {
      title: "BDigital Agency | Digital Marketing & Web Design in Montenegro",
      description:
        "BDigital is a full-service digital agency delivering design, marketing, and growth solutions across Montenegro.",
    },
    "web-design": {
      title: "Web Design & Development | BDigital Agency",
      description:
        "We craft modern, responsive websites that are optimized for conversions and business growth.",
    },
    seo: {
      title: "SEO Services in Montenegro | BDigital Agency",
      description:
        "Increase your search visibility and win more clients with our comprehensive SEO services.",
    },
    "social-media": {
      title: "Social Media Marketing Services | BDigital Agency",
      description:
        "Grow your brand community and engagement with data-driven social media strategies.",
    },
    branding: {
      title: "Branding & Graphic Design | BDigital Agency",
      description:
        "Build a memorable visual identity with bespoke branding and design solutions from our creative team.",
    },
    strategy: {
      title: "Digital Strategy & Consulting | BDigital Agency",
      description:
        "Develop a data-driven digital strategy that accelerates growth and delivers measurable results.",
    },
    "service-inquiry": {
      title: "Request a Project Quote | BDigital Agency",
      description:
        "Tell us about your project and receive a tailored proposal from the BDigital team within 24 hours.",
    },
    "free-consultation": {
      title: "Book a Free Consultation | BDigital Agency",
      description:
        "Schedule a free consultation with our digital experts to discover growth opportunities for your business.",
    },
  },
};

export function getSeoMetadata(locale: Locale, page: PageType): SeoMetadata {
  const localized = SEO_METADATA[locale]?.[page];
  if (localized) {
    return localized;
  }

  const fallback = SEO_METADATA[defaultLocale]?.[page];
  if (fallback) {
    return fallback;
  }

  return DEFAULT_SEO_METADATA;
}

export { DEFAULT_SEO_METADATA, SEO_METADATA };
